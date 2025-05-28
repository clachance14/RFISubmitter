// 1️⃣ Polyfill fetch + Request/Response/TextEncoder/TextDecoder for Node
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// 2️⃣ Mock next/headers so cookies() & headers() don't throw inside Jest
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: () => undefined,
    getAll: () => [],
    set: () => undefined,
    delete: () => undefined,
  }),
  headers: () => new Headers(),
}));

// --- Mock @supabase/ssr -------------------------------------------------
jest.mock("@supabase/ssr", () => {
  const dummy = {
    from: () => ({
      select: () => dummy,
      eq: () => dummy,
      single: () => Promise.resolve({ data: null, error: null }),
      insert: () =>
        Promise.resolve({ data: [{ id: "uuid", title: "T" }], error: null }),
    }),
    auth: {
      onAuthStateChange: () => ({ data: null, error: null }),
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
    },
  };
  return { createServerClient: () => dummy };
});

// --- Ensure global Request/Response for API route unit tests -----------
if (!global.Request) {
  global.Request = Request;
}
if (!global.Response) {
  global.Response = Response;
}
