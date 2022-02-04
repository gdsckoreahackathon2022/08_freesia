import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
	baseURL: "http://localhost:8080"
});
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default instance;