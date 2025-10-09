import { test, expect } from '@playwright/test';


test('homepage should have the correct title', async ({ page }) => {
  
  await page.goto('http://localhost:8080/'); // Adjust port if needed
  await expect(page).toHaveTitle("SuperBook - Your Ultimate Reading Companion"); // Change "My App Title" to your app's actual title
});