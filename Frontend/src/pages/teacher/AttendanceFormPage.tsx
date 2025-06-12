import type { Course, SearchStudentsParams, Student } from "@/config/types";
import { useQueryIndexCalendar } from "@/hooks/calendarQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const AttendanceFormPage = () => {
    // vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [selected, setSelected] = useState([]);
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

    const { data: calendar } = useQueryIndexCalendar({});

    console.log(calendar);

    // side effects
    useEffect(() => {
        if (courses && !("course_id" in params)) {
            setSearchParams({ course_id: String(courses[0].id) });
        }
    }, [courses, params, setSearchParams]);

    const handleClick = () => {
        console.log("fai chiamata api in post (mass store presences");
    };

    return (
        <div>
            <div className="grid grid-cols-2 border-b-4 mb-2 text-xl font-semibold">
                <span>Studente</span>
                <span>Presenza</span>
            </div>
            <div>
                <button onClick={handleClick} className="btn">
                    Cliccami
                </button>
            </div>
            <div className="space-y-2 overflow-auto h-[500px]">
                {students &&
                    students.map((student) => (
                        <div className="grid grid-cols-2">
                            <div key={student.id}>
                                <span>
                                    {student.first_name} {student.last_name}
                                </span>
                            </div>
                            <div>
                                <input
                                    className="size-4"
                                    type="checkbox"
                                    name=""
                                    id=""
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
