import { test, expect } from '@playwright/test';

const url = 'https://demo-bank.vercel.app/';
const login = 'testerQQ';
const password = 'password';
const negativeLogin = 'tester';
const negativePassword = 'pass';
const expectedUserName = 'Jan Demobankowy'

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(negativeLogin);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków'
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(negativeLogin);
    await page.getByTestId('password-input').fill(negativePassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków'
    );
  });
});
