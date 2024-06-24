# `<exm-tooltip>` [![Published on npm](https://img.shields.io/npm/v/@exm/exm-tooltip.svg)](https://www.npmjs.com/package/@exm/exm-tooltip)

# @exm/exm-tooltip

Tooltip element to display small amounts of information bound to an element.

[Demo](https://exmg.github.io/exmachina-web-components/demo/?el=exm-tooltip)

## Installation

```sh
npm install @exm/exm-tooltip
```

## Example Usage

### Standard

```html
<div style="position:relative;">
  <button id="styledBtn">Test</button>
  <exm-tooltip for="styledBtn">the name means "different lizard"</exm-tooltip>
</div>
```

## API

### Slots

| Name      | Description                        |
| --------- | ---------------------------------- |
| _default_ | Button to handle copy to clipboard |

### Properties/Attributes

| Name                 | Type      | Default    | Description                                                                                           |
| -------------------- | --------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `for`                | `string`  | _None_     | The id of the element that the tooltip is anchored to. This element must be a sibling of the tooltip. |
| `position`           | `string`  | _`bottom`_ | Positions the tooltip to the top, right, bottom, left of its content.                                 |
| `fitToVisibleBounds` | `boolean` | _None_     | The id of the element that the tooltip is anchored to. This element must be a sibling of the tooltip. |
| `xOffset`            | `number`  | _None_     | X axis offset from the parent's center.                                                               |
| `yOffset`            | `number`  | _None_     | Y axis offset from the parent's center.                                                               |

### Methods

_None_

### Events

_None_

### CSS Custom Properties

| Name                           | Default   | Description               |
| ------------------------------ | --------- | ------------------------- |
| `--exm-tooltip-font-size`     | `10px`    | Font size of tooltip text |
| `--exm-tooltip-line-height`   | `1`       | Text line height          |
| `--exm-tooltip-background`    | `#616161` | Background color          |
| `--exm-tooltip-opacity`       | `0.9`     | Tooltip opacity           |
| `--exm-tooltip-text-color`    | `white`   | Font color                |
| `--exm-tooltip-padding`       | `8px`     | Container padding         |
| `--exm-tooltip-border-radius` | `2px`     | Container border radius   |
| `--exm-tooltip-min-width`     | `initial` | Min width of the tooltip  |

## Additional references

- [Additional Documentation](https://exmg.github.io/exmachina-web-components/ExmgTooltip.html)

- [Demo](https://exmg.github.io/exmachina-web-components/demo/?el=exm-tooltip)
