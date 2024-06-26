import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-upload-item-styles-css.js';
import { ExmUploadItemBase } from './exm-upload-item-base.js';

@customElement('exm-upload-item')
export class ExmUploadItem extends ExmUploadItemBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload-item': ExmUploadItem;
  }
}
