import axios, {AxiosInstance, AxiosResponse} from "axios";

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

export const registerUser = (userData: { name: string; email: string; password: string }) => api.post('/auth/register', userData);
export const loginUser = (userData: { email: string; password: string }) => api.post('/auth/login', userData);
export const logout = () => api.get('/auth/logout');
export const fetchTasks = () => api.get('/tasks/get-tasks');
export const createTask = (taskData: { title: string }) => api.post('/tasks/create', taskData);
export const assignTask = (taskId: number, taskData: {assigned_to: number}) => api.post(`/tasks/${taskId}/assign`, taskData);
export const completeTask = (taskId: number, taskData: {status: string}) => api.post(`/tasks/${taskId}/complete`, taskData);
export const updateTask = (taskId: number, updatedData: object) => api.put(`/tasks/${taskId}/update`, updatedData);
export const deleteTask = (taskId: number) => api.delete(`/tasks/${taskId}/delete`);
export const getUserProfile = async () => {
  const response = await api.get("/user");
  return response.data;
};
export const getCsrfToken = async () => {
  await api.get("/sanctum/csrf-cookie");
};

export default api