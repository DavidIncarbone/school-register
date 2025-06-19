import { CourseSelect } from "@/components/teacher/CourseSelect";
import type { Course } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexExams } from "@/hooks/examsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const ExamsPage = () => {
    // *  custom hooks
    const { queryParams, updateSearchParams } = useDynamicSearchParams();

    // * queries
    const { data: courses } = useQueryIndexCourse({}) as UseQueryResult<
        Course[],
        Error
    >;
    const { data: exams } = useQueryIndexExams(
        { course_id: courses ? Number(courses[0].id) : 0 },
        Boolean(courses)
    );

    // * side effects
    useEffect(() => {
        if (courses && !("course_id" in queryParams)) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        }
    }, [courses, queryParams, updateSearchParams]);

    return (
        <div>
            <CourseSelect
                courses={courses}
                queryParams={queryParams}
                updateSearchParams={updateSearchParams}
            />
        </div>
    );
};
