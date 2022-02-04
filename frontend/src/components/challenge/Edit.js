import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Navbar from '../navbar/Navbar';
import "./Challenge.css";
import instance from "../jwtlogin/Request";

export default function Edit() {

  // id에 맞는 게시글 불러오기
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    instance.get("/posts")
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const postList = posts.filter(post => (post.id === Number(id)));

  // 글 수정
  const [content, setContent] = useState("");

  const editHandler = (e) => {
    e.preventDefault();
    instance.put(`/post?pid=${id}`,
      {
        content: content
      }).then(response => {
        alert("수정되었습니다.");
        window.location.href = `/post/${id}`;
      }).catch(error => {
        alert(error.response.data);
      });
  }

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

      {postList.map(post => (
        <div className="editor" key={post.id}>
          <CKEditor
            editor={ClassicEditor}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            data={post.content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />

          <button onClick={editHandler} style={{ 'marginRight': '5px' }}>Edit</button>
          <Link to="/challenge"><button>Cancel</button></Link>
        </div>
      ))}

    </div>
  );
}