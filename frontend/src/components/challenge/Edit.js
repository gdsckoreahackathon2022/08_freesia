import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import "./Challenge.css";

export default function Edit() {
  return (
    <div>
      <Navbar />

      <div className="editor">

        <div className="titleArea">
          제목:
          <input placeholder='제목을 입력하세요' className="editorTitle" />
        </div>

        <CKEditor
          editor={ClassicEditor}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />

        <button style={{ 'marginRight': '5px' }}>Edit</button>
        <Link to="/challenge"><button>Cancel</button></Link>
      </div>

    </div >
  );
}