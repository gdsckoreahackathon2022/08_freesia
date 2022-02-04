import { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Challenge.css";
import freesia from "../../img/freesia.png";
import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';

export default function Detail() {

  const [isActive, setIsActive] = useState(false);
  function onClick() {
    setIsActive(!isActive);
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
      <div className="detailBox">
        <div className="detailInfo">
          <div className="nickname">
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="userIcon" />
            Nickname
          </div>
          <div className="detailRight">
            <div className="date">2022.01.25</div>
            <FontAwesomeIcon icon={faEllipsisV} size="2x" onClick={onClick} style={{ 'color': 'gray', 'cursor': 'pointer' }} />
            <div className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <ul>
                <li>Edit</li><hr />
                <li>Delete</li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div className="detailContent">
          재교육 1일차! 응원해주세요^^
          <img src={freesia} width="100%" />
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
          {unicode}
          {/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
        </div>


      </div>

    </div>
  );
}