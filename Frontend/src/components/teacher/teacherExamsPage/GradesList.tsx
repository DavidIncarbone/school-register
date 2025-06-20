import { SkeleGradesList } from "@/components/ui/SkeleGradesList";
import type { Grade, Student } from "@/config/types";
import type { FormEventHandler } from "react";
import type React from "react";
import * as _ from "lodash";
// import { gradesFormSchema, type GradesFormData } from "@/schemas/gradeSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

export const GradesList = ({
    grades,
    students,
}: {
    grades: Grade[] | undefined;
    students: Student[] | undefined;
}) => {
    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<GradesFormData>({
    //     resolver: zodResolver(gradesFormSchema),
    //     defaultValues: {
    //         grades: [{ grade: -1, }],
    //     },
    // });
    // todo: fare componente e usare hook form
    const handleAddGrades: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as object;
        console.log(data);
        let dataArray = _.values(data);
        console.log(dataArray);

        // chiamata api per mass store di grades
    };

    return (
        <>
            {grades && !grades.length && (
                <p className="text-center">No results yet</p>
            )}
            <div className=" bg-zinc-800 rounded-sm border mt-2">
                {/* head */}
                <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold">
                    <div className="border-b col-span-1">ID number</div>
                    <div className="border-x border-b col-span-2">student</div>
                    <div className="border-b col-span-2">grade</div>
                </div>
                {/* exams */}
                {grades && !grades.length ? (
                    !students ? (
                        <SkeleGradesList />
                    ) : (
                        // todo: fare componente e usare hook form
                        <form onSubmit={handleAddGrades}>
                            {students.map((student, i) => (
                                <div
                                    key={student.id}
                                    className="grid grid-cols-5 [&>div]:p-2 text-center"
                                >
                                    <div className="border-b col-span-1">
                                        {student.id}
                                    </div>
                                    <div className="border-x border-b col-span-2">
                                        {student.last_name} {student.first_name}
                                    </div>
                                    <input
                                        id={String(student.id)}
                                        autoFocus={i === 0}
                                        required
                                        type="number"
                                        name={`grade.${student.id}`}
                                        defaultValue={1}
                                        min={0}
                                        max={30}
                                        className="border-b col-span-2 text-center rounded-none"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end gap-4 p-6 bg-[#2a2d33]">
                                <button
                                    className="btn-pretty text-red-500"
                                    type="reset"
                                >
                                    Reset
                                </button>
                                <button
                                    className="btn-pretty text-green-400"
                                    type="submit"
                                >
                                    Add grades
                                </button>
                            </div>
                        </form>
                    )
                ) : (
                    grades?.map((grade) => (
                        <div
                            key={grade.id}
                            className="grid grid-cols-5 [&>div]:p-2 text-center"
                        >
                            <div className="border-b col-span-1">
                                {grade.student_id}
                            </div>
                            <div className="border-x border-b col-span-2">
                                {grade.student.last_name}{" "}
                                {grade.student.first_name}
                            </div>
                            <div className="border-b col-span-2 text-center">
                                {grade.grade}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
