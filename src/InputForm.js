import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import './input.css';
import axios from 'axios';
window.localStorage.setItem(
  'Token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGQyYThiODg2NmJlNTRjZTRmMWU0MSIsImlhdCI6MTYyNjc2ODg2MiwiZXhwIjoxNjM0NTQ0ODYyfQ.DT62OXyR3gAeL_7Egv0DwMtm_zF9qgggljVWZm1PM3s'
);

const token = window.localStorage.getItem('Token');

const TextEditor = () => {
  const [text, setText] = useState('');
  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    // plugin: [Font],

    toolbar: {
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'subscript',
          'superscript',
          '|',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          '-', // break point
          'fontfamily',
          'fontsize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'code',
          'codeBlock',
          '|',
          'insertTable',
          '|',
          'outdent',
          'indent',
          '|',
          'uploadImage',
          'blockQuote',
          '|',
          'undo',
          'redo',
          'heading',
          '|',
          'bulletedList',
          'numberedList',
          'fontfamily',
          'fontsize',
          '|',
          'alignment',
          '|',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'subscript',
          'superscript',
          '|',
          'link',
          '|',
          'outdent',
          'indent',
          '|',
          'todoList',
          '|',
          'code',
          'codeBlock',
          '|',
          'insertTable',
          '|',
          'uploadImage',
          'blockQuote',
          '|',
          'undo',
          'redo',
        ],
      },
      fontSize: {
        options: [9, 11, 13, 'default', 17, 19, 21],
      },
      shouldNotGroupWhenFull: true,
    },

    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };
  const handleChange = (event, editor) => {
    // event.preventDefault();
    const data = editor.getData();
    setText(data);
  };
  const handleSub = (e) => {
    axios
      .post('http://192.168.0.23:5000/post', { html: text })
      .then((res) => console.log(res))
      .catch((err) => console.log('error', err));

    // console.log('text', text);
  };

  // console.log('tthis is the text', text);

  return (
    <>
      <CKEditor
        required
        editor={ClassicEditor}
        config={custom_config}
        // data={value}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSub}>
        Click me
      </Button>
    </>
  );
};

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(props) {
    this.loader = props;
    // this.url = `https://api.bitpointx.com.au/api/v1/statements/image-upload`;
    this.url = `http://192.168.0.23:5000/post`;
    // ``;
  }

  //TODO Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }

  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }
      resolve({
        default: response.s3Url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  _sendRequest() {
    const data = new FormData();
    console.log('this is the data', data);

    this.loader.file.then((result) => {
      data.append('image', result);
      this.xhr.send(data);
    });
  }
}
export default TextEditor;
