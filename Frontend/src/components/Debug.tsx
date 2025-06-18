import type { Course } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { api } from "@/services/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const Debug = () => {
    // const { data } = useQueryIndexCourse({}) as UseQueryResult<Course[], Error>;

    const storeExams = async () => {
        // if (data) {
        // await api.post("/api/exams", {
        //     course_id: Math.floor(Math.random() * data.length + 1),
        //     body: "Complete the chapter 4 exercises and upload your answers.",
        //     assignment_date: "2025-06-13",
        //     deadline: "2025-06-20",
        // });
        // }
    };

    useEffect(() => {
        const fetchExams = async () => {
            await api.get("/api/exams", {
                params: { course_id: 4, subject_id: 1 },
            });
        };
        fetchExams();
    }, []);

    return (
        <div>
            <button onClick={storeExams} className="btn">
                Store exams
            </button>
        </div>
    );
};
