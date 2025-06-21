import type { Grade } from "@/config/types";
import { api, gradesEndpoint } from "@/services/api";
import { useGlobalStore } from "@/store/useGlobalStore";
import { Pencil, Save } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const GradeRecord = ({ grade }: { grade: Grade }) => {
    // * global store
    const { queryClient } = useGlobalStore();
    // * vars
    const inputRef = useRef<HTMLInputElement>(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const currGrade = inputRef.current ? inputRef.current.value : 0;

    // * actions
    const handleUpdateGrade = async () => {
        try {
            if (!inputRef.current) {
                throw new Error();
            }
            setIsUpdating(true);
            const newGrade = inputRef.current.value;
            if (currGrade !== 0 && newGrade !== currGrade) {
                await api.patch(gradesEndpoint + `/${grade.id}`, {
                    grade: newGrade,
                });
                queryClient?.invalidateQueries({
                    queryKey: ["grades", { exam_id: grade.exam_id }],
                });
                toast.success("Grade updated successfully");
            }
        } catch (err) {
            toast.error("Cannot update grade. Please retry");
            console.error(err);
        } finally {
            setIsUpdating(false);
            setUpdateMode(false);
        }
    };

    // * views
    return (
        <div
            key={grade.id}
            className="grid grid-cols-5 border-x [&>div]:p-2 text-center"
        >
            <div className="border-b">{grade.student_id}</div>
            <div className="border-x border-b col-span-2">
                {grade.student.last_name} {grade.student.first_name}
            </div>
            <input
                ref={inputRef}
                disabled={!updateMode || isUpdating}
                type="number"
                min={1}
                max={30}
                className={`${
                    updateMode && "!ring-2 ring-blue-500 border-none bg-zinc-700"
                } col-span-1 ring-0 border-b border-r !rounded-none text-center`}
                defaultValue={grade.grade}
            ></input>
            <div className="col-span-1 flex justify-center items-center border-b">
                <Pencil
                    onClick={() => setUpdateMode(true)}
                    className={`${
                        updateMode && "hidden"
                    } text-yellow-500 size-5 scale-90 hover:scale-100 transition-transform cursor-pointer`}
                />
                <button disabled={isUpdating}>
                    <Save
                        onClick={handleUpdateGrade}
                        className={`${!updateMode && "hidden"} ${
                            isUpdating && "!cursor-not-allowed"
                        } text-blue-500 size-5 scale-90 hover:scale-100 transition-transform cursor-pointer`}
                    />
                </button>
            </div>
        </div>
    );
};
