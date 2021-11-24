import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://cruddjango.pythonanywhere.com/api`,
  timeout: 1000,

  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
