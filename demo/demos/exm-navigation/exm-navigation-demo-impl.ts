import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@material/web/iconbutton/icon-button.js';

import '@exmg/exm-navigation/exm-navigation-toolbar.js';
import '@exmg/exm-navigation/exm-navigation-rail.js';
import '@exmg/exm-navigation/exm-navigation-rail-nav.js';
import '@exmg/exm-navigation/exm-navigation-rail-nav-item.js';
import '@exmg/exm-navigation/exm-navigation-drawer.js';
import '@exmg/exm-navigation/exm-navigation-drawer-nav.js';
import '@exmg/exm-collapsed/exm-collapsed.js';

import './dark-light-toggle.js';
import './customer-logo.js';

import '@material/web/list/list.js';
import '@material/web/list/list-item.js';

import {
  navigationItemHover,
  navigationDrawerHover,
  navigationDrawerOpen,
  navigationRailSelected,
  navigationRailHidden,
  navigationRailActive,
  navigationActiveHasSubmenu,
  navigationDrawerPersistent,
  navigationSubSelected,
  ExmNavigationBase,
  exmgNavigationDrawerStyles,
} from '@exmg/exm-navigation';
import { style } from './exm-navigation-demo-styles-css.js';
import { MenuItem, menu as MENU } from './menu.js';

import { style as baseStyle } from '../demo-page-styles-css.js';

import { initTheme } from '@exmg/exm-theme';

initTheme();

@customElement('exm-navigation-demo-impl')
export class ExmNavigationDemoImpl extends ExmNavigationBase {
  static styles = [baseStyle, style, exmgNavigationDrawerStyles];

  menu = MENU;

  pageId = 'chat';

  renderInfoCard() {
    return html`
      <div class="card">
        Drawer open: ${navigationDrawerOpen.value}<br />
        Item hover: ${navigationItemHover.value}<br />
        Nav Active item: ${navigationRailActive.value}<br />
        Drawer hover: ${navigationDrawerHover.value} <br />
        Nav selected: ${navigationRailSelected.value} <br />
        Nav sub selected: ${navigationSubSelected.value} <br />
        Nav hidden: ${navigationRailHidden.value} <br />
        Drawer Persistent: ${navigationDrawerPersistent.value} <br />
        navigationActiveHasSubmenu: ${JSON.stringify(navigationActiveHasSubmenu.value, null, '\t')} <br />
      </div>
    `;
  }

  /**
   * Render page content based on the selected navigation item
   */
  renderPage() {
    return html`<main>${this.renderInfoCard()}</main>`;
  }

  renderToolbar() {
    return html`
      <exm-navigation-toolbar>
        <!-- Menu button will automatically be hidden when the rail bar is visible -->
        <md-icon-button @click=${() => this.drawer!.toggle()} slot="navigationIcon"
          ><md-icon>menu</md-icon></md-icon-button
        >
        <div slot="title">${this.pageId || 'home'}</div>
        <md-icon slot="actionItems">expand_more</md-icon>
      </exm-navigation-toolbar>
    `;
  }

  renderSubMenu() {
    const parentId = this.getActiveSubmenuParent();
    if (parentId === null) {
      return nothing;
    }
    const items = this.getItemsFromParentId(parentId);
    return html`
        <md-list>
        ${items.map((i) =>
          (i.items || []).length > 0
            ? html`
                <md-list-item
                  type="button"
                  ?selected=${navigationSubSelected.value === i.id}
                  class="has-submenu"
                  @click=${() => this.handleNavigationSubClicked(i, parentId)}
                  >${i.label}
                  <md-icon slot="end"
                    >${this.isSubMenuExpanded(i.id) ? 'expand_less' : 'expand_more'}</md-icon
                  ></md-list-item
                >
                <exm-collapsed id="collapsed" ?opened=${this.isSubMenuExpanded(i.id)}>
                  <div class="sub-menu">
                    <md-list>
                      ${(i.items || []).map(
                        (i) =>
                          html`<md-list-item
                            class="collapsed-item"
                            type="button"
                            @click=${() => this.handleNavigationSubClicked(i, parentId)}
                            ?selected=${this.pageId === i.id}
                            >${i.label}</md-list-item
                          >`,
                      )}
                    </md-list>
                  </div>
                </exm-collapsed>
              `
            : html`
                <md-list-item
                  type="button"
                  ?selected=${navigationSubSelected.value === i.id}
                  @click=${() => this.handleNavigationSubClicked(i, parentId)}
                  >${i.label}</md-list-item
                >
              `,
        )}</md-list>
      </div>
    `;
  }

  render() {
    return html`
      <div class="main">
        <div>
          <!--
          Navigation rail component. This will be visible on desktop and tablet(> 960px) and auto hide on smaller resolutions
        -->
          <exm-navigation-rail>
            <customer-logo slot="top"></customer-logo>
            <exm-navigation-rail-nav>
              ${this.menu.map(
                (i: MenuItem) =>
                  html`<exm-navigation-rail-nav-item
                    @click=${() => this.handleRailClick(i.id)}
                    label=${i.label}
                    icon=${i.icon!}
                    itemId=${i.id!}
                    .selected=${navigationRailSelected.value === i.id}
                    ?hasSubMenu=${(i.items || []).length > 0}
                  ></exm-navigation-rail-nav-item>`,
              )}
            </exm-navigation-rail-nav>
            <dark-light-toggle slot="bottom"></dark-light-toggle>
          </exm-navigation-rail>

          <!--
          Navigation drawer component. This will be permanently visible on screens bigger (> 1560px) and auto hide on smaller resolutions
        -->
          <exm-navigation-drawer id="drawer">
            <!--
            Navigation drawer content. This will contain the (optionaly) the toolbar and the page content for the selected page.
          -->
            <div slot="appContent" class="page-content">${this.renderToolbar()}${this.renderPage()}</div>

            <!--
            Navigation drawer navigation. This will contain the navigation items for the drawer and consists of 2 parts:
            - Top level items which will be similar as the items displayed in the rail
            - Sub level items which will be displayed when a top level item is selected (default slot)
          -->
            <exm-navigation-drawer-nav>
              <!-- Top level items -->
              <md-list slot="topLevel">
                ${this.menu.map(
                  (i) => html`
                    <md-list-item
                      type="button"
                      ?selected=${navigationRailSelected.value === i.id}
                      @click=${() => this.handleRailClick(i.id)}
                      ><md-icon slot="start">${i.icon!}</md-icon> ${i.label}
                      ${(i.items || []).length > 0
                        ? html`<md-icon slot="end">arrow_forward</md-icon>`
                        : nothing}</md-list-item
                    >
                  `,
                )}
              </md-list>

              <!-- Sub level items -->
              <div class="nav">
                ${navigationRailHidden.value
                  ? html`
                      <md-list slot="navTop">
                        <md-list-item type="button" @click=${this.handlSubMenuBackClick}
                          ><md-icon slot="start">arrow_back</md-icon> Main menu
                        </md-list-item></md-list
                      >
                      <div class="left-margin">${this.renderSubMenu()}</div>
                    `
                  : html` <div>${this.renderSubMenu()}</div> `}
              </div>
            </exm-navigation-drawer-nav>
          </exm-navigation-drawer>
        </div>
      </div>
    `;
  }
}
