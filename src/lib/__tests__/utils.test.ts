import { cn } from "../utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("btn", "btn", "text-red-500")).toBe("btn text-red-500");
  });

  it("should handle conditional classes", () => {
    expect(cn("btn", false && "hidden", true && "block")).toBe("btn block");
  });

  it("should handle tailwind conflicts correctly", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
