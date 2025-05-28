-- Create a function to test the RFI table schema
CREATE OR REPLACE FUNCTION public.test_rfi_table_schema()
RETURNS TABLE (
    table_name text,
    column_name text,
    data_type text,
    is_nullable text,
    column_default text
) LANGUAGE sql AS $$
    SELECT 
        table_name,
        column_name,
        data_type,
        is_nullable,
        column_default
    FROM 
        information_schema.columns
    WHERE 
        table_schema = 'public' 
        AND table_name = 'rfi'
    ORDER BY 
        ordinal_position;
$$;
