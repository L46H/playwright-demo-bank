import { Page, Locator } from 'playwright';

export class SideMenuComponent {
  paymentButton: Locator;

  constructor(private page: Page) {
    this.paymentButton = this.page.getByRole('link', { name: 'płatności' });
  }
}
