import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ExmgElement } from '@exmg/lit-base/index.js';
import './exm-grid-toolbar.js';
import {
  Filter,
  Setting,
  SettingConfigId,
  SettingConfigType,
  SettingSelectionListConfig,
  SettingSelectionListItem,
} from './types/exm-grid-toolbar-types.js';
import {
  ActionAmountSelectedItemsCondition,
  ActionConditionType,
  ActionWithCondition,
  BaseActionCondition,
} from './types/exm-grid-smart-toolbar-types.js';

@customElement('exm-grid-smart-toolbar')
export class ExmGridSmartToolbar extends ExmgElement {
  @property({ type: String })
  description = '';

  @property({ type: Array })
  actions: ActionWithCondition[] = [];

  @property({ type: Array })
  filters: Filter[] = [];

  @property({ type: Array })
  settings: Setting[] = [];

  @property({ type: Number, attribute: 'amount-of-selected-items' })
  amountOfSelectedItems = 0;

  @property({ type: Boolean, attribute: 'show-column-filter' })
  showColumnFilter = false;

  @property({ type: String, attribute: 'column-filter-button-tooltip' })
  columnFilterButtonTooltip = 'Column selection';

  @property({ type: String, attribute: 'column-filter-dialog-title' })
  columnFilterDialogTitle = 'Select columns';

  @property({ type: Array, attribute: 'column-filter-columns' })
  columnFilterColumns: SettingSelectionListItem[] = [];

  @property({ type: Boolean })
  searchEnabled = false;

  @property({ type: String })
  searchPlaceholder = 'Search';

  @property({ type: Boolean })
  disableSeperator = false;

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  private getActions() {
    return this.actions.filter((action) => {
      return this.shouldActionBeVisible(action);
    });
  }

  private shouldActionBeVisible(action: ActionWithCondition) {
    if (this.isActionAmountSelectedItemsCondition(action)) {
      return this.checkAmountOfSelectedItemsRangeCondition(action);
    }

    return true;
  }

  private isActionAmountSelectedItemsCondition(
    action: ActionWithCondition<BaseActionCondition>,
  ): action is ActionWithCondition<ActionAmountSelectedItemsCondition> {
    return !!action.condition && action.condition!.type === ActionConditionType.AmountOfSelectedItemsRange;
  }

  private checkAmountOfSelectedItemsRangeCondition(
    action: ActionWithCondition<ActionAmountSelectedItemsCondition>,
  ): boolean {
    const condition = action.condition;
    const min = condition!.min;

    if (min !== undefined && this.amountOfSelectedItems < min) {
      return false;
    }

    const max = condition!.max;

    if (max !== undefined && this.amountOfSelectedItems > max) {
      return false;
    }

    return true;
  }

  private getFilters() {
    return this.filters.map((filter) => {
      return {
        ...filter,
        disabled: this.amountOfSelectedItems > 0,
      };
    });
  }
  private getSettings(): Setting<SettingSelectionListConfig>[] {
    if (!this.showColumnFilter) {
      return [];
    }

    return [
      {
        id: SettingConfigId.ColumnSelector,
        dialogTitle: this.columnFilterDialogTitle,
        tooltip: this.columnFilterButtonTooltip,
        icon: 'filter_list',
        config: {
          type: SettingConfigType.SelectionList,
          data: this.columnFilterColumns,
        },
      },
    ];
  }

  render() {
    return html`
      <exm-grid-toolbar
        searchPlaceholder=${this.searchPlaceholder}
        .searchEnabled=${this.searchEnabled}
        .actions="${this.getActions()}"
        description="${this.description}"
        .filters="${this.getFilters()}"
        .settings="${this.getSettings()}"
        ?disableSeperator=${this.disableSeperator}
      >
        <slot name="extra" slot="extra"></slot>
      </exm-grid-toolbar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-grid-smart-toolbar': ExmGridSmartToolbar;
  }
}
