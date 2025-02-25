import { AxiosError } from "axios";
import { shopApi } from "../api/axios.api.js";

class AuthService {
  static login = async (email, password) => {
    try {
      // const { data } = await shopApi.post('/auth/login.json', { email, password });
      const { data } = await shopApi.get("/auth/login.json");
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Unable to login");
    }
  };
}

export default AuthService;
