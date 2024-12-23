import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import '@material/web/button/filled-button.js';
import '@polymer/paper-input/paper-input.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/select-option.js';

import '@exmg/exm-dialogs/exm-dialog-confirm.js';
import { ExmDialogConfirm } from '@exmg/exm-dialogs/exm-dialog-confirm.js';
import '@exmg/exm-dialogs/exm-dialog-form.js';
import { ExmDialogForm } from '@exmg/exm-dialogs/exm-dialog-form.js';
import '@material/web/textfield/filled-text-field.js';
import { style } from '../demo-page-styles-css.js';

import './item-delete-confirm-dialog.js';
import './item-create-form-dialog.js';

function clickHandler(e: Event) {
  ((e.target as Element).nextElementSibling as ExmDialogConfirm | ExmDialogForm)?.show();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@customElement('exm-dialogs-demo')
export class DialogDemo extends LitElement {
  static styles = [
    style,
    css`
      .example > * {
        padding: 8px;
        margin-bottom: 1rem;
      }

      .headline {
        flex: 1;
        display: block;
        text-align: left;
      }

      form .row {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }

      form .row > * {
        flex: 1;
        height: fit-content;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 0.5rem;
      }

      form > * {
        display: contents;
      }

      .themed {
        /* System tokens */
        --md-sys-color-surface-container-highest: #06c747;
        --md-sys-color-on-surface: #6c11b1;
        --md-sys-color-on-surface-variant: #240345;
        --md-sys-typescale-body-medium: system-ui 16px/24px;
        --md-sys-typescale-headline-small: system-ui 24px/32px;

        /* Component tokens */
        --md-dialog-container-shape: 0px;
      }
    `,
  ];

  async handleSubmit(e: Event) {
    const dialog = e.target as ExmDialogConfirm;
    try {
      dialog.submitting = true;

      await sleep(1000);
      console.log('Delete item');
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      dialog.submitting = false;
      dialog.close();
    }
  }

  async doFormAction(e: CustomEvent<unknown>) {
    const formDialog = e.target as ExmDialogForm;
    try {
      formDialog.submitting = true;

      await sleep(1000);
      console.log('Save ', e.detail);
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      formDialog.submitting = false;
      formDialog.close();
    }
  }

  render() {
    return html`
      <div class="main centered">
        <div class="example">
          <md-filled-button @click=${clickHandler}>Open Confirm</md-filled-button>
          <exm-dialog-confirm
            message="Deleting the selected users"
            @action-confirmed=${this.handleSubmit}
          ></exm-dialog-confirm>
        </div>

        <div class="example">
          <md-filled-button @click=${clickHandler}>Open Confirm (extends base class)</md-filled-button>
          <item-delete-confirm-dialog></item-delete-confirm-dialog>
        </div>

        <div class="example">
          <md-filled-button @click=${clickHandler}>Open Form</md-filled-button>
          <exm-dialog-form class="themed" title="Create contact" @dialog-submit=${this.doFormAction}>
            <form>
              <div class="row">
                <md-filled-text-field name="firstname" dialogFocus label="First Name" required></md-filled-text-field>
                <md-filled-text-field name="lastname" label="Last Name" required></md-filled-text-field>
              </div>
              <div class="row">
                <md-filled-text-field name="company" label="Company"></md-filled-text-field>
                <md-filled-text-field
                  name="amount"
                  label="Amount"
                  type="number"
                  min="0"
                  max="10"
                ></md-filled-text-field>
              </div>
              <md-filled-text-field
                name="email"
                label="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                required
              ></md-filled-text-field>
              <md-filled-text-field name="phone" label="Phone" required></md-filled-text-field>
              <md-filled-select name="test" required label="Test" @focus-out=${() => console.log('out')}>
                <md-select-option aria-label="blank"></md-select-option>
                <md-select-option value="apple">
                  <div slot="headline">Apple</div>
                </md-select-option>
                <md-select-option value="apricot">
                  <div slot="headline">Apricot</div>
                </md-select-option>
              </md-filled-select>
            </form>
          </exm-dialog-form>
        </div>

        <div class="example">
          <md-filled-button @click=${clickHandler}>Open Form (extends base class)</md-filled-button>
          <item-create-form-dialog></item-create-form-dialog>
        </div>
      </div>
    `;
  }
}
