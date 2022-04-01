import axios from "axios";
import store from "@/store/index";
const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: false,
  user: store.state.user,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default {
  get_init_data() {
    return apiClient.get("/login");
  },
  login(payload) {
    console.log("loginpost", payload);
    return apiClient.post("/login", payload);
  },
  signup(payload) {
    return apiClient.post("/signup", payload);
  },
  reset_password(payload) {
    return apiClient.post("/reset_password", payload);
  },
  changePassword(payload) {
    console.log(payload, store.state.user);
    let user = store.state.user["user_id"];
    payload["user_id"] = user;
    return apiClient.post("/change_password", payload);
  },
  get_sla_data() {
    let account = store.state.user["account"];
    return apiClient.get(`/account/${account}`);
  },
  post_sla_request(payload) {
    payload["user"] = store.state.user;
    console.log("API", payload);
    return apiClient.post("/raise_requests", payload);
  },
  get_request_data() {
    let user = store.state.user["user_id"];
    let account = store.state.user["account"];
    return apiClient.get(`/requests/${user}/${account}`);
  },
  make_action(payload) {
    payload["user"] = store.state.user;
    let account = store.state.user["account"];
    let user = store.state.user["user_id"];
    return apiClient.post(`/requests/${user}/${account}`, payload);
  },
  get_sla_headers() {
    let account = store.state.user["account"];
    return apiClient.get(`/download_sla/${account}`);
  },
  post_feedback(payload) {
    payload["user"] = store.state.user;
    return apiClient.post("/contact", payload);
  },
  get_access() {
    return apiClient.get("/access_control");
  },
};
