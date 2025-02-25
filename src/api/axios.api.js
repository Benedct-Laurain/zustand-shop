import axios from "axios";

const BASE_URL = "https://geoffreydelumeau.github.io/zustand-api";

const shopApi = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, shopApi };
