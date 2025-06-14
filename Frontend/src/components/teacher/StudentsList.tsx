import type { Student } from "../../config/types";
import { SkeleStudentRecord } from "../ui/SkeleStudentRecord";
import { StudentRecord } from "./StudentRecord";

type StudentsListProps = {
    students: { total_students: number; data: Student[] } | undefined;
    isLoading: boolean;
    isError: boolean;
};

export const StudentsList = ({
    students,
    isLoading,
    isError,
}: StudentsListProps) => {
    // views
    if (isError) return <pre>students error - da gestire</pre>;
    return (
        <>
            {isLoading ? (
                Array.from({ length: 20 }).map((_, i) => (
                    <SkeleStudentRecord key={i} />
                ))
            ) : (
                <>
                    {students?.data?.map((student) => (
                        <StudentRecord key={student.id} student={student} />
                    ))}
                </>
            )}
        </>
    );
};
