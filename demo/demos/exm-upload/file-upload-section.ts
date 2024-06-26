import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '@exmg/exm-upload';
import { ExmUpload, FileData } from '@exmg/exm-upload';
import { ifDefined } from 'lit/directives/if-defined.js';
import './file-upload-form.js';

@customElement('file-upload-section')
export class FileUploadSection extends LitElement {
  @query('exm-upload') exmgUpload?: ExmUpload;
  @property({ type: Array }) files: FileData[] = [];
  @property({ type: String }) accept?: string;
  @property({ type: String }) maxSize: string = '1gb';
  @property({ type: Boolean }) multiple = true;
  @property({ type: Number }) maxAmount?: number;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) uploadUrl = 'http://localhost:3000/upload';
  @property({ type: String }) serverType = 'local';
  @property({ type: Boolean }) hideImageUpload = false;
  @property({ type: Object }) cropperConfig = { aspectRatio: 16 / 9 };

  static styles = [
    css`
      :host {
        display: block;
        width 100%;
      }

      hr,
      exm-upload {
        margin-bottom: 48px;
      }
    `,
  ];

  _handlePropertyChange(e: CustomEvent<{ name: string; value: string }>) {
    const { name, value } = e.detail;
    this[name] = value;
  }

  render() {
    return html`
      <exm-upload
        accept=${ifDefined(this.accept)}
        maxSize=${this.maxSize}
        maxAmount=${ifDefined(this.maxAmount)}
        ?disabled=${this.disabled}
        ?multiple=${this.multiple}
        uploadUrl=${ifDefined(this.uploadUrl)}
        serverType=${this.serverType}
        .cropperConfig=${this.cropperConfig}
      >
      </exm-upload>

      <file-upload-form
        accept=${ifDefined(this.accept)}
        maxSize=${this.maxSize}
        maxAmount=${ifDefined(this.maxAmount)}
        ?disabled=${this.disabled}
        ?multiple=${this.multiple}
        serverType=${this.serverType}
        @property-changed=${this._handlePropertyChange}
      ></file-upload-form>
    `;
  }
}
