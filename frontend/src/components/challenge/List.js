import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Challenge.css";
import freesia from "../../img/freesia.png";

export default function List() {
  return (
    <div>
      <Navbar />
      <Link to="/create"><FontAwesomeIcon icon={faEdit} size="2x" className="editIcon" /></Link>

      {/* List */}
      <div className="body">
        <div className="container">
          <img src={freesia} className="img" />
          <div className="info">
            <div className="nickname">
              <FontAwesomeIcon icon={faUserCircle} size="2x" className="userIcon" />
              Nickname
            </div>
            <div className="title">재교육 1일차! 응원해주세요^^</div>
          </div>
        </div>
      </div>

    </div>
  );
}