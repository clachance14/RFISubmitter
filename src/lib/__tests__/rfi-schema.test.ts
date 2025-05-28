import { rfiSchema } from "@/schemas/rfi";

describe("RFI Schema Validation", () => {
  it("should parse valid input", () => {
    const validInput = { title: "Test RFI Title" };
    const result = rfiSchema.parse(validInput);
    expect(result).toEqual(validInput);
  });

  it("should throw an error on empty title", () => {
    const invalidInput = { title: "" };
    expect(() => rfiSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error when title is missing", () => {
    const invalidInput = {};
    expect(() => rfiSchema.parse(invalidInput)).toThrow();
  });
});
