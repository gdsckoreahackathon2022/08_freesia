import { useState } from "react";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Challenge.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  // 등록 함수
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/posts", {
        title: title,
        content: content,
        nickname: localStorage.getItem("nickname"),
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

      <div className="editor">
        <div className="titleArea">
          제목:
          <input placeholder="제목을 입력하세요" className="editorTitle" />
        </div>

        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />

        <button style={{ marginRight: "5px" }}>Write</button>
        <Link to="/challenge">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
