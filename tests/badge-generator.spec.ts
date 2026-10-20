import { expect, test } from "@playwright/test";

test("homepage renders the supplied YouTube videos", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /exploring how electronic devices/i })).toBeVisible();
  const videoLinks = page.locator("#videos a.video-card");
  await expect(videoLinks).toHaveCount(5);
  await expect(videoLinks.nth(0)).toHaveAttribute("href", "https://www.youtube.com/watch?v=MhJoJRqJ0Wc");
  await expect(videoLinks.nth(4)).toHaveAttribute("href", "https://www.youtube.com/watch?v=4LahQG09NzI");
});

test("badge generator updates the preview and downloads a PNG", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#badge-generator");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("heading", { name: /create your kingpin badge/i })).toBeVisible();

  const handle = section.getByPlaceholder("Enter your handle");
  await handle.fill("TEST_HACKER");
  await section.getByRole("button", { name: "Terminal" }).click();
  await section.getByRole("button", { name: "Signal Cyan" }).click();

  const preview = section.locator("canvas");
  await expect(preview).toHaveAttribute("aria-label", /TEST_HACKER.*terminal style/i);
  await expect(preview).toHaveJSProperty("width", 600);
  await expect(preview).toHaveJSProperty("height", 340);

  const downloadPromise = page.waitForEvent("download");
  await section.getByRole("button", { name: /download png/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^joegrand-kingpin-badge-test_hacker\.png$/);
  await expect(section.getByRole("status")).toContainText(/badge is ready to share/i);
});

test("Kingpin level stays locked until the protocol is complete", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#badge-generator");
  await section.scrollIntoViewIfNeeded();
  const kingpin = section.getByRole("button", { name: /Kingpin.*LOCKED/i });
  await expect(kingpin).toHaveAttribute("aria-disabled", "true");
  await kingpin.click();
  await expect(section.locator("canvas")).toHaveAttribute("aria-label", /level Maker/i);
});
