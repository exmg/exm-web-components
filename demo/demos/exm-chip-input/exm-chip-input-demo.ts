import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@exmg/exm-chip-input/exm-chip-input-dropdown.js';
import '@exmg/exm-chip-input/exm-chip-input.js';
import '@exmg/exm-chip-input/exm-chip.js';
import '@exmg/exm-form/exm-form.js';
import { ExmForm } from '@exmg/exm-form/exm-form.js';

import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/input-chip.js';
import '@material/web/chips/suggestion-chip.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/radio/radio.js';
import '@material/web/labs/card/outlined-card.js';
import { candies } from './data.js';

@customElement('exm-chip-input-demo')
export class ExmChipInputDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .main {
        max-width: 700px;
        margin: 3rem auto;
      }

      form {
        width: 100%;
        margin: 1rem;
      }

      .row {
        margin-bottom: 1rem;
      }
    `,
  ];

  async doFormAction(e: CustomEvent<unknown>) {
    const formDialog = e.target as ExmForm;
    try {
      formDialog.submitting = true;
      console.log('e', e);
    } catch (error) {
      formDialog.showError(error instanceof Error ? error.message : 'Unknown error');
      console.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      formDialog.submitting = false;
    }
  }

  render() {
    return html`
      <div class="main">
        <md-outlined-card>
          <exm-form @form-submit=${this.doFormAction}>
            <form>
              <div class="row">
                <exm-chip-input label="Dates (Chip input)" aria-labelledby="dates-label">
                  <exm-chip name="date" value="Mon" label="Mon" aria-label="Monday"></exm-chip>
                  <exm-chip name="date" value="Tue" label="Tue" aria-label="Tuesday" selected></exm-chip>
                  <exm-chip name="date" value="Wed" label="Wed" aria-label="Wednesday"></exm-chip>
                </exm-chip-input>
              </div>
              <div class="row">
                <exm-chip-input-dropdown
                  label="Preferred Candy (Chip input dropdown)"
                  aria-labelledby="candies-label"
                  dropdown-title="Select candies"
                >
                  ${candies.map(
                    (c) =>
                      html`<exm-chip name="candy" value="${c}" label="${c}" aria-label="${c}" required></exm-chip>`,
                  )}
                </exm-chip-input-dropdown>
              </div>
            </form>
          </exm-form></md-outlined-card
        >
      </div>
    `;
  }
}
