import { z } from "zod";

// RFI schema for validation
export const rfiSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

// Type inference from the schema
export type RfiInput = z.infer<typeof rfiSchema>;
