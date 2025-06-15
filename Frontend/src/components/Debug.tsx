import type { Course } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { api } from "@/services/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const Debug = () => {
    const { data } = useQueryIndexCourse({}) as UseQueryResult<Course[], Error>;

    const storeAssignment = async () => {
        if (data) {
            await api.post("/api/assignments", {
                course_id: Math.floor(Math.random() * data.length + 1),
                body: "Complete the chapter 4 exercises and upload your answers.",
                assignment_date: "2025-06-13",
                deadline: "2025-06-20",
            });
        }
    };

    useEffect(() => {
        const fetchAssignments = async (course_id: number) => {
            await api.get("/api/assignments", { params: { course_id } });
        };
        if (data) {
            data.forEach((_, i) => {
                fetchAssignments(i + 1);
            });
        }
    }, [data]);

    return (
        <div>
            <button onClick={storeAssignment} className="btn">
                Store Assignments
            </button>
        </div>
    );
};
