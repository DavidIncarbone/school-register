import { CourseSelect } from "@/components/teacher/CourseSelect";
import type { Course } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ChangeEvent } from "react";

export const TeacherAssignmentsPage = () => {
    // ! pagina solo per teacher => creare teacher route wrapper !
    const { queryParams, updateSearchParams } = useDynamicSearchParams();
    const courseIdFromParams = queryParams?.course_id ?? 0;

    const { data: courses } = useQueryIndexCourse({}) as UseQueryResult<
        Course[],
        Error
    >;
    const {
        data: assignments,
        // isLoading: isAssigmentsLoading,
        // isError: isAssigmentsError,
    } = useQueryIndexAssignment(
        {
            course_id: courseIdFromParams
                ? Number(courseIdFromParams)
                : courses?.length
                ? courses[0].id
                : 0,
        },
        Boolean(courseIdFromParams) || Boolean(courses?.length)
    );

    console.log(assignments);

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const key = "course_id";
        const selectedCourseId = e.target.value;
        updateSearchParams([{ key, value: selectedCourseId }]);
    };

    return (
        <div>
            <CourseSelect
                courses={courses}
                queryParams={queryParams}
                onChange={handleCourseSelected}
            />
        </div>
    );
};
