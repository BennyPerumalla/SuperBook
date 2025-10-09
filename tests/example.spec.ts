import { test, expect } from '@playwright/test';

// A simple test to ensure the homepage loads without crashing.
test('homepage should have the correct title', async ({ page }) => {
  // 1. Navigate to the root URL of the application.
  await page.goto('http://localhost:8080/'); // Adjust port if needed

  // 2. Expect the page to have a specific title.
  // This confirms the page loaded and is the one we expect.
  await expect(page).toHaveTitle("SuperBook - Your Ultimate Reading Companion"); // Change "My App Title" to your app's actual title
});