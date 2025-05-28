import { test, expect } from "@playwright/test";

test("theme toggle switches between light and dark mode", async ({ page }) => {
  // Navigate to the homepage
  await page.goto("/");

  // Find the theme toggle button (it contains either Sun, Moon, or Laptop icon)
  const themeToggleButton = page.locator("button:has(svg)");

  // Click the theme toggle button to open the dropdown
  await themeToggleButton.click();

  // Click the dark mode option
  await page.locator('div[role="menuitemradio"]:has-text("Dark")').click();

  // Wait for the theme to change
  await page.waitForTimeout(500);

  // Check if the body has the dark class
  await expect(page.locator("html")).toHaveClass(/dark/);
});
