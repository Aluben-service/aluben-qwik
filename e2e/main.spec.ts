import { expect, test } from '@playwright/test';

test('home page', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('p')).toBeVisible();
	await page.getByRole('textbox').fill('Peter');
	await page.getByRole('button').click();
	await expect(page.locator('p')).toContainText('Peter');
});
