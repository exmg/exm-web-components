import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-upload-crop-styles-css.js';
import { ExmgUploadCropBase } from './exm-upload-crop-base.js';

@customElement('exm-upload-crop')
export class ExmgUploadCrop extends ExmgUploadCropBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload-crop': ExmgUploadCrop;
  }
}
