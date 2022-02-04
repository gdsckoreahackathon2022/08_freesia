import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import "./Challenge.css";
import instance from "../jwtlogin/Request";

export default function Create() {

  const [content, setContent] = useState("");
  const uid = localStorage.getItem("authenticatedUser");

  // 서버에 등록
  const submitHandler = (e) => {
    e.preventDefault();
    instance.post("/post", {
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

  // 이미지 업로드
  const API_URL = "http://34.64.86.102:8080";
  const UPLOAD_ENDPOINT = "imageUpload.do";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            instance.post(`/${UPLOAD_ENDPOINT}`, {
              body: body
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.filename}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      <Navbar />

      <form className="editor" onSubmit={submitHandler}>

        <CKEditor
          editor={ClassicEditor}
          config={{
            extraPlugins: [uploadPlugin]
          }}
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