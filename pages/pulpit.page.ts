import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

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

  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);

    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');

    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span'
    );
    this.topUpExecuteButton = this.page.getByRole('button', {
      name: 'doładuj telefon'
    });

    this.moneyValueText = this.page.locator('#money_value');

    this.userNameText = this.page.getByTestId('user-name');
  }

  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async topUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiver.selectOption(topUpReceiver);
    await this.topUpAmount.fill(topUpAmount);

    await this.topUpAmount.click();
    await this.topUpAgreementCheckbox.click();
    await this.topUpExecuteButton.click();

    await this.actionCloseButton.click();
  }

  async correctBalanceAfterTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiver.selectOption(topUpReceiver);
    await this.topUpAmount.fill(topUpAmount);
    await this.page.locator('#uniform-widget_1_topup_agreement span').click();
    await this.page.getByRole('button', { name: 'doładuj telefon' }).click();
    await this.page.getByTestId('close-button').click();
  }
}
