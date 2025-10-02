import axios, { type Method } from "axios";
import { message } from "ant-design-vue";
import { config } from "../config/Config";

export const request = async (
  url = "",
  method: Method = "get",
  data: any = {},
  extraHeaders: Record<string, string> = {},
  // withCredentials:true, //important to send HttpOnly cookies
) => {
  
  let headers: Record<string, string> = {
    Accept: "application/json",
    ...extraHeaders,
  };

  let payload = data;

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else if (method.toLowerCase() !== "get") {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(data);
  } else {
    payload = undefined;
  }

  // Attach token
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Attach Accept-Language header
  const lang = localStorage.getItem("lang") || "en";
  headers["Accept-Language"] = lang;

  try {
    const response = await axios({
      url: config.API_URL + url,
      method,
      headers,
      data: payload,
      params: method.toLowerCase() === "get" ? data : undefined,
      withCredentials: false,
    });
    return response.data;
  } catch (error: unknown) {
    let status;
    let errorMsg = "An error occurred";

    if (axios.isAxiosError(error) && error.response) {
      status = error.response.status;
      if (status === 401) {
        errorMsg = "Unauthorized: Please log in again.";
      } else if (status === 500) {
        errorMsg = "Internal Server Error";
      } else if (status === 404) {
        errorMsg = "Resource Not Found";
      } else if (status) {
        errorMsg = error.response.data?.message || `Error: ${status}`;
      }
    }
    message.error(errorMsg);
    throw error;
  }
};
