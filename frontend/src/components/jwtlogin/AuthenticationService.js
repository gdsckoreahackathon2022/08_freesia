import axios from "axios";

class AuthenticationService {
  // 회원가입 시 서버에 정보 전송
  executeSignupService(username, nickname, userid, password, email, contact) {
    return axios.post("http://localhost:8080/signup", {
      username,
      nickname,
      userid,
      password,
      email,
      contact,
    });
  }

  // 로그인 시 서버에 id, pw 전송
  executeJwtAuthenticationService(userid, password) {
    return axios.post("http://localhost:8080/authenticate", {
      userid,
      password,
    });
  }

  executeHelloService() {
    console.log("===executeHelloService===");
    return axios.get("http://localhost:8080/hello");
  }

  /* registerSuccessfulLoginForJwt(id, token) {
    console.log("===registerSuccesfulLoginForJwt");
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", id);
    this.setupAxiosInterceptors();
    console.log("hi");
  } */
  registerSuccessfulLoginForJwt(id, token) {
    console.log("===registerSuccesfulLoginForJwt");
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", id);
    this.setupAxiosInterceptors(token);
    console.log("hi");
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  setupAxiosInterceptors(token) {
    console.log("hi");
    axios.interceptors.request.use(
      (config) => {
        //const token = localStorage.getItem("token");
        //if (token) {
        console.log(token);
        config.headers["Authorization"] = "Bearer " + token;
        console.log(config.headers["Authorization"]);
        //}
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  logout() {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  isUserLoggedInt() {
    const token = localStorage.getItem("token");
    console.log("===UserLoggedInCheck===");
    console.log(token);

    if (token) return true;

    return false;
  }

  getLoggedInUserName() {
    let user = localStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }
}

export default new AuthenticationService();
