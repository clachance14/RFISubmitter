import { createMocks } from "node-mocks-http";
import { POST } from "../route";

// Mock the Supabase client
jest.mock("@/supabase/server", () => ({
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

describe("/api/rfi POST endpoint", () => {
  it("should return 400 when title is empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "" },
    });

    await POST(req);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe("Validation error");
  });

  it("should return 400 when title is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {},
    });

    await POST(req);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe("Validation error");
  });

  it("should return 201 with valid data", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Test RFI" },
    });

    await POST(req);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.title).toBe("Test RFI");
  });
});
