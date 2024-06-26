import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@exmg/exm-form/exm-form.js';
import { ExmForm, formStyles } from '@exmg/exm-form';
import { style } from '../demo-page-styles-css.js';

import './form-base-example.js';
import './settings-example.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('exm-form-demo')
export class ExmFormDemo extends LitElement {
  static styles = [style, formStyles];

  async doFormAction(e: CustomEvent<unknown>) {
    const formDialog = e.target as ExmForm;
    try {
      formDialog.submitting = true;
      console.log('Form data', e.detail);
      await sleep(1000);
      throw new Error('Error saving data');
    } catch (error) {
      formDialog.showError(error instanceof Error ? error.message : 'Unknown error');
      console.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      formDialog.submitting = false;
    }
  }

  renderForm1() {
    return html`
      <div class="card">
        <exm-form class="has-aside" @form-submit=${this.doFormAction}>
          <div slot="toolbar" class="toolbar"><div class="title">Create contact</div></div>
          <form>
            <div class="row">
              <md-filled-text-field name="firstname" dialogFocus label="First Name" required></md-filled-text-field>
              <md-filled-text-field name="lastname" label="Last Name" required></md-filled-text-field>
            </div>
            <div class="row">
              <md-filled-text-field name="company" label="Company"></md-filled-text-field>
              <md-filled-text-field name="amount" label="Amount" type="number" min="0" max="10"></md-filled-text-field>
            </div>
            <div class="row">
              <md-filled-text-field
                name="email"
                label="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                required
              ></md-filled-text-field>
            </div>
            <div class="row">
              <md-filled-text-field name="phone" label="Phone" required></md-filled-text-field>
            </div>
            <div class="row">
              <label class="checkbox" for="twoFactorEnabled"
                ><md-checkbox id="twoFactorEnabled" name="twoFactorEnabled"></md-checkbox>Two Factor authentication
                enabled?
              </label>
            </div>
          </form>
          <div slot="aside">
            Ex Machina will send notices about the Data <a href="#">Processing Terms</a> and EU General Data Protection
            Regulation to your primary contact. If your organization has a data protection officer or an EU
            representative, add their contact information.
          </div>
        </exm-form>
      </div>
    `;
  }

  renderForm2() {
    return html`
      <div class="card">
        <exm-form @form-submit=${this.doFormAction}>
          <div slot="toolbar" class="toolbar"><div class="title">Create contact</div></div>
          <form>
            <div class="row">
              <md-filled-text-field name="firstname" label="First Name" required></md-filled-text-field>
              <md-filled-text-field name="lastname" label="Last Name" required></md-filled-text-field>
            </div>
            <div class="row">
              <md-filled-text-field name="company" label="Company"></md-filled-text-field>
              <md-filled-text-field name="amount" label="Amount" type="number" min="0" max="10"></md-filled-text-field>
            </div>
            <md-filled-text-field
              name="email"
              label="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
              required
            ></md-filled-text-field>
            <md-filled-text-field name="phone" label="Phone" required></md-filled-text-field>
          </form>
        </exm-form>
      </div>
    `;
  }

  renderForm3() {
    return html` <div class="card"><form-base-example></form-base-example></div> `;
  }

  renderForm4() {
    return html` <div class="card"><settings-example></settings-example></div> `;
  }

  render() {
    return html`
      <div class="main">${this.renderForm4()}${this.renderForm1()}${this.renderForm2()}${this.renderForm3()}</div>
    `;
  }
}
