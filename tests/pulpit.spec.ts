import { test, expect } from '@playwright/test';

const url = 'https://demo-bank.vercel.app/';
const login = 'testerQQ';
const password = 'password';

const receiverId = '2';
const transferAmount = '100';
const transferTitle = 'taxi';
const expectedReceiverTransfer = 'Chuck Demobankowy';


test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 });
  test('quick payment with correct data', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.waitForLoadState('domcontentloaded');

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedReceiverTransfer} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test.only('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.waitForLoadState('domcontentloaded');

    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx'
    );
  });
});
