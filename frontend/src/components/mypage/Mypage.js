import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import styles from "./Mypage.module.css";

function MyPage() {
  const [nickname, setNickname] = useState("");

  const userid = localStorage.getItem("authenticatedUser");
  const baseUrl = "http://localhost:8080";

  const getData = async () => {
    const response = await axios.get(baseUrl + "/user?userid=" + userid);
    setNickname(response.data.nickname);
    console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <NavBar />
      <div className={styles.profile}>
        <i className="fas fa-user-circle"></i>
        <h2>{nickname}</h2>
        <button>Logout</button>
      </div>
    </main>
  );
}

export default MyPage;
