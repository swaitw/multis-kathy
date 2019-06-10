import React from 'react';
import tinymce from 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/themes/silver';
import { Meteor } from 'meteor/meteor';

class TinyEditor extends React.Component {
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          plugins: 'link paste',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
          skin: "oxide",
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEditor;