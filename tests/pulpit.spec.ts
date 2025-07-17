import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 });

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    const receiverId = '2';
    const transferAmount = '100';
    const transferTitle = 'taxi';
    const expectedReceiverTransfer = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedReceiverTransfer} - ${transferAmount},00PLN - ${transferTitle}`;
    const pulpitPage = new PulpitPage(page);

    await page.waitForLoadState('domcontentloaded');
    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();

    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '100';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    await page.waitForLoadState('domcontentloaded');

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);

    await pulpitPage.topUpAmount.click();
    await pulpitPage.topUpAgreementCheckbox.click();
    await pulpitPage.topUpExecuteButton.click();

    await pulpitPage.actionCloseButton.click();

    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    const pulpitPage = new PulpitPage(page);
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    await pulpitPage.topUpReceiver.selectOption(topUpReceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
