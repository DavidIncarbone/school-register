import type { Student } from "@/config/types";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";
import { api } from "@/services/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const AttendanceFormPage = () => {
    // vars
    const [selected, setSelected] = useState<boolean[]>();
    // queries
    const { firstCourseId, takeAttendance, presences } = useTakeAttendance();

    const { data: students } = useQueryIndexStudent(
        { course_id: firstCourseId },
        takeAttendance
    ) as UseQueryResult<Student[], Error>;

    useEffect(() => {
        if (students) {
            setSelected(students.map(() => false));
        }
    }, [students]);

    // useCallback => cacha la funzione in se
    // useMemo => cacha il return della funzione
    // memo => higher order component => wrappa un componente e 'cacha' il componente

    // react 19 => memo X

    // sono l'ultima spiaggia

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
                        students.map((student, studentIndex) => (
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
