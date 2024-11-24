import { expect, test } from '@playwright/test';

test('navigate to Google', async ({ page }) => {
    await page.goto('/');
    const textarea = await page.getByRole('textbox');
    await textarea.fill('https://google.com');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 7000));
    const webFrame = await page.$('iframe[src*="http://localhost:5173/~/uv/hvtrs8%2F-gmoelg.aoo"]');
    expect(webFrame).toBeTruthy();
});

