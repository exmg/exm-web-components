import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  Action,
  Filter,
  FilterSingleSelectConfig,
  FilterConfigType,
} from '@exmg/exm-grid/src/table/types/exm-grid-toolbar-types.js';
import '@exmg/exm-grid/src/table/exm-grid-toolbar.js';

@customElement('exm-grid-toolbar-demo')
export class ExmgGridToolbarDemo extends LitElement {
  private actions: Action[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
    },
    {
      id: 'merge',
      text: '',
      tooltip: 'Merge',
      icon: 'merge_type',
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
    },
  ];

  private description = 'Table 1';

  private filters: Filter<FilterSingleSelectConfig>[] = [
    {
      id: 'status',
      name: 'Status',
      config: {
        type: FilterConfigType.SingleSelect,
        data: [
          {
            id: 'active',
            title: 'Active',
          },
          {
            id: 'inactive',
            title: 'Inactive',
          },
          {
            id: 'archived',
            title: 'Archived',
          },
        ],
      },
    },
  ];

  private onActionExecuted() {
    // console.log('onActionExecuted', e.detail);
  }

  private onFilterChanged() {
    // console.log('onFilterChanged', e.detail);
  }

  render() {
    return html`
      <style>
        :host {
          --mdc-theme-primary: #0071dc;

          padding: 10px;
          display: block;
          background-color: #f6f6f6;
        }
      </style>
      <h1>With actions</h1>
      <exm-grid-toolbar
        .actions="${this.actions}"
        description="${this.description}"
        .filters="${this.filters}"
        @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
        @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
      ></exm-grid-toolbar>
      <h1>Without actions</h1>
      <exm-grid-toolbar
        description="${this.description}"
        .filters="${this.filters}"
        @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
        @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
      ></exm-grid-toolbar>
      <h1>Without actions with search</h1>
      <exm-grid-toolbar
        searchEnabled
        description="${this.description}"
        .filters="${this.filters}"
        @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
        @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
      ></exm-grid-toolbar>
    `;
  }
}
