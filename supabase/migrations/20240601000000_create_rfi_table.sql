-- Create RFI table
CREATE TABLE IF NOT EXISTS public.rfi (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    status text NOT NULL CHECK (status IN ('draft', 'open', 'answered', 'closed')),
    created_by uuid NOT NULL REFERENCES public.users(id),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.rfi ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own RFIs
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'rfi' 
        AND policyname = 'Users can view own RFIs'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can view own RFIs" ON public.rfi
                FOR SELECT USING (auth.uid() = created_by)';
    END IF;
END
$$;

-- Enable realtime for the rfi table
alter publication supabase_realtime add table rfi;
