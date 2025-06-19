// import type { Course } from "@/config/types";
// import { useQueryIndexCourse } from "@/hooks/coursesQueries";
// import { api } from "@/services/api";
// import type { UseQueryResult } from "@tanstack/react-query";
// import { DateTime } from "luxon";
// import { useEffect } from "react";

// export const Debug = () => {
//     // const { data } = useQueryIndexCourse({}) as UseQueryResult<Course[], Error>;

//     const now = DateTime.now();

//     console.log(now.toFormat("yyyy-LL-dd HH:mm:ss"));

//     const storeExam = async () => {
//         await api.post("/api/exams", {
//             course_id: 5,
//             topic: "Primo parziale - Analisi 1",
//             date: now.toFormat("yyyy-LL-dd HH:mm:ss"),
//         });
//     };
//     const updateExam = async () => {
//         await api.patch("/api/exams/49", {
//             course_id: 5,
//             topic: "Secondo parziale - Analisi 1",
//             // date: now.toFormat("yyyy-LL-dd HH:mm:ss"),
//         });
//     };
//     const destroyExam = async () => {
//         await api.delete("/api/exams/54");
//     };

//     useEffect(() => {
//         const fetchExams = async () => {
//             await api.get("/api/exams", {
//                 params: { course_id: 5 },
//             });
//         };

//         const showExam = async () => {
//             await api.get("api/exams/45");
//         };

//         fetchExams();
//         showExam();
//     }, []);

//     return (
//         <div>
//             <button onClick={storeExam} className="btn">
//                 Store exam
//             </button>
//             <button onClick={updateExam} className="btn">
//                 Update exam
//             </button>
//             <button onClick={destroyExam} className="btn">
//                 Destroy exam
//             </button>
//         </div>
//     );
// };
