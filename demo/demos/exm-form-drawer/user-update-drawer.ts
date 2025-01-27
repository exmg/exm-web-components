import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ExmFormDrawerBase, formDrawerStyles } from '@exmg/exm-form-drawer';
import { ifDefined } from 'lit/directives/if-defined.js';
import { formStyles } from '@exmg/exm-form';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface UserData {
  firstname: string;
  lastname: string;
  company?: string;
  amount?: number;
  email: string;
  phone: string;
}

@customElement('user-update-drawer')
export class UserUpdateDrawer extends ExmFormDrawerBase {
  static override styles = [formDrawerStyles, formStyles];

  @property({ type: Object })
  user?: UserData;

  async show(user?: UserData) {
    this.user = user;
    this.opened = true;
    this.title = this.isEditMode() ? 'Update User' : 'Create User';

    this.checkFormValidity();
  }

  isEditMode() {
    return !!this.user;
  }

  async doAction(formData: unknown) {
    // Simulate slow connection
    await sleep(1000);

    if (formData) {
      throw new Error('Error message');
    }

    if (this.isEditMode()) {
      console.log('Item updates', formData);
      throw new Error('Error message');
    } else {
      console.log('Item created', formData);
    }
  }

  protected override renderFormContent() {
    return html`
      <form>
        <div class="row">
          <md-outlined-text-field
            name="firstname"
            dialogFocus
            label="First Name"
            value=${ifDefined(this.user?.firstname)}
            required
          ></md-outlined-text-field>
          <md-outlined-text-field
            name="lastname"
            label="Last Name"
            value=${ifDefined(this.user?.lastname)}
            required
          ></md-outlined-text-field>
        </div>
        <div class="row">
          <md-outlined-text-field
            name="company"
            label="Company"
            value=${ifDefined(this.user?.company)}
          ></md-outlined-text-field>
          <md-outlined-text-field
            name="amount"
            label="Amount"
            type="number"
            min="0"
            max="10"
            value=${ifDefined(this.user?.amount)}
          ></md-outlined-text-field>
        </div>
        <md-outlined-text-field
          name="email"
          label="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          value=${ifDefined(this.user?.email)}
          required
        ></md-outlined-text-field>
        <md-outlined-text-field
          name="phone"
          label="Phone"
          value=${ifDefined(this.user?.phone)}
          required
        ></md-outlined-text-field>
        <div class="row">
          <md-outlined-select name="test" required label="Test">
            <md-select-option aria-label="blank"></md-select-option>
            <md-select-option value="apple">
              <div slot="headline">Apple</div>
            </md-select-option>
            <md-select-option value="apricot">
              <div slot="headline">Apricot</div>
            </md-select-option>
          </md-outlined-select>
          <md-outlined-text-field name="phone" label="Phone" required></md-outlined-text-field>
        </div>
      </form>
    `;
  }
}
