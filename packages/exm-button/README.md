# `<exm-button>` [![Published on npm](https://img.shields.io/npm/v/@exmg/exm-button.svg)](https://www.npmjs.com/package/@exmg/exm-button)

# exm-button

Exmg button extends the material 3 md buttons but adds loading (spinner) animation when loading attribute is set to element. This button extends the material @material/web/button.

## Installation

```sh
npm install @exmg/exm-button
```

## Example Usage

### Text

```html
<exm-text-button disabled loading>This button is disabled and loading</exm-text-button>
```

### Filled

```html
<exm-text-button loading>This button is disabled and loading</exm-text-button>>
```

## API

### Properties/Attributes

| Name      | Type      | Default | Description                                   |
| --------- | --------- | ------- | --------------------------------------------- |
| `loading` | `boolean` | _false_ | Whether or not the button is in loading state |

For other options see the m3 docs:

- [Material 3 Button Docs](https://github.com/material-components/material-web/blob/main/docs/components/button.md)

## Additional references

- [Demo / Docs](https://exmg.github.io/exmachina-web-components/demo/?el=exm-button)
