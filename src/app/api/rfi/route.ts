import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { rfiSchema } from "@/schemas/rfi";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  // Create a Supabase client with the user's session
  const supabase = await createClient();

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session exists, return 401 Unauthorized
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the request body
    const body = await request.json();

    // Validate the input using Zod schema
    try {
      const validatedData = rfiSchema.parse(body);

      // Insert the new RFI with status 'open'
      const { data, error } = await supabase
        .from("rfi")
        .insert({
          title: validatedData.title,
          status: "open",
          created_by: session.user.id,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating RFI:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Return 201 Created with the RFI data
      return NextResponse.json(data, { status: 201 });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        // Return validation errors with 400 Bad Request
        return NextResponse.json(
          { error: "Validation error", details: validationError.errors },
          { status: 400 },
        );
      }
      throw validationError; // Re-throw if it's not a ZodError
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
