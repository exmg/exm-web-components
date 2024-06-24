import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-upload-drop-area-styles-css.js';
import { ExmgUploadDropAreaBase } from './exm-upload-drop-area-base.js';

@customElement('exm-upload-drop-area')
export class ExmgUploadDropArea extends ExmgUploadDropAreaBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload-drop-area': ExmgUploadDropArea;
  }
}
