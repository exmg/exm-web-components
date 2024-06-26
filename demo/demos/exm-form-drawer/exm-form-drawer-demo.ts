import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@exmg/exm-form-drawer/exm-form-drawer.js';
import './exm-form-drawer-standard.js';
import './user-update-drawer.js';
import '@material/web/tabs/internal/tabs.js';
import '@material/web/tabs/internal/primary-tab.js';
import { Tabs } from '@material/web/tabs/internal/tabs.js';
import { UserData, UserUpdateDrawer } from './user-update-drawer.js';

import { style } from '../demo-page-styles-css.js';

const user: UserData = {
  firstname: 'John',
  lastname: 'Doe',
  company: 'Ex Machina Group',
  amount: 5,
  email: 'test@example.com',
  phone: '+1234567890',
};

@customElement('exm-form-drawer-demo')
export class Drawer extends LitElement {
  @query('md-tabs')
  tabs?: Tabs;

  @state()
  selectedTab = 0;

  @query('user-update-drawer')
  form?: UserUpdateDrawer;

  static styles = [style];

  _handleChange() {
    this.selectedTab = this.tabs?.activeTabIndex ?? 0;
  }

  renderContent() {
    switch (this.selectedTab) {
      case 0:
        return html`<exm-form-drawer-standard></exm-form-drawer-standard> `;
      default:
        return html`
          <md-text-button @click=${() => this.form!.show()}>Open Create</md-text-button>
          <md-text-button @click="${() => this.form!.show(user)}">Open Update</md-text-button
          ><user-update-drawer></user-update-drawer>
        `;
    }
  }
  render() {
    return html`
      <div class="main centered">
        <div>
          <md-tabs .selected="${this.selectedTab}" @change=${this._handleChange}>
            <md-primary-tab> Normal </md-primary-tab>
            <md-primary-tab> Extends base class </md-primary-tab>
          </md-tabs>
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
}
