
  # Markdown editor element.
  ### An out of the box customizable Markdown Editor for Exmachina
 
  ```
  <exm-markdown-editor markdown="# Header 1"></exm-markdown-editor>
  ```
  ## Styling
 
   Custom property | Description | Default
   ----------------|-------------|----------
  `--exm-markdown-editor-code-color` | Editor's text color | --md-sys-color-on-surface
  `--exm-markdown-editor-code-cursor-color` | Editor's cursor color | --md-sys-color-on-surface
  `--exm-markdown-editor-code-header-color` | H1 color in editor | #4a8fc0;
  `--exm-markdown-editor-code-inline-code-color` | Inline code color | #ea881f
  `--exm-markdown-editor-code-list-color` | Lists color | rgb(25, 165, 28)
  `--exm-markdown-editor-selected-code-color` | Selected text color | rgb(140, 140, 140)
  `--exm-markdown-editor-border-color` | Editor's border color | --md-sys-color-primary
  `--exm-markdown-editor-background-color` | Toolbar and default preview background | --md-sys-color-surface-container-high
  `--exm-markdown-editor-code-background-color` | Editor's background color when focused | --md-sys-color-surface-container-high
 
   ## Events:
   - change - where detail is current markdown value
   - insert-image - if the Editor is set to upload, it will trigger this event when the insert-image is clicked
 