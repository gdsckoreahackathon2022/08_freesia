import { useState } from "react";
import NavBar from "../navbar/Navbar";
import styles from "./Mypage.module.css";

function MyPage() {
  const [nickname, setNickname] = useState("nickname");

  /* const userid = localStorage.getItem("authenticatedUser");
  //const baseUrl =

  const getData = async () => {
    const response = await axios.get(baseUrl+'/mypage?userid='+userid)
    //setNickname(response.data.)
  } */
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
