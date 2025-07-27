import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;

  transferButton: Locator;
  actionCloseButton: Locator;

  showMessages: Locator;
  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');

    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew'
    });
    this.actionCloseButton = this.page.getByTestId('close-button');
    this.showMessages = this.page.locator('#show_messages');
  }

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string
  ): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }
}
