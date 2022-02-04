import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import styles from "./Input.module.css";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: localStorage.getItem("authenticatedUser") || "",
      password: "",
      token: localStorage.getItem("token") || "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    AuthenticationService.executeJwtAuthenticationService(
      this.state.userid,
      this.state.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJwt(
          this.state.userid,
          response.data.token
        );
        console.log(response);
        //window.location.href = "/";
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <form className={styles.loginForm}>
        <div className={styles.inputs}>
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showSuccessMessage && <div>Login Sucessful</div>}
          <div>
            <label htmlFor="userid">User ID : </label>
            <input
              id="userid"
              type="text"
              name="userid"
              value={this.state.userid}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="pw">Password : </label>
            <input
              id="pw"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button className="btn btn-success" onClick={this.loginClicked}>
          Login
        </button>
      </form>
    );
  }
}

export default LoginComponent;
