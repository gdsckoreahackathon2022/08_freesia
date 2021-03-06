import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Challenge.css";
import freesia from "../../img/freesia.png";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";

export default function List() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    axios
      .get("/posts")
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Link to="/create">
        <FontAwesomeIcon icon={faEdit} size="2x" className="editIcon" />
      </Link>

      {/* List */}
      <div className="body">
        {posts.map((post) => (
          <div className="container" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img src={freesia} className="img" />
              <div className="info">
                <div className="nickname">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    className="userIcon"
                  />
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
