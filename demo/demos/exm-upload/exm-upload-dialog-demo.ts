import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ExmgDialogUpload } from '@exm/exm-upload/exm-dialog-upload.js';
import '@exm/exm-upload/exm-upload.js';
import './example-upload-dialog.js';
import { ExampleUploadDialog } from './example-upload-dialog.js';

window.uploadDefaults = {
  headers: {
    'Allow-Access-Control-Origin': '*',
  },
};

function clickHandler(e: Event) {
  ((e.target as Element).nextElementSibling as ExampleUploadDialog)?.show();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('exm-upload-dialog-demo')
export class ExmgUploadDialogDemo extends LitElement {
  @query('exm-dialog-upload')
  fileUploadDialog?: ExmgDialogUpload;

  static styles = [
    css`
      :host {
        display: block;
      }

      .example > * {
        padding: 8px;
      }
    `,
  ];

  async handleSubmit(e: CustomEvent<{ urls: string[] }>) {
    const dialog = e.target as ExmgDialogUpload;
    try {
      dialog.submitting = true;

      await sleep(1000);
      console.log('Save Url', e.detail);
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      dialog.submitting = false;
      dialog.close();
    }
  }

  render() {
    return html`
      <div class="example">
        <h2>Dialog</h2>
        <md-filled-button @click=${clickHandler}>Open Upload</md-filled-button>
        <exm-dialog-upload @dialog-submit=${this.handleSubmit}>
          <exm-upload maxSize="1mb" maxAmount="2" multiple serverType="local" allowCropping> </exm-upload>
        </exm-dialog-upload>
      </div>
      <div class="example">
        <h2>Dialog extends base class</h2>
        <md-filled-button @click=${clickHandler}>Open Upload</md-filled-button>
        <example-upload-dialog></example-upload-dialog>
      </div>
    `;
  }
}
