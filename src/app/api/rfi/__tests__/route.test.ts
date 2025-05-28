import { POST } from "../route";

jest.mock("next/server", () => {
  const original = jest.requireActual("next/server");
  return {
    ...original,
    NextResponse: {
      json: (body: any, init?: any) => ({ status: init?.status ?? 200, body }),
    },
  };
});

// Mock the Supabase client
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockImplementation(() => ({
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: {
          session: {
            user: { id: "test-user-id" },
          },
        },
      }),
    },
    from: jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { id: "test-rfi-id", title: "Test RFI", status: "open" },
        error: null,
      }),
    }),
  })),
}));

const call = async (body: unknown) =>
  POST(
    new Request("http://localhost/api/rfi", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }) as any,
  );

describe("/api/rfi POST endpoint", () => {
  it("should return 400 when title is empty", async () => {
    const res = await call({ title: "" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation error");
  });

  it("should return 400 when title is missing", async () => {
    const res = await call({});
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation error");
  });

  it("should return 201 with valid data", async () => {
    const res = await call({ title: "Test RFI" });
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.title).toBe("Test RFI");
  });
});
