import { css, html } from 'lit';
import { ExmgElement } from '@exmg/lit-base/index.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import './exm-grid-toolbar-filters.js';
import '@polymer/paper-item/paper-item.js';
import './exm-grid-base-toolbar.js';
import './exm-grid-setting-selection-list.js';
import '../search/exm-toolbar-search.js';

import {
  Action,
  BaseFilterConfig,
  BaseSettingConfig,
  EventDetailGridToolbarSettingChanged,
  Filter,
  FilterConfigType,
  FilterSingleSelectConfig,
  Setting,
  SettingConfigType,
  SettingSelectionListConfig,
  SettingSelectionListItem,
} from './types/exm-grid-toolbar-types.js';

@customElement('exm-grid-toolbar')
export class ExmgGridToolbar extends ExmgElement {
  static styles = [
    css`
      exm-grid-toolbar-filters {
        padding-left: 10px;
        border-radius: 4px;
      }
    `,
  ];
  @property({ type: String })
  description = '';

  @property({ type: Array })
  actions: Action[] = [];

  @property({ type: Array })
  filters: Filter[] = [];

  @property({ type: Array })
  settings: Setting[] = [];

  @property({ type: Boolean })
  searchEnabled = false;

  @property({ type: String })
  searchPlaceholder = 'Search';

  @property({ type: Boolean })
  disableSeperator = false;

