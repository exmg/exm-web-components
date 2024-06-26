import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-upload-crop-styles-css.js';
import { ExmUploadCropBase } from './exm-upload-crop-base.js';

@customElement('exm-upload-crop')
export class ExmUploadCrop extends ExmUploadCropBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload-crop': ExmUploadCrop;
  }
}
