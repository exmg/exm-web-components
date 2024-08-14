import { ExmgElement } from '@exmg/lit-base';
import { html, nothing, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/focus/md-focus-ring.js';

export class ExmSearchBase extends ExmgElement {
  bubbles = false;

  @state()
  _hasFocus = true;

  @property({ type: String })
  filterValue?: string | null;

  @property({ type: String })
  placeHolder = 'Search';

  @query('#searchInput')
  search?: HTMLInputElement;

  detectOutsideBind?: (e: Event) => void;

  constructor() {
    super();

    // Set default tabindex to 0
    const tabindex = this.getAttribute('tabindex');
    this.setAttribute('tabindex', tabindex || '0');
  }

  protected fire<T>(eventName: string, detail?: T, bubbles?: boolean) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: bubbles || this.bubbles,
        composed: true,
        detail,
      }),
    );
  }

  focus() {
    this._hasFocus = true;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.detectOutsideBind = this.detectOutsideClick.bind(this);
    document.addEventListener('click', this.detectOutsideBind);
  }

  disconnectedCallback() {
    this.detectOutsideBind && document.removeEventListener('click', this.detectOutsideBind);
    super.disconnectedCallback();
  }

  detectOutsideClick(e: Event) {
    const path = e.composedPath();
    if (path.length > 0) {
      // @ts-ignore
      const container = path.find((el) => el.id === 'clickbox');
      // const container = actualTarget.closest('#clickbox');
      if (!container) {
        // Clicked outside the box
        this._hasFocus = false;
      }
    }
  }

  render() {
    const classMapValues = {
      search: true,
      hasFocus: this._hasFocus,
    };
    return html`
      <div id="clickbox" class=${classMap(classMapValues)}>
        <div class="mode-input">
          <md-focus-ring for="searchInput" inward></md-focus-ring>
          <md-icon class="search">search</md-icon>
          <input
            id="searchInput"
            placeholder=${this.placeHolder}
            value=${this.filterValue ? this.filterValue : ''}
            onfocus="let value = this.value; this.value = null; this.value = value"
            @keyup=${this._handleKeyUp}
          />
          ${this.filterValue
            ? html`
                <md-icon-button class="clear" @click=${this._handleClear}><md-icon>clear</md-icon></md-icon-button>
              `
            : nothing}
        </div>
        <div class="mode-default" @click=${() => this.focus()}>
          <md-icon class="search">search</md-icon>
          <span class="interactive-content">${this._getValue()}</span>
          ${this.filterValue
            ? html`
                <md-icon-button class="clear" @click=${this._handleClear}><md-icon>clear</md-icon></md-icon-button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  _getValue() {
    return this.filterValue || this.placeHolder;
  }

  _notifyChange() {
    this.fire('search-value-change', { value: this.filterValue }, this.bubbles);
  }

  _handleClear(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.filterValue = null;
    if (this.search) {
      this.search.value = '';
    }
    this._notifyChange();
    this.search?.focus();
  }

  _handleKeyUp(e: KeyboardEvent) {
    const input: HTMLInputElement = e.target as HTMLInputElement;

    if (this.filterValue !== input.value) {
      this.filterValue = input.value;
      this._notifyChange();
    }

    if (e.key === 'Escape') {
      this._hasFocus = false;
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('_hasFocus')) {
      // after _hasFocus changed to true, focus the input
      if (this._hasFocus) {
        this.shadowRoot!.querySelector<HTMLInputElement>('#searchInput')!.focus();
      }
    }
  }
}
