import config from "../../../tailwind.config";

describe("Tailwind Config", () => {
  it("should have brand colors defined", () => {
    // @ts-ignore - Config type is complex
    const brandColors = config.theme.extend.colors.brand;

    expect(brandColors).toBeDefined();
    expect(Object.keys(brandColors).length).toBeGreaterThanOrEqual(9); // At least 9 shades (50-900)

    // Check specific shades exist
    expect(brandColors[50]).toBeDefined();
    expect(brandColors[100]).toBeDefined();
    expect(brandColors[500]).toBeDefined();
    expect(brandColors[900]).toBeDefined();
  });
});
