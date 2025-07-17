import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  messageText: Locator;

  transferButton: Locator;
  actionCloseButton: Locator;

  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpExecuteButton: Locator;

  moneyValueText: Locator;

  userNameText: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');

    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span');
    this.topUpExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' });

    this.moneyValueText = this.page.locator('#money_value');

    this.userNameText = this.page.getByTestId('user-name');
  }
}
