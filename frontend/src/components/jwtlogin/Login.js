import { Link } from "react-router-dom";
import bgStyles from "./Background.module.css";
import styles from "./Login.module.css";
import LoginComponent from "./LoginComponent";
import freesia from "../../img/freesia.png";

function Login() {
  return (
    <div className={bgStyles.bg}>
      <div className={bgStyles.main}>
        <div className={styles.title}>
          <h1>I'm your freesia</h1>
          <span>‘freesia’ means cheering for a new start and challenge.</span>
          <img className={styles.imgFreesia} src={freesia} alt="img" />
        </div>
        <LoginComponent />
        <div className={styles.goSignUp}>
          {" "}
          <br />
          <br />
          <span>If you don’t have an account...</span>
          <Link to={`/signup`}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
