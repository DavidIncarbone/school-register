import { SkeleGradesList } from "@/components/ui/SkeleGradesList";
import type { Grade, Student } from "@/config/types";
import {
    useRef,
    useState,
    type Dispatch,
    type FormEventHandler,
    type SetStateAction,
} from "react";
import * as _ from "lodash";
import { Pencil, Save } from "lucide-react";
import { api, gradesEndpoint } from "@/services/api";
import { useGlobalStore } from "@/store/useGlobalStore";

export const GradesList = ({
    examIdShowed,
    setExamIdShowed,
    grades,
    students,
}: {
    examIdShowed: number;
    setExamIdShowed: Dispatch<SetStateAction<number>>;
    grades: Grade[] | undefined;
    students: Student[] | undefined;
}) => {
    return (
        <>
            {grades && !grades.length && (
                <p className="text-center">No results yet</p>
            )}
            <div className=" bg-zinc-800 rounded-sm border mt-2">
                {/* head */}
                <div
                    className={`${
                        grades && !grades.length && "!grid-cols-4"
                    } grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold`}
                >
                    <div className="border-b col-span-1">ID number</div>
                    <div className="border-x border-b col-span-2">student</div>
                    <div className="border-b ">grade</div>
                    {!(grades && !grades.length) && (
                        <div className="border-b border-l">actions</div>
                    )}
                </div>
                {/* exams */}
                {grades && !grades.length ? (
                    !students ? (
                        <SkeleGradesList threeCols={true} />
                    ) : (
                        <AddGradesTable
                            students={students}
                            examIdShowed={examIdShowed}
                            setExamIdShowed={setExamIdShowed}
                        />
                    )
                ) : (
                    grades?.map((grade) => (
                        <GradeRecord key={grade.id} grade={grade} />
                    ))
                )}
            </div>
        </>
    );
};

const AddGradesTable = ({
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
            setExamIdShowed(0);
        } catch (err) {
            console.error(err);
        }
    };
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
                        className="border-b text-center rounded-none !bg-zinc-950"
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

const GradeRecord = ({ grade }: { grade: Grade }) => {
    // * global store
    const { queryClient } = useGlobalStore();
    // * vars
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const currGrade = inputRef.current ? inputRef.current.value : 0;

    const handleUpdateGrade = async () => {
        try {
            setIsUpdating(false);
            if (!inputRef.current) {
                throw new Error();
            }
            const newGrade = inputRef.current.value;
            if (currGrade !== 0 && newGrade !== currGrade) {
                await api.patch(gradesEndpoint + `/${grade.id}`, {
                    grade: newGrade,
                });
                queryClient?.invalidateQueries({
                    queryKey: ["grades", { exam_id: grade.exam_id }],
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            key={grade.id}
            className="grid grid-cols-5 [&>div]:p-2 text-center"
        >
            <div className="border-b">{grade.student_id}</div>
            <div className="border-x border-b col-span-2">
                {grade.student.last_name} {grade.student.first_name}
            </div>
            <input
                ref={inputRef}
                disabled={!isUpdating}
                type="number"
                min={1}
                max={30}
                className={`${
                    isUpdating && "border-4 bg-zinc-950"
                } col-span-1 !rounded-none text-center`}
                defaultValue={grade.grade}
            ></input>
            <div className="col-span-1 flex justify-center items-center border-b">
                <Pencil
                    onClick={() => setIsUpdating(true)}
                    className={`${
                        isUpdating && "hidden"
                    } text-yellow-500 size-5 scale-90 hover:scale-100 transition-transform cursor-pointer`}
                />
                <Save
                    onClick={handleUpdateGrade}
                    className={`${
                        !isUpdating && "hidden"
                    } text-blue-500 size-5 scale-90 hover:scale-100 transition-transform cursor-pointer`}
                />
            </div>
        </div>
    );
};
