import { LitElement, html, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Tabs } from '@material/web/tabs/internal/tabs.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';

import './exm-upload-dialog-demo.js';
import './exm-upload-default-demo.js';
import './exm-upload-custom-demo.js';
import './exm-upload-customize-demo.js';
import './exm-upload-image-demo.js';
import './exm-input-demo.js';

import { style } from '../demo-page-styles-css.js';

@customElement('exm-upload-demo')
export class ExmgUploadDemo extends LitElement {
  @query('md-tabs')
  tabs?: Tabs;

  @state()
  selectedTab = 0;

  static styles = [
    style,
    css`
      .content {
        margin-top: 3rem;
      }
    `,
  ];

  _handleChange() {
    this.selectedTab = this.tabs?.activeTabIndex ?? 0;
  }

  renderContent() {
    switch (this.selectedTab) {
      case 1:
        return html`<exm-upload-dialog-demo></exm-upload-dialog-demo>`;
      case 2:
        return html`<exm-upload-custom-demo></exm-upload-custom-demo>`;
      case 3:
        return html`<exm-upload-image-demo></exm-upload-image-demo>`;
      case 4:
        return html`<exm-upload-customize-demo></exm-upload-customize-demo>`;
      case 5:
        return html`<exm-input-demo></exm-input-demo>`;
      default:
        return html`<exm-upload-default-demo></exm-upload-default-demo>`;
    }
  }

  render() {
    return html`
      <div class="main centered">
        <div>
          <md-tabs .selected="${this.selectedTab}" @change=${this._handleChange}>
            <md-primary-tab> Configurable upload </md-primary-tab>
            <md-primary-tab> Dialog example </md-primary-tab>
            <md-primary-tab> Custom upload adapter </md-primary-tab>
            <md-primary-tab> Image features </md-primary-tab>
            <md-primary-tab> Customize upload </md-primary-tab>
            <md-primary-tab> Input upload </md-primary-tab>
          </md-tabs>

          <div class="content">${this.renderContent()}</div>
        </div>
      </div>
    `;
  }
}
