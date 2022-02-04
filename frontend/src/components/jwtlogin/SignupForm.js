import styles from "./Input.module.css";
import { useState } from "react";
import AuthenticationService from "./AuthenticationService";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [userid, setId] = useState("");
  const [password, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [contact, setContact] = useState("");

  const onChange = (event) => {
    const type = event.target.id;
    switch (type) {
      case "email":
        setEmail(event.target.value);
        break;
      case "username":
        setUsername(event.target.value);
        break;
      case "nickname":
        setNickname(event.target.value);
        break;
      case "userid":
        setId(event.target.value);
        break;
      case "password":
        setPw(event.target.value);
        break;
      case "confirmPw":
        setConfirmPw(event.target.value);
        break;
      case "contact":
        setContact(event.target.value);
        break;
      default:
        console.log();
        break;
    }
  };
  const onSubmit = (event) => {
    if (password !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다. ");
    } else {
      event.preventDefault();
      const auth = AuthenticationService;
      auth.executeSignupService(
        username,
        nickname,
        userid,
        password,
        email,
        contact
      );
      alert("Registered Successfully!");
      // window.location.href = "/";
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="email">Email : </label>
          <input required id="email" value={email} onChange={onChange}></input>
        </div>
        <div>
          <label htmlFor="nickname">Nickname : </label>
          <input
            required
            id="nickname"
            value={nickname}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            required
            id="username"
            value={username}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor="userid">ID : </label>
          <input
            required
            id="userid"
            value={userid}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor="password">PW : </label>
          <input
            required
            id="password"
            value={password}
            type="password"
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPw">Confirm PW : </label>
          <input
            required
            id="confirmPw"
            value={confirmPw}
            type="password"
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor="contact">Phone : </label>
          <input
            required
            id="contact"
            value={contact}
            onChange={onChange}
          ></input>
        </div>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
