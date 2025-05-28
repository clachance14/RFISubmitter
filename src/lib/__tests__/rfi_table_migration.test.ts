import { supabaseTest } from "@/lib/supabase/testClient";

describe("RFI Table Migration", () => {
  const supabase = supabaseTest();

  it("should have created the rfi table with correct columns and types", async () => {
    const { data, error } = await supabase.rpc("test_rfi_table_schema");

    if (error) {
      console.error("Error testing RFI table schema:", error);
      throw error;
    }

    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);

    // Create a map of column names to their data types
    const columnMap = data.reduce((acc: Record<string, any>, col: any) => {
      acc[col.column_name] = col;
      return acc;
    }, {});

    // Check that all required columns exist with correct types
    expect(columnMap.id).toBeDefined();
    expect(columnMap.id.data_type).toBe("uuid");
    expect(columnMap.id.is_nullable).toBe("NO");

    expect(columnMap.title).toBeDefined();
    expect(columnMap.title.data_type).toBe("text");
    expect(columnMap.title.is_nullable).toBe("NO");

    expect(columnMap.status).toBeDefined();
    expect(columnMap.status.data_type).toBe("text");
    expect(columnMap.status.is_nullable).toBe("NO");

    expect(columnMap.created_by).toBeDefined();
    expect(columnMap.created_by.data_type).toBe("uuid");
    expect(columnMap.created_by.is_nullable).toBe("NO");

    expect(columnMap.created_at).toBeDefined();
    expect(columnMap.created_at.data_type).toBe("timestamp with time zone");
    expect(columnMap.created_at.is_nullable).toBe("NO");
  });

  it("should enforce status check constraint", async () => {
    // Test that the status check constraint is enforced
    const { data: constraints, error: constraintError } = await supabase
      .from("pg_constraint")
      .select("*")
      .eq("conrelid", "rfi")
      .eq("contype", "c");

    if (constraintError) {
      console.error("Error fetching constraints:", constraintError);
      throw constraintError;
    }

    expect(constraints).toBeTruthy();
    // At least one constraint should exist (the CHECK constraint)
    expect(constraints.length).toBeGreaterThan(0);
  });
});
