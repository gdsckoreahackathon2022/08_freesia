import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import "./Challenge.css";

export default function Create() {

  const [content, setContent] = useState("");
  const uid = localStorage.getItem("authenticatedUser");

  // 서버에 등록
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/post", {
      content: content,
      uid: uid
    })
      .then((response) => {
        alert("Uploaded Successfully!");
        window.location.href = "/challenge";
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <Navbar />

      <form className="editor" onSubmit={submitHandler}>

        <CKEditor
          editor={ClassicEditor}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />

        <button style={{ 'marginRight': '5px' }}>Write</button>
        <Link to="/challenge"><button>Cancel</button></Link>
      </form>

    </div>
  );
}