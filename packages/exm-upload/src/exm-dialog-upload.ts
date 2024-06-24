import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-dialog-upload-css.js';
import { ExmgDialogUploadBase } from './exm-dialog-upload-base.js';
import { ExmgUpload } from './exm-upload.js';

@customElement('exm-dialog-upload')
export class ExmgDialogUpload extends ExmgDialogUploadBase {
  static override styles = [style];

  protected getUploadElement() {
    return this.querySelector('exm-upload') as ExmgUpload;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-upload': ExmgDialogUpload;
  }
}
