import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Challenge.css";
import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import { Link, useParams } from 'react-router-dom';
import instance from "../jwtlogin/Request";
import parse from "html-react-parser";

export default function Detail() {

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

  const uid = localStorage.getItem("authenticatedUser");

  // 글 삭제
  const deleteHandler = (id, e) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      instance.delete(`/post?pid=${id}`)
        .then(response => {
          alert("삭제되었습니다.");
          window.location.href = "/challenge";
        }).catch(error => {
          alert(error.response.data);
        });
    }
  }

  // 작성자만 열 수 있는 메뉴
  const [isActive, setIsActive] = useState(false);
  function onClick() {
    if (uid === postList[0].uid) {
      setIsActive(!isActive);
    }
    else {
      alert("작성자만 사용 가능한 메뉴입니다.");
    }
  }

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const EmojiData = ({ chosenEmoji }) => (
    <div>
      {chosenEmoji.emoji}
      {chosenEmoji.unified}
    </div>
  );

  const unicode = "1f620";
  console.log('\u{1f620}');

  const [emojiActive, setEmojiActive] = useState(false);
  function emojiClick() {
    setEmojiActive(!emojiActive);
  }

  return (
    <div>
      <Navbar />

      {postList.map(post => (
        <div className="detailBox" key={post.id}>
          <div className="detailInfo">
            <div className="nickname">
              <FontAwesomeIcon icon={faUserCircle} size="2x" className="userIcon" />
              {post.uid}
            </div>
            <div className="detailRight">
              <div className="date">{post.createDate}</div>
              <FontAwesomeIcon icon={faEllipsisV} size="2x" onClick={onClick} className="option" />
              <div className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                  <li><Link to={`/edit/${post.id}`}>Edit</Link></li><hr />
                  <li onClick={(e) => { deleteHandler(post.id, e) }} style={{ 'cursor': 'pointer' }}>Delete</li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

          <div className="detailContent">
            {parse(post.content)}
          </div>

          <div className="emoji">
            <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={emojiClick} />
            <div className={`emojiPicker ${emojiActive ? 'active' : 'inactive'}`}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_NEUTRAL}
                groupNames={{ smileys_people: 'PEOPLE' }}
              />
            </div>
            {/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
          </div>

        </div>
      ))}

    </div>
  );
}