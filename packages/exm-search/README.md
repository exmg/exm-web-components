# `<exm-search>` [![Published on npm](https://img.shields.io/npm/v/@exmg/exm-search.svg)](https://www.npmjs.com/package/@exmg/exm-search)

# exm-search

Exmg search provides an search input in material 3 style

## Installation

```sh
npm install @exmg/exm-search
```

## Example Usage

```html
<exm-search placeHolder="Filter table.." @search-value-change="${() => console.log('update')}"></exm-search>
```

## API

### Properties/Attributes

| Name          | Type      | Default  | Description                                     |
| ------------- | --------- | -------- | ----------------------------------------------- |
| `bubbles`     | `boolean` | _false_  | Whether or not the change events need to bubble |
| `placeHolder` | `string`  | `Search` | Default value for placeholder                   |

## Styles

| Custom property                       | Description            | Default                                      |
| ------------------------------------- | ---------------------- | -------------------------------------------- |
| `--exm-search-outline-color`          | outline color          | `--md-outlined-field-hover-outline-width`;   |
| `--exm-search-outline-width`          | outline width          | `1px`;                                       |
| `--exm-search-container-shape`        | container shape        | `4px`;                                       |
| `--exm-search-focus-input-text-color` | focus input text color | `--md-sys-color-on-surface`;                 |
| `--exm-search-focus-label-text-color` | focus label text color | `--md-sys-color-primary`;                    |
| `--exm-search-focus-icon-color`       | focus icon color       | `--md-sys-color-on-surface-variant`;         |
| `--exm-search-focus-outline-color`    | focus outline color    | `--md-sys-color-primary`;                    |
| `--exm-search-focus-outline-width`    | focus outline width    | `1px`;                                       |
| `--exm-search-hover-input-text-color` | hover input text color | `--md-sys-color-on-surface`;                 |
| `--exm-search-hover-label-text-color` | hover label text color | `--md-sys-color-on-surface`;                 |
| `--exm-search-hover-outline-color`    | hover outline color    | `--md-sys-color-on-surface`                  |
| `--exm-search-input-text-color`       | input text color       | `--md-sys-color-on-surface`;                 |
| `--exm-search-input-text-font`        | input text font        | `--md-sys-typescale-body-large-font`;        |
| `--exm-search-input-text-line-height` | input text line height | `--md-sys-typescale-body-large-line-height`; |
| `--exm-search-input-text-size`        | input text size        | `--md-sys-typescale-body-large-size`;        |
| `--exm-search-input-text-weight`      | input text weight      | `--md-sys-typescale-body-large-weight`;      |
| `--exm-search-label-text-color`       | label text color       | `md-sys-color-on-surface-variant`;           |
| `--exm-search-label-text-font`        | label text font        | `--md-sys-typescale-body-large-font`;        |
| `--exm-search-label-text-line-height` | label line height      | `--md-sys-typescale-body-large-line-height`; |
| `--exm-search-label-text-size`        | label text size        | `--md-sys-typescale-body-large-size`;        |
| `--exm-search-label-text-weight`      | label weight           | `--md-sys-typescale-body-large-weight`;      |
| `--exm-search-icon-color`             | icon color             | `--md-sys-color-on-surface-variant`;         |
| `--exm-search-icon-size`              | icon size              | `24px`;                                      |
| `--exm-search-outline-color`          | outline color          | `--md-sys-color-outline`;                    |
| `--exm-search-outline-width`          | outline color width    | `1px`;                                       |

## Additional references

- [Demo](https://exmg.github.io/exmachina-web-components/demo/?el=exm-search)
