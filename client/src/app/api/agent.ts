import axios, { AxiosResponse } from "axios";
import { Video } from "../models/video";
import { Download } from "../models/download";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Youtube = {
  details: (id: string) => requests.get<Video>(`/youtube/details/${id}`),
  download: (id: string, format: string) =>
    requests.get<Download>(`/youtube/download/${id}?format=${format}`),
};

const agent = {
  Youtube,
};

export default agent;
