import { ExmFormBase, formBaseStyles, formStyles } from '@exmg/exm-form';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('form-base-example')
export class FormBaseExample extends ExmFormBase {
  static styles = [formBaseStyles, formStyles];

  hasAsideContent = true;

  protected renderToolbar() {
    return html` <div class="toolbar"><div class="title">Create contact</div></div>`;
  }

  doAction(formData: unknown): Promise<void> {
    console.log('Form data', formData);

    // @ts-ignore
    return sleep(3000);
  }

  protected renderAside() {
    return html`<div>
      Ex Machina will send notices about the Data <a href="#">Processing Terms</a> and EU General Data Protection
      Regulation to your primary contact. If your organization has a data protection officer or an EU representative,
      add their contact information.
    </div>`;
  }

  protected renderFormContent() {
    return html`
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
      </form>
    `;
  }
}
