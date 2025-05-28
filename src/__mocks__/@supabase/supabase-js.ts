import { Database } from "../../types/supabase";

// Mock Supabase client for testing
const mockSupabaseClient = {
  from: jest.fn().mockReturnValue({
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: { id: "mock-id" },
      error: null,
    }),
  }),
  auth: {
    getSession: jest.fn().mockResolvedValue({
      data: {
        session: {
          user: { id: "mock-user-id" },
        },
      },
      error: null,
    }),
    signInWithOtp: jest.fn().mockResolvedValue({
      data: {},
      error: null,
    }),
  },
  rpc: jest.fn().mockImplementation((functionName) => {
    if (functionName === "test_rfi_table_schema") {
      return Promise.resolve({
        data: [
          {
            table_name: "rfi",
            column_name: "id",
            data_type: "uuid",
            is_nullable: "NO",
            column_default: "uuid_generate_v4()",
          },
          {
            table_name: "rfi",
            column_name: "title",
            data_type: "text",
            is_nullable: "NO",
            column_default: null,
          },
          {
            table_name: "rfi",
            column_name: "status",
            data_type: "text",
            is_nullable: "NO",
            column_default: null,
          },
          {
            table_name: "rfi",
            column_name: "created_by",
            data_type: "uuid",
            is_nullable: "NO",
            column_default: null,
          },
          {
            table_name: "rfi",
            column_name: "created_at",
            data_type: "timestamp with time zone",
            is_nullable: "NO",
            column_default: "now()",
          },
        ],
        error: null,
      });
    }
    return Promise.resolve({ data: null, error: null });
  }),
};

export const createClient = jest.fn().mockReturnValue(mockSupabaseClient);
export const createServerClient = jest.fn().mockReturnValue(mockSupabaseClient);
export const createBrowserClient = jest
  .fn()
  .mockReturnValue(mockSupabaseClient);
