import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-dialog-upload-css.js';
import { ExmDialogUploadBase } from './exm-dialog-upload-base.js';
import { ExmUpload } from './exm-upload.js';

@customElement('exm-dialog-upload')
export class ExmDialogUpload extends ExmDialogUploadBase {
  static override styles = [style];

  protected getUploadElement() {
    return this.querySelector('exm-upload') as ExmUpload;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-upload': ExmDialogUpload;
  }
}
