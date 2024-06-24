import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-upload-item-styles-css.js';
import { ExmgUploadItemBase } from './exm-upload-item-base.js';

@customElement('exm-upload-item')
export class ExmgUploadItem extends ExmgUploadItemBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload-item': ExmgUploadItem;
  }
}
