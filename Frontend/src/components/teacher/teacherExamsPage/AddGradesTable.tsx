import type { Student } from "@/config/types";
import { api, gradesEndpoint } from "@/services/api";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import toast from "react-hot-toast";
import * as _ from "lodash";

export const AddGradesTable = ({
    students,
    examIdShowed,
    setExamIdShowed,
}: {
    students: Student[];
    examIdShowed: number;
    setExamIdShowed: Dispatch<SetStateAction<number>>;
}) => {
    // * global store
    const { queryClient } = useGlobalStore();

    // * actions
    const handleAddGrades: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as object;
        const studentsIds = _.keys(data);
        const grades = _.values(data);
        try {
            await api.post(gradesEndpoint, {
                exam_id: examIdShowed,
                students_ids: studentsIds,
                grades,
            });
            queryClient?.invalidateQueries({
                queryKey: ["grades", { exam_id: examIdShowed }],
            });
            toast.success("Grades added successfully");
            setExamIdShowed(0);
        } catch (err) {
            toast.error("Cannot add grades. Please retry");
            console.error(err);
        }
    };

    // * views
    return (
        <form onSubmit={handleAddGrades}>
            {students.map((student, i) => (
                <div
                    key={student.id}
                    className="grid grid-cols-4 [&>div]:p-2 text-center"
                >
                    <div className="border-b">{student.id}</div>
                    <div className="border-x border-b col-span-2">
                        {student.last_name} {student.first_name}
                    </div>
                    <input
                        id={String(student.id)}
                        autoFocus={i === 0}
                        required
                        type="number"
                        name={`${student.id}`}
                        defaultValue={1}
                        min={1}
                        max={30}
                        className="border-b text-center rounded-none bg-zinc-700 ring-2 ring-blue-500"
                    />
                </div>
            ))}
            <div className="flex justify-end gap-4 p-6 bg-[#2a2d33]">
                <button className="btn-pretty text-red-500" type="reset">
                    Reset
                </button>
                <button className="btn-pretty text-green-400" type="submit">
                    Add grades
                </button>
            </div>
        </form>
    );
};
