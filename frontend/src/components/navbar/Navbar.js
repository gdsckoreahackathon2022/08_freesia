import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import "../globalstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "../jwtlogin/AuthenticationService";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);
  function onClick() {
    setIsActive(!isActive);
  }

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className="navBar">
      <Link to="/" style={linkStyle}>
        <h1>I'm your freesia</h1>
      </Link>
      <div className="nav">
        <Link to="/challenge" style={linkStyle}>
          <span className="challenge">challenge</span>
        </Link>
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          className="mypage"
          onClick={onClick}
        />
        <div className={`dropdown ${isActive ? "active" : "inactive"}`}>
          <ul>
            <li>
              <Link to="/mypage" style={linkStyle}>
                MyPage
              </Link>
            </li>
            <hr />
            <li>
              <span
                style={{ cursor: "pointer" }}
                onClick={AuthenticationService.logout}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
