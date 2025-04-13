import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('tester12');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();
  await page
    .getByRole('link', { name: 'Demobank w sam raz do testów' })
    .click();
});
