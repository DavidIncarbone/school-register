import axios from "axios";

// ! in PRODUZIONE: da spostare in .env il dominio e gli endpoints
export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});
export const userEndpoint = "/api/user";
export const courseEndpoint = "/api/courses";
export const studentsEndpoint = "/api/students";
export const presencesEndpoint = "/api/presences";
export const lessonScheduleEndpoint = "/api/lesson_schedules";
export const assignmentEndpoint = "/api/assignments";
export const profileEndpoint = "/api/profile";
export const examsEndpoint = "/api/exams";
export const gradesEndpoint = "/api/grades";

// ***** ADMIN *****

export const adminTeachersEndpoint = "/api/admin/teachers";
