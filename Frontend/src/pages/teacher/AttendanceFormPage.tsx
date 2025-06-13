import type {
    Course,
    IndexStudentParams,
    Period,
    Presence,
    Student,
} from "@/config/types";
import { useQueryIndexCalendar } from "@/hooks/calendarQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import { api } from "@/services/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const AttendanceFormPage = () => {
    // vars
    const [selected, setSelected] = useState<boolean[]>();
    // queries
    const { data: calendar, isLoading: isCalendarLoading } =
        useQueryIndexCalendar() as UseQueryResult<Period[], Error>;

    const firstCourseId =
        calendar?.find((period) => period.lesson_time == 1)?.course_id ?? 0;
    const { data: presences } = useQueryIndexPresence(
        {
            course_id: firstCourseId,
            date: new Date().toISOString().split("T")[0],
        },
        Boolean(firstCourseId)
    ) as UseQueryResult<{ data: Presence[]; total: number }[], Error>;

    const takeAttendance =
        presences && presences[0]?.total === 0 ? true : false;
    const { data: students } = useQueryIndexStudent(
        { course_id: firstCourseId },
        takeAttendance
    ) as UseQueryResult<Student[], Error>;

    useEffect(() => {
        if (students) {
            setSelected(students.map(() => false));
        }
    }, [students]);

    const handleClick = async () => {
        await api.post("/api/presences", {
            students_ids: students?.map((student) => student.id),
            are_presents: selected,
        });
    };

    return (
        <div>
            <div className="grid grid-cols-2 border-b-4 mb-2 text-xl font-semibold">
                <span>Studente</span>
                <span>Presenza</span>
            </div>
            {students ? (
                <div>
                    <button onClick={handleClick} className="btn">
                        Conferma appello
                    </button>
                </div>
            ) : (
                <pre className="py-4 text-4xl text-amber-500">
                    appello gia eseguito
                </pre>
            )}
            {/* take attendance */}
            {students ? (
                <div className="space-y-2 overflow-auto h-[500px]">
                    {students &&
                        students.map((student, i) => (
                            <div className="grid grid-cols-2">
                                <div key={student.id}>
                                    <span>
                                        {student.first_name} {student.last_name}
                                    </span>
                                </div>
                                <div>
                                    <input
                                        onChange={() =>
                                            setSelected((prev) =>
                                                prev?.map((bool, index) =>
                                                    index === i ? !bool : bool
                                                )
                                            )
                                        }
                                        className="size-4"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <>
                    {/* attendance already taken */}
                    <div className="h-[500px] overflow-auto">
                        {presences &&
                            presences[0].data.map((student) => (
                                <div
                                    className="flex
                            "
                                >
                                    <div className="w-128">
                                        {student.student_first_name}{" "}
                                        {student.student_last_name}
                                    </div>
                                    <span>
                                        {String(Boolean(student.is_present))}
                                    </span>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};
