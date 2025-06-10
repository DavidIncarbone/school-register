import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
});

export const courseEndpoint = "/api/courses";
export const studentsEndpoint = "/api/students";
