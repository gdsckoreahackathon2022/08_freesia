import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Axios } from 'axios';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Navbar from '../navbar/Navbar';
import "./Challenge.css";

export default function Edit() {

  // id에 맞는 게시글 불러오기
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/posts")
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const postList = posts.filter(post => (post.id === Number(id)));

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
              console.log({ event, editor, data });
            }}
          />

          <button style={{ 'marginRight': '5px' }}>Edit</button>
          <Link to="/challenge"><button>Cancel</button></Link>
        </div>
      ))}


    </div >
  );
}