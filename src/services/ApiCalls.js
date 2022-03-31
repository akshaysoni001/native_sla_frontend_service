import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: false,
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
    return apiClient.post("/raise_requests/admin/vil", payload);
  },
  reset_password(payload) {
    return apiClient.post("/raise_requests/admin/vil", payload);
  },
  get_sla_data() {
    return apiClient.get("/account/vil");
  },
  post_sla_request(payload) {
    console.log("API", payload);
    return apiClient.post("/raise_requests/admin/vil", payload);
  },
  get_request_data() {
    return apiClient.get("/requests/admin/vil");
  },
  make_action(payload) {
    return apiClient.post("/requests/admin/vil", payload);
  },
  get_sla_headers() {
    return apiClient.get("/download_sla/vil");
  },
  post_feedback(payload) {
    return apiClient.post("/contact/admin/vil", payload);
  },
  get_access() {
    return apiClient.get("/access_control");
  },
};
