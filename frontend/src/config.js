import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://cruddjango.pythonanywhere.com/api`,
  timeout: 1000,
});
