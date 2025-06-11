import type { Course, SearchStudentsParams, Student } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const AttendanceFormPage = () => {
    // vars
    const [searchParams, setSearchParams] = useSearchParams();
    // const [selected, setSelected] = useState(null);
    const params = Object.fromEntries(
        searchParams.entries()
    ) as SearchStudentsParams;
    // queries
    const { data: courses } = useQueryIndexCourse() as UseQueryResult<
        Course[],
        Error
    >;
    const { data: students } = useQueryIndexStudent(
        params,
        "course_id" in params
    ) as UseQueryResult<Student[], Error>;

    // side effects
    useEffect(() => {
        if (courses && !("course_id" in params)) {
            setSearchParams({ course_id: String(courses[0].id) });
        }
    }, [courses, params, setSearchParams]);

    const handleClick = () => {
        console.log("fai chiamata api in post (mass store presences");
    };

    console.log(students);

    return (
        <div>
            <div className="grid grid-cols-2 border-b-4 mb-2 text-xl font-semibold">
                <span>Studente</span>
                <span>Presenza</span>
            </div>
            <div>
                <button onClick={handleClick} className="btn">
                    CLiccami
                </button>
            </div>
            <div className="space-y-2">
                {students &&
                    students.map((student) => (
                        <div className="grid grid-cols-2">
                            <div key={student.id}>
                                <span>
                                    {student.first_name} {student.last_name}
                                </span>
                            </div>
                            <input type="checkbox" name="" id="" />
                        </div>
                    ))}
            </div>
        </div>
    );
};
