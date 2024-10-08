import { UploadAdapter, UploadConfig } from '../types.js';

class XHRJSONUploadAdapter implements UploadAdapter {
  config: UploadConfig;

  constructor(config: UploadConfig) {
    this.config = config;
  }

  async upload(file: File, progressCallback: (progress: number) => void): Promise<string> {
    const onProgress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        progressCallback(Math.round(percentage));
      }
    };
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', onProgress);

    const formData = new FormData();
    formData.set('file', file);
    formData.set('filename', file.name);

    return new Promise<string>((resolve, reject) => {
      const { uploadUrl } = this.config;

      if (!uploadUrl) reject(new Error(`Upload url not found`));
      xhr.responseType = 'json';
      xhr.open('POST', uploadUrl!, true);
      for (const key in this.config.headers || {}) {
        if (Object.prototype.hasOwnProperty.call(this.config.headers, key)) {
          xhr.setRequestHeader(key, this.config.headers![key]);
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };
      xhr.onerror = () => {
        reject(new Error('Upload failed due to network error'));
      };
      xhr.send(formData);
    });
  }
}

export { XHRJSONUploadAdapter as UploadAdapter };
