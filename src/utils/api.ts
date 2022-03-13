import axios from "axios";
import { HttpHeader } from "@/utils/constant";
import { Auth } from "@/utils/auth";
import { User } from "firebase/auth";

/** API定義 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { [HttpHeader.XIdToken]: "" },
});

/** APIリクエスト前 */
api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const logInUser = (await Auth.fetchLoginUser()) as User;
      if (logInUser) {
        config.headers[HttpHeader.XIdToken] = await logInUser.getIdToken();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** APIレスポンス前 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
