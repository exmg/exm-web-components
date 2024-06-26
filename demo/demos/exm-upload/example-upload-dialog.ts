import { exmgDialogUploadStyles } from '@exmg/exm-upload';
import { ExmDialogUploadBase } from '@exmg/exm-upload';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('example-upload-dialog')
export class ExampleUploadDialog extends ExmDialogUploadBase {
  static override styles = [exmgDialogUploadStyles];

  async doAction(url: string) {
    // Simulate slow connection
    await sleep(1000);

    console.log('Url upload', url);
  }

  protected override renderContent() {
    return html` <exm-upload maxSize="1mb" maxAmount="1" multiple serverType="local" allowCropping> </exm-upload> `;
  }
}
