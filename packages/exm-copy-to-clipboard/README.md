# `<exm-copy-to-clipboard>` [![Published on npm](https://img.shields.io/npm/v/@exm/exm-copy-to-clipboard.svg)](https://www.npmjs.com/package/@exm/exm-copy-to-clipboard)

# @exm/exm-copy-to-clipboard

Helper element to create icon/buttons that lets the user copy content to the clipboard. Just wrap it around
the button or icon and set the value that needs to be copied.

## Installation

```sh
npm install @exm/exm-copy-to-clipboard
```

## Example Usage

### Standard

```html
<exm-copy-to-clipboard value="mark@test.com">
  <md-icon-button><md-icon>content-copy</md-icon></md-icon-button>
</exm-copy-to-clipboard>
```

## API

### Slots

| Name      | Description                        |
| --------- | ---------------------------------- |
| _default_ | Button to handle copy to clipboard |

### Properties/Attributes

| Name    | Type     | Default | Description                              |
| ------- | -------- | ------- | ---------------------------------------- |
| `value` | `string` | _None_  | The value that gets copied and displayed |

### Methods

| Name     | Description                                       |
| -------- | ------------------------------------------------- |
| `toggle` | Toggles the opened state of the component         |
| `show`   | Sets the opened state of the component to _true_  |
| `hide`   | Sets the opened state of the component to _false_ |

### Events

_None_

### CSS Custom Properties

_None_

## Additional references

- [Additional Documentation](https://exmg.github.io/exmachina-web-components/ExmgCopyToClipboard.html)

- [Demo](https://exmg.github.io/exmachina-web-components/demo/?el=exm-copy-to-clipboard)
