import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ExmgDialogForm } from '@exmg/exm-dialogs';
import '@exmg/exm-upload';
import { ExmgUpload } from '@exmg/exm-upload';
import '@exmg/exm-upload/src/exm-upload-dialog.js';

@customElement('file-upload-dialog')
export class FileUploadDialog extends LitElement {
  /**
   * Reference to dialog
   */
  @query('#dialog')
  dialog?: ExmgDialogForm;

  /**
   * Optional property. If not set it will look for the window.emconfig.backendHost
   */
  @property({ type: String })
  uploadUrl = 'http://localhost:3000/upload';

  static styles = [
    css`
      :host {
        display: block;
      }
      exm-upload a {
        color: #0071dc;
        text-decoration: none;
      }
      exm-upload svg {
        fill: #0071dc;
      }
    `,
  ];

  cropperConfig = {
    modal: true,
    center: true,
    dragMode: 'move',
    movable: true,
    scalable: true,
    guides: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    wheelZoomRatio: 0.1,
  };

  open() {
    this.dialog!.show();
  }

  close() {
    this.dialog && this.dialog.close();
  }

  _save(e: CustomEvent<{ urls: string[] }>) {
    // Implement call to save url(s)
    console.log('save', e.detail);
    this.dialog?.close();
  }

  render() {
    return html`
      <exm-upload-dialog
        id="dialog"
        title="Upload Bestanden"
        buttonSaveCopy="Opslaan"
        hideCloseButton
        @upload-save=${this._save}
      >
        <exm-upload
          maxSize="1mb"
          maxAmount="1"
          multiple
          serverType="local"
          uploadUrl=${ifDefined(this.uploadUrl)}
          .cropperConfig=${this.cropperConfig}
        >
          <div slot="drop-text">
            Drag and drop, of
            <a href="#" @click=${this.shadowRoot?.querySelector<ExmgUpload>('exm-upload')?.openFileSelector}>browse</a>
            je bestanden
          </div>
        </exm-upload>
      </exm-upload-dialog>
    `;
  }
}
