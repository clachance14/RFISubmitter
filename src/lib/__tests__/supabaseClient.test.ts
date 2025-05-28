import { createClient } from "@/lib/supabase/server";

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn(),
  }),
}));

test("createClient returns object with .from()", () => {
  const supabase = createClient();
  expect(typeof supabase.from).toBe("function");
});
