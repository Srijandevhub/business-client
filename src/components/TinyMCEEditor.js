import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ onChange }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="zo6yb4grqhm3nncj9vdxkj31ljiet0w4d4k0gecpnjx5d6l2"
      init={{
        height: 250,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
}

export default TinyMCEEditor;