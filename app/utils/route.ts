import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import { store } from "../redux/store";
import { loginSuccess } from "../redux/authSlice"
import {Task} from "@/app/types/Task";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) { // @ts-ignore
    return parts.pop().split(';').shift();
  }
};
const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    'X-CSRF-TOKEN': getCookie('XSRF-TOKEN')
  },
    withCredentials: true,
});

export const registerUser = (userData: { name: string; email: string; password: string; role: string }) => api.post('/auth/register', userData);
export const loginUser = async (useData: { email: string; password: string }) => {
  const response = await api.post("/auth/login", useData);

  // Store user data in Redux
  store.dispatch(loginSuccess(response.data.user));

  return response.data;
};
export const logoutUser = () => api.get('/auth/logout');
export const getTasks = () => api.get('/tasks/get-tasks');
export const createTask = (taskData: { title: string, description: string }) => api.post('/tasks/create', taskData);
export const assignTask = (taskId: number, assigned_to: number) => api.post(`/tasks/${taskId}/assign`, assigned_to);
export const completeTask = (taskId: number) => api.post(`/tasks/${taskId}/complete`);
export const updateTask = (taskId: number, updatedData: object) => api.put(`/tasks/${taskId}/update`, updatedData);
export const deleteTask = (taskId: number) => api.delete(`/tasks/${taskId}/delete`);
export const fetchAssignedTasks = async (userId: number): Promise<AxiosResponse<Task[]>> => {
  return api.get<Task[]>(`/tasks/assigned/${userId}`);
}
// };
export const getCsrfToken = async () => {
  await api.get("/sanctum/csrf-cookie");
};

export default api