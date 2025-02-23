import axios, {AxiosInstance, AxiosResponse} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-CSRFToken",
});

export const POST = async <T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config);
};

export const PUT = async <T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data, config);
};

export const DEL = async <T>(url: string, config?: any): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url, config);

};
export const GET = async <T>(url: string, config?: any): Promise<AxiosResponse<T>> => {
  console.log(typeof url)
  return api.get<T>(url, config);
};
export const getCsrfToken = async () => {
  await api.get("/sanctum/csrf-cookie"); // Fetch CSRF token
};

export default api