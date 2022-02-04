import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import styles from "./Mypage.module.css";

function MyPage() {
  const [nickname, setNickname] = useState();
  const [edit, setEdit] = useState(false);

  console.log("재실행");

  const userid = localStorage.getItem("authenticatedUser");
  const baseUrl = "http://localhost:8080";

  const getData = async () => {
    const response = await axios.get(baseUrl + "/user?userid=" + userid);
    setNickname(response.data.nickname);
    //console.log(response);
  };

  useEffect(getData, []);

  const onChange = (event) => {
    setNickname(event.target.value);
  };

  const onChangeClick = () => {
    axios.put(baseUrl + "/user?userid=" + userid, nickname).then((response) => {
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
            value={nickname}
            onChange={onChange}
          ></input>
          <button onClick={onChangeClick}>Change</button>
        </div>
        <button>Logout</button>
      </div>
    </main>
  );
}

export default MyPage;
