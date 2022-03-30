import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
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
