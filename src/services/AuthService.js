import { AxiosError } from "axios";
import { shopApi } from "../api/axios.api.js";

class AuthService {
  static loginFromApi = async (email, password) => {
    try {
      // const { data } = await shopApi.post('/auth/login', { email, password });
      const { data } = await shopApi.get("/auth/login.json");
      return data;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.error(error);
      throw new Error("Unable to login");
    }
  };
}

export default AuthService;
