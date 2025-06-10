import type { SearchStudentsParams, Student } from "../../config/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexStudent } from "../../hooks/studentsQueries";
import { SkeleStudentRecord } from "../ui/SkeleStudentRecord";
import { StudentRecord } from "./StudentRecord";

export const StudentsList = ({ params }: { params: SearchStudentsParams }) => {
    // queries
    const {
        data: students,
        isLoading: isStudentsLoading,
        isError: isStudentsError,
    } = useQueryIndexStudent(params, "course_id" in params) as UseQueryResult<
        Student[],
        Error
    >;

    // views
    if (isStudentsError) return <pre>students error - da gestire</pre>;
    return (
        <>
            {isStudentsLoading ? (
                Array.from({ length: 20 }).map((_, i) => (
                    <SkeleStudentRecord key={i} />
                ))
            ) : (
                <>
                    {students?.map((student) => (
                        <StudentRecord key={student.id} student={student} />
                    ))}
                </>
            )}
        </>
    );
};
