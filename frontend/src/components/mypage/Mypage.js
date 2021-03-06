import { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import styles from "./Mypage.module.css";
import axios from "axios";
import AuthenticationService from "../jwtlogin/AuthenticationService";

function MyPage() {
  const [nickname, setNickname] = useState();
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  console.log("재실행");

  const userid = localStorage.getItem("authenticatedUser");
  const baseUrl = "http://localhost:8080";

  const getData = async () => {
    const response = await axios.get("/user?userid=" + userid);
    setNickname(response.data.nickname);
    //console.log(response);
  };

  useEffect(getData, []);

  const onChange = (event) => {
    setNickname(event.target.value);
  };

  const onChangeClick = () => {
    axios
      .put("/user?userid=" + userid, { nickname: nickname })
      .then((response) => {
        console.log("changed");
      });
  };

  return (
    <main>
      <NavBar />
      <div className={styles.profile}>
        <i className="fas fa-user-circle"></i>
        <div className={styles.nickname}>
          <input
            className={styles.nicknameInput}
            value={nickname || ""}
            onChange={onChange}
          ></input>
          <button onClick={onChangeClick}>Change</button>
        </div>
        <button
          onClick={() => {
            AuthenticationService.logout();
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}

export default MyPage;
