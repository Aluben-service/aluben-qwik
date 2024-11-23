import { expect, test } from '@playwright/test';

test('home page', async ({ page }) => {
	await page.goto('/');
});
