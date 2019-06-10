import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
const editorConfiguration = {
  toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote','alignment' ],
  heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
  },
  alignment:{
    options: [ 'left', 'right' ]
  }
        
};
class Editor extends Component {
  render() {
      return (
          <div className="App">
              <h2>Using CKEditor 5 build in React</h2>
              <CKEditor
                  editor={ DecoupledEditor }
                  data="<p>Hello from CKEditor 5!</p>"
                  onInit={ editor => {
                    console.log( 'Editor is ready to use!', editor );

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      console.log( { event, editor, data } );
                  } }
                  onBlur={ editor => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ editor => {
                      console.log( 'Focus.', editor );
                  } }
              />
          </div>
      );
  }
}

export default Editor;