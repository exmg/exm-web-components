# `<exm-upload>` [![Published on npm](https://img.shields.io/npm/v/@exmg/exm-upload.svg)](https://www.npmjs.com/package/@exmg/exm-upload)

## Installation

```sh
npm install @exmg/exm-upload
```

## Example Usage

### Standard Input

```html
<exm-upload-input>
  <md-filled-text-field slot="input" label="imageUrl" name="imageUrl"
    ><md-icon-button slot="trailing-icon"><md-icon>upload</md-icon></md-icon-button></md-filled-text-field
  >
  <exm-upload slot="upload" for="imageUrl" maxSize="10mb" serverType="local"> </exm-upload>
</exm-upload-input>
```
