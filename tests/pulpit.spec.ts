import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  // test.describe.configure({ retries: 3 });

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test(
    'quick payment with correct data',
    {
      tag: '@pulpit',
      annotation: {
        type: 'Happy path',
        description: 'Verifies successful quick payment with correct data.'
      }
    },
    async ({ page }) => {
      const receiverId = '2';
      const transferAmount = '100';
      const transferTitle = 'taxi';
      const expectedReceiverTransfer = 'Chuck Demobankowy';
      const expectedMessage = `Przelew wykonany! ${expectedReceiverTransfer} - ${transferAmount},00PLN - ${transferTitle}`;

      await pulpitPage.quickPayment(receiverId, transferAmount, transferTitle);

      await expect(pulpitPage.messageText).toHaveText(expectedMessage);
    }
  );

  test(
    'successful mobile top-up',
    {
      tag: '@pulpit',
      annotation: {
        type: 'Happy path',
        description: 'Checks if mobile top-up is successful.'
      }
    },
    async ({ page }) => {
      const topUpReceiver = '500 xxx xxx';
      const topUpAmount = '100';
      const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

      await page.waitForLoadState('domcontentloaded');

      await pulpitPage.topUp(topUpReceiver, topUpAmount);

      await expect(pulpitPage.messageText).toHaveText(expectedMessage);
    }
  );

  test(
    'correct balance after successful mobile top-up',
    {
      tag: '@pulpit',
      annotation: {
        type: 'Happy path',
        description:
          'Verifies if the balance is correctly updated after a mobile top-up.'
      }
    },
    async ({ page }) => {
      const topUpReceiver = '500 xxx xxx';
      const topUpAmount = '50';
      const initialBalance = await pulpitPage.moneyValueText.innerText();
      const expectedBalance = Number(initialBalance) - Number(topUpAmount);

      await pulpitPage.correctBalanceAfterTopUp(topUpReceiver, topUpAmount);

      await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
    }
  );
});