  private emitActionExecutedEvent(action: Action) {
    return () => {
      this.dispatchEvent(
        new CustomEvent('exm-grid-toolbar-action-executed', {
          detail: {
            id: action.id,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private emitFilterChangedEvent(filter: Filter) {
    return (event: CustomEvent) => {
      this.saveFilterInLocalStorage(filter.id, event.detail.value);
      this.dispatchEvent(
        new CustomEvent('exm-grid-toolbar-filter-changed', {
          detail: {
            id: filter.id,
            value: event.detail.value,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private saveFilterInLocalStorage(filterId: string, value: string) {
    if (filterId.length > 0) {
      const key = `${filterId}${window.location.pathname}`;
      localStorage.setItem(key, value);
    }
  }

  private getFilterFromLocalStorage(filterId: string): string | null {
    if (filterId.length > 0) {
      const key = `${filterId}${window.location.pathname}`;
      return localStorage.getItem(key);
    }
    return null;
  }

  private emitSettingChangedEvent(setting: Setting) {
    return (event: CustomEvent<{ value: SettingSelectionListItem[] }>) => {
      this.dispatchEvent(
        new CustomEvent<EventDetailGridToolbarSettingChanged>('exm-grid-toolbar-setting-changed', {
          detail: {
            id: setting.id,
            value: event.detail.value,
          },
          composed: true,
          bubbles: true,
        }),
      );
    };
  }

  private renderActions() {
    return repeat(
      this.actions,
      (action) => html`
        <md-icon-button
          class="action"
          title="${ifDefined(action.tooltip)}"
          @click="${this.emitActionExecutedEvent(action)}"
          ><md-icon>${action.icon}</md-icon></md-icon-button
        >
      `,
    );
  }

  private renderSearch() {
    return html`<exm-toolbar-search placeHolder=${this.searchPlaceholder}></exm-toolbar-search> `;
  }

  private renderDescription() {
    return html` ${this.description} `;
  }

  private renderFilters() {
    return repeat(this.filters, (filter) => this.renderFilter(filter));
  }

  private renderFilter(filter: Filter) {
    if (this.isFilterSingleSelectConfig(filter)) {
      return this.renderSingleSelectFilter(filter);
    }

    return undefined;
  }

  private isFilterSingleSelectConfig(filter: Filter<BaseFilterConfig>): filter is Filter<FilterSingleSelectConfig> {
    return filter.config.type === FilterConfigType.SingleSelect;
  }

  private getSelectedFilter(filter: Filter<FilterSingleSelectConfig>) {
    return this.getFilterFromLocalStorage(filter.id) || filter.config.data[0].id || 0;
  }

  private renderSingleSelectFilter(filter: Filter<FilterSingleSelectConfig>) {
    const items = filter.config.data.map((item) => ({ label: item.title, value: item.id }));
    return html`
      <exm-grid-toolbar-filters
        selected="${this.getSelectedFilter(filter)}"
        ?disabled="${!!filter.disabled}"
        .items=${items}
        @exm-grid-toolbar-filter-changed="${this.emitFilterChangedEvent(filter)}"
      ></exm-grid-toolbar-filters>
    `;
  }

  private renderSettings() {
    return repeat(this.settings, (setting) => this.renderSetting(setting));
  }

  private renderSetting(setting: Setting) {
    if (this.isSettingSelectionListConfig(setting)) {
      return this.renderSelectionListSetting(setting);
    }

    return undefined;
  }

  private isSettingSelectionListConfig(
    setting: Setting<BaseSettingConfig>,
  ): setting is Setting<SettingSelectionListConfig> {
    return setting.config.type === SettingConfigType.SelectionList;
  }

  private renderSelectionListSetting(setting: Setting<SettingSelectionListConfig>) {
    return html`
      <exm-grid-setting-selection-list
        class="setting"
        setting-id="${setting.id}"
        dialog-title="${ifDefined(setting.dialogTitle)}"
        tooltip="${ifDefined(setting.tooltip)}"
        icon="${ifDefined(setting.icon)}"
        .settingData="${setting.config.data}"
        @exm-grid-setting-changed="${this.emitSettingChangedEvent(setting)}"
      >
      </exm-grid-setting-selection-list>
    `;
  }

  render() {
    return html`
      <style>
        :host {
          --paper-item-focused: {
            background-color: var(
              --exm-theme-table-toolbar-filter-item-active-bg-color,
              var(--exm-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-item-selected: {
            background-color: var(
              --exm-theme-table-toolbar-filter-item-active-bg-color,
              var(--exm-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-button-ink-color: var(
            --exm-theme-table-toolbar-filter-item-active-bg-color,
            var(--mdc-theme-surface)
          );
          --paper-input-container-color: var(--exm-grid-toolbar-on-surface-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(--exm-grid-toolbar-on-surface-color, var(--mdc-theme-primary));

          --exm-paper-combobox-selected-item-color: var(
            --exm-grid-toolbar-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-selected-item-bg-color: var(--exm-grid-toolbar-surface-color, transparent);
          --exm-paper-combobox-dropdown-button-color: var(
            --exm-grid-toolbar-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-dropdown-button-bg-color: var(--exm-grid-toolbar-surface-color, transparent);
          --exm-paper-combobox-dropdown-list-color: var(
            --exm-grid-toolbar-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-dropdown-list-bg-color: var(
            --exm-grid-toolbar-surface-color,
            var(--mdc-theme-surface)
          );
        }
        :host exm-grid-base-toolbar[active] {
          --paper-item-focused: {
            background-color: var(
              --exm-theme-table-toolbar-filter-item-active-bg-color,
              var(--exm-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-item-selected: {
            background-color: var(
              --exm-theme-table-toolbar-filter-item-active-bg-color,
              var(--exm-theme-table-on-surface-low, var(--mdc-theme-surface))
            );
          }
          --paper-button-ink-color: var(
            --exm-theme-table-toolbar-filter-item-active-bg-color,
            var(--mdc-theme-secondary)
          );
          --paper-input-container-color: var(--exm-grid-toolbar-active-on-surface-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(
            --exm-grid-toolbar-active-on-surface-color,
            var(--mdc-theme-primary)
          );

          --exm-paper-combobox-selected-item-color: var(
            --exm-grid-toolbar-active-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-selected-item-bg-color: var(--exm-grid-toolbar-bg-active-surface-color, transparent);
          --exm-paper-combobox-dropdown-button-color: var(
            --exm-grid-toolbar-active-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-dropdown-button-bg-color: var(--exm-grid-toolbar-bg-active-surface-color, transparent);
          --exm-paper-combobox-dropdown-list-color: var(
            --exm-grid-toolbar-active-on-surface-color,
            var(--mdc-theme-on-surface)
          );
          --exm-paper-combobox-dropdown-list-bg-color: var(
            --exm-grid-toolbar-bg-active-surface-color,
            var(--mdc-theme-surface)
          );
        }
        .title {
          display: flex;
          align-items: center;
          height: 48px;
          flex: 1;
        }
        .title > exm-toolbar-search {
          flex: 1;
        }
      </style>
      <exm-grid-base-toolbar ?disableSeperator=${this.disableSeperator}>
        <div slot="actions">${this.renderActions()}</div>
        ${this.searchEnabled
          ? html`<div class="title" slot="description">${this.renderSearch()}</div>`
          : html`<div class="title" slot="description">${this.renderDescription()}</div>`}

        <div slot="filters">${this.renderFilters()}</div>
        <div slot="settings">${this.renderSettings()}</div>
        <div class="extra" slot="extra"><slot name="extra"></slot></div>
      </exm-grid-base-toolbar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-grid-toolbar': ExmgGridToolbar;
  }
}
