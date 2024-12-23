import { html, css } from 'lit';
import { property } from 'lit/decorators.js';

import { ExmDialogFormBase, dialogFormStyles } from '@exmg/exm-dialogs';
import { formStyles } from '@exmg/exm-form';

import '@material/web/textfield/filled-text-field.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/select-option.js';
import '@material/web/radio/radio.js';
import { customElement } from 'lit/decorators.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('item-create-form-dialog')
export class ItemCreateFormDialog extends ExmDialogFormBase {
  @property({ type: String })
  title = 'Create Customer';

  static override styles = [
    dialogFormStyles,
    formStyles,
    css`
      .wrapper {
        display: flex;
      }

      md-dialog {
        min-width: 800px;
      }
    `,
  ];

  async doAction(formData: unknown) {
    // Simulate slow connection
    await sleep(1000);

    if (formData) {
      throw new Error('Error message');
    }
    // console.log('Item created', formData);
  }

  protected override renderFormContent() {
    return html`
      <div class="wrapper">
        <form>
          <div class="section-title" role="heading" aria-level="4">Primary contact</div>
          <div class="row">
            <md-filled-text-field name="firstname" dialogFocus label="First Name" required></md-filled-text-field>
            <md-filled-text-field name="lastname" label="Last Name" required></md-filled-text-field>
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
            <md-filled-select name="test" required label="Test">
              <md-select-option aria-label="blank"></md-select-option>
              <md-select-option value="apple">
                <div slot="headline">Apple</div>
              </md-select-option>
              <md-select-option value="apricot">
                <div slot="headline">Apricot</div>
              </md-select-option>
            </md-filled-select>
            <md-filled-text-field name="phone" label="Phone" required></md-filled-text-field>
          </div>
          <div class="section-title extra-margin" id="group-title" role="heading" aria-level="4">Starting position</div>
          <div class="row" role="radiogroup" aria-labelledby="group-title">
            <div>
              <md-radio id="first-radio" name="position" value="1" aria-label="First"></md-radio>
              <label for="first-radio">1st position</label>
            </div>
            <div>
              <md-radio id="second-radio" name="position" value="2" aria-label="Second"></md-radio>
              <label for="second-radio">2nd position</label>
            </div>
          </div>
        </form>
        <div class="aside">
          <span
            >Ex Machina will send notices about the Data <a href="#">Processing Terms</a> and EU General Data Protection
            Regulation to your primary contact. If your organization has a data protection officer or an EU
            representative, add their contact information.</span
          >
        </div>
      </div>
    `;
  }
}
