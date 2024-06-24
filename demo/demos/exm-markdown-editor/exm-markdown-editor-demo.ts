import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { style } from '../demo-page-styles-css.js';
import { Tabs } from '@material/web/tabs/internal/tabs.js';

import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import './exm-markdown-editor-custom-preview-demo.js';
import './exm-markdown-editor-custom-renderer-demo.js';
import './exm-markdown-editor-image-upload-demo.js';
import './exm-markdown-editor-simple-demo.js';

@customElement('exm-markdown-editor-demo')
export class DemoSimpleGridTable extends LitElement {
  static styles = [
    style,
    css`
      main {
        padding-top: 1.5rem;
      }
    `,
  ];

  @query('md-tabs') tabs?: Tabs;
  @state() selectedTab = 0;

  _handleChange() {
    this.selectedTab = this.tabs?.activeTabIndex ?? 0;
  }

  renderContent() {
    switch (this.selectedTab) {
      case 0:
        return html`<exm-markdown-editor-simple-demo></exm-markdown-editor-simple-demo>`;
      case 1:
        return html`<exm-markdown-editor-custom-preview-demo></exm-markdown-editor-custom-preview-demo>`;
      case 2:
        return html`<exm-markdown-editor-image-upload-demo></exm-markdown-editor-image-upload-demo>`;
      case 3:
        return html`<exm-markdown-editor-custom-renderer-demo></exm-markdown-editor-custom-renderer-demo>`;
      default:
        return html`<exm-markdown-editor-simple-demo></exm-markdown-editor-simple-demo>`;
    }
  }

  protected render() {
    return html`
      <div class="main centered">
        <div>
          <md-tabs .selected="${this.selectedTab}" @change=${this._handleChange}>
            <md-primary-tab> Simple demo </md-primary-tab>
            <md-primary-tab> Customized Preview </md-primary-tab>
            <md-primary-tab> Upload Image </md-primary-tab>
            <md-primary-tab> Custom actions/toolbar </md-primary-tab>
          </md-tabs>

          <main>${this.renderContent()}</main>
        </div>
      </div>
    `;
  }
}
