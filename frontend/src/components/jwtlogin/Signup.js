import bgStyles from "./Background.module.css";
import styles from "./Signup.module.css";
import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <div className={bgStyles.bg}>
      <div className={bgStyles.main}>
        <h1>Sign up</h1>
        <SignupForm />
      </div>
    </div>
  );
}
