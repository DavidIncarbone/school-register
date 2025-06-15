import type { Student } from "@/config/types";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";
import { api } from "@/services/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const AttendanceFormPage = () => {
    // vars
    const [selected, setSelected] = useState<boolean[]>();
    const location = useLocation().state;
    const forcedCourseId = location?.forcedCourseId;
    const forcedTakeAttendance = location?.forcedTakeAttendance;

    // queries
    const { courseId, takeAttendance, presences } = useTakeAttendance(
        forcedCourseId,
        forcedTakeAttendance
    );

    const { data: students } = useQueryIndexStudent(
        { course_id: courseId },
        takeAttendance
    ) as UseQueryResult<{ data: Student[]; total_students: number }, Error>;

    useEffect(() => {
        if (students && students.total_students) {
            setSelected(students.data.map(() => false));
        }
    }, [students]);

    const handleClick = async () => {
        await api.post("/api/presences", {
            students_ids: students?.data.map((student) => student.id),
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
                        students.data.map((student, studentIndex) => (
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
                                                prev?.map((checked, i) =>
                                                    i === studentIndex
                                                        ? !checked
                                                        : checked
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
                            presences.data.map((student) => (
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
