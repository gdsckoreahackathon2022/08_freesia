import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
    baseURL: "http://34.64.86.102:8080"
});
instance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default instance;