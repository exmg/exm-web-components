# `<exm-breadcrumbs>` [![Published on npm](https://img.shields.io/npm/v/@exmg/exm-breadcrumbs.svg)](https://www.npmjs.com/package/@exmg/exm-breadcrumbs)

# @exmg/exm-breadcrumbs

Component to render breadcrumbs within a page or component with the option to enable / disable arrow seperator

## Installation

```sh
npm install @exmg/exm-breadcrumbs
```

## Example Usage

### Standard

```js
@state()
private items = [
   {href: '/home', content: 'Home page'},
   {href: '/users', content: 'User List'},
   {href: '/users/1234', content: 'Mark'},
   {href: '/users/1234/details', content: 'Details'},
 ];
```

```html
<exm-breadcrumbs .items="${this.items}"></exm-breadcrumbs>
```

## API

### Slots

| Name      | Description                        |
| --------- | ---------------------------------- |
| _default_ | Button to handle copy to clipboard |

### Properties/Attributes

| Name             | Type      | Default | Description                                   |
| ---------------- | --------- | ------- | --------------------------------------------- |
| `items`          | `array`   | _[]_    | The items displayed by the breadcrumbs        |
| `arrowSeperator` | `boolean` | _false_ | Whether or not to display the arrow seperator |

### Methods

_None_

### Events

_None_

### CSS Custom Properties

_None_

## Additional references

- [Additional Documentation](https://exmg.github.io/exmachina-web-components/ExmBreadcrumbs.html)

- [Demo](https://exmg.github.io/exmachina-web-components/demo/?el=exm-breadcrumbs)
