import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Challenge.css";
import freesia from "../../img/freesia.png";
import { useEffect, useState } from 'react';
import instance from "../jwtlogin/Request";
import parse from "html-react-parser";

export default function List() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    instance.get("/posts")
      .then(function (response) {
        setPosts(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Link to="/create"><FontAwesomeIcon icon={faEdit} size="2x" className="editIcon" /></Link>

      {/* List */}
      <div className="body">

        {posts.map(post => (
          <div className="container" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img src={freesia} className="img" />
              <div className="info">
                <div className="nickname">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" className="userIcon" />
                  {post.uid}
                </div>
                <div className="title">{parse(post.content)}</div>
              </div>
            </Link>
          </div>
        ))}

      </div>

    </div>
  );
}