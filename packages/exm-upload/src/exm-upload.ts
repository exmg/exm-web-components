import { style } from './styles/exm-upload-styles-css.js';
import { ExmUploadBase } from './exm-upload-base.js';
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
export class ExmUpload extends ExmUploadBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-upload': ExmUpload;
  }
}
