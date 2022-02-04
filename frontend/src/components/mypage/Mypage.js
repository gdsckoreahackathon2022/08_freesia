import { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import styles from "./Mypage.module.css";
import instance from "../jwtlogin/Request";

function MyPage() {
  const [nickname, setNickname] = useState();
  const [edit, setEdit] = useState(false);

  console.log("재실행");

  const userid = localStorage.getItem("authenticatedUser");
  const baseUrl = "http://34.64.86.102:8080";

  const getData = async () => {
    const response = await instance.get("/user?userid=" + userid);
    setNickname(response.data.nickname);
    //console.log(response);
  };

  useEffect(getData, []);

  const onChange = (event) => {
    setNickname(event.target.value);
  };

  const onChangeClick = () => {
    instance.put("/user?userid=" + userid, nickname).then((response) => {
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
