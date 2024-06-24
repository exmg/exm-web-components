import { style } from './styles/exm-upload-styles-css.js';
import { ExmgUploadBase } from './exm-upload-base.js';
import { customElement } from 'lit/decorators.js';

/**
 * `exm-upload`
 * Example:
 * ```html
 *  <div>
 *    <input id="imageUpload" name="imageUrl" />
 *    <exm-upload for="imageUpload"> </exm-upload>
 *  </div>
 * ```
 */

@customElement('exm-upload')
export class ExmgUpload extends ExmgUploadBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload': ExmgUpload;
  }
}
