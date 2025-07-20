import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import { SideMenuComponent } from '../components/side-menu.component';

test.describe('Payment tests', () => {
  // test.describe.configure({ retries: 3 });

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
  });
  test('simple payment', async ({ page }) => {
    const transferReceiver = 'Jacek Nowakowski';
    const transferAccount = '22 2222 2222 2222 2222 2222 22222';
    const transferAmount = '9999';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jacek Nowakowski`;

    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    await expect(paymentPage.showMessages).toHaveText(expectedMessage);
  });
});