import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@exmg/exm-upload';
import { observer } from '@exmg/lit-base';
import { ExmUpload } from '@exmg/exm-upload';
import { ifDefined } from 'lit/directives/if-defined.js';
import './file-image-upload-form.js';

const convertStringToRatio = (ratioString: string) => {
  const ratioParts = ratioString.split('/');

  // Ensure there are exactly two parts after splitting
  if (ratioParts.length !== 2) {
    return null;
  }

  // Convert the parts to numbers
  const numerator = parseInt(ratioParts[0], 10);
  const denominator = parseInt(ratioParts[1], 10);

  // Check if the conversion was successful
  if (isNaN(numerator) || isNaN(denominator)) {
    return null;
  }

  // Check if denominator is not zero
  if (denominator === 0) {
    return null;
  }

  return numerator / denominator;
};

@customElement('exm-upload-image-demo')
export class ExmUploadImageDemo extends LitElement {
  @query('exm-upload')
  upload?: ExmUpload;

  @property({ type: String }) accept? = '.png,.jpg,.jpeg';
  @property({ type: String }) maxSize? = '256kb';
  @property({ type: String }) fixedResolution? = '1200x677';
  @property({ type: Boolean }) allowCropping = true;
  @property({ type: String })
  @observer(function (this: ExmUploadImageDemo, value: string) {
    const aspectRatio = convertStringToRatio(value);
    this.cropperConfig = aspectRatio
      ? {
          aspectRatio,
        }
      : {};
  })
  aspectRatio = '16/9';

  @property({ type: Number })
  cropperConfig: any = {};

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
      exm-upload {
        margin-bottom: 48px;
      }
    `,
  ];

  protected firstUpdated() {
    window.uploadDefaults = {
      headers: {
        'Allow-Access-Control-Origin': '*',
      },
    };
  }

  _handlePropertyChange(e: CustomEvent<{ name: string; value: string }>) {
    const { name, value } = e.detail;
    this[name] = value;
  }

  render() {
    return html`
      <exm-upload
        fixedResolution=${ifDefined(this.fixedResolution)}
        aspectRatio=${ifDefined(this.aspectRatio)}
        accept=${ifDefined(this.accept)}
        ?allowCropping=${this.allowCropping}
        maxSize=${this.maxSize}
        multiple
        serverType="local"
        .cropperConfig=${this.cropperConfig}
      >
      </exm-upload>

      <file-image-upload-form
        accept=${ifDefined(this.accept)}
        maxSize=${this.maxSize}
        fixedResolution=${ifDefined(this.fixedResolution)}
        aspectRatio=${ifDefined(this.aspectRatio)}
        ?allowCropping=${this.allowCropping}
        @property-changed=${this._handlePropertyChange}
      ></file-image-upload-form>
    `;
  }
}
