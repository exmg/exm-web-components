import { ExmDialogConfirmBase, dialogConfirmStyles } from '@exmg/exm-dialogs';

import { customElement } from 'lit/decorators.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('item-delete-confirm-dialog')
export class ItemDeleteConfirmDialog extends ExmDialogConfirmBase {
  static override styles = [dialogConfirmStyles];

  async doAction() {
    // Simulate slow connection
    await sleep(1000);

    console.log('Item deleted');
  }
}
