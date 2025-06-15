import { CourseSelect } from "@/components/teacher/CourseSelect";
import type { Assignment, Course } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { Paperclip, Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

export const TeacherAssignmentsPage = () => {
    // ! pagina solo per teacher => creare teacher route wrapper !
    const { queryParams, updateSearchParams } = useDynamicSearchParams();

    const { data: courses } = useQueryIndexCourse({}) as UseQueryResult<
        Course[],
        Error
    >;
    const {
        data: assignments,
        isLoading: isAssigmentsLoading,
        isError: isAssigmentsError,
    } = useQueryIndexAssignment(
        queryParams,
        "course_id" in queryParams
    ) as UseQueryResult<{ data: Assignment[]; total: number }>;

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const key = "course_id";
        const selectedCourseId = e.target.value;
        updateSearchParams([{ key, value: selectedCourseId }]);
    };

    // side effects
    useEffect(() => {
        if (courses && !("course_id" in queryParams)) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        }
    }, [courses, queryParams, updateSearchParams]);

    // views
    if (isAssigmentsError) return <pre>assignment error - da gestire</pre>;
    return (
        <div className="px-5 py-2">
            <div className="flex flex-col items-start mb-2">
                <h1 className="capitalize text-4xl font-semibold self-center">
                    assignments
                </h1>
                <CourseSelect
                    courses={courses}
                    queryParams={queryParams}
                    onChange={handleCourseSelected}
                />
            </div>
            {/* assignments list (per corso)*/}
            <div className="max-lg:w-[92dvw] mx-auto overflow-auto">
                <div className="min-w-fit">
                    <AssignmentHead />
                    <div className="border rounded-b-sm overflow-hidden bg-zinc-900">
                        {isAssigmentsLoading ? (
                            <div className="h-[425px] animate-pulse bg-zinc-800"></div>
                        ) : (
                            assignments?.data.map((as) => (
                                <AssignmentRecord key={as.id} assignment={as} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <p className="mt-2 landscape:hidden">
                Rotate the device for better visualization
            </p>
        </div>
    );
};

const AssignmentHead = () => {
    return (
        <div className="flex text-center border border-b-0 rounded-t-sm overflow-hidden font-semibold bg-zinc-950">
            <div className=" border w-40 py-2 flex justify-center items-center">
                Start
            </div>
            <div className=" border w-40 flex justify-center items-center">
                Deadline
            </div>
            <div className="grow border flex justify-center items-center">
                Assignment body
            </div>
            <div className=" border w-32 flex justify-center items-center gap-2">
                Actions
            </div>
        </div>
    );
};

const AssignmentRecord = ({ assignment }: { assignment: Assignment }) => {
    const [isModifying, setIsModifying] = useState(false);
    const assignmentBodyRef = useRef<HTMLTextAreaElement>(null);
    // actions
    const onModifyClick = () => {
        setIsModifying(true);
        assignmentBodyRef.current?.focus();
    };

    const onSaveClick = () => {
        setIsModifying(false);
    };

    return (
        <div
            className={`${
                isModifying && "italic"
            } flex odd:bg-zinc-800 3xl:h-40`}
        >
            <input
                type="date"
                disabled={!isModifying}
                defaultValue={assignment.assignment_date}
                className=" border px-4 w-40 flex justify-center items-center"
            />
            <input
                type="date"
                disabled={!isModifying}
                defaultValue={assignment.deadline}
                className=" border px-4 w-40 flex justify-center items-center"
            />
            <textarea
                ref={assignmentBodyRef}
                disabled={!isModifying}
                rows={isModifying ? 10 : 3}
                defaultValue={assignment.body}
                className="grow border min-w-92 p-3 tracking-wider leading-7 flex justify-center items-center"
            />
            <div className="border w-32 flex justify-center items-center gap-2 [&>*]:cursor-pointer [&>*]:scale-90 [&>*]:hover:scale-100 [&>*]:transition-transform">
                {isModifying ? (
                    <Save onClick={onSaveClick} className="text-blue-400" />
                ) : (
                    <>
                        <Pencil
                            onClick={onModifyClick}
                            className="text-yellow-500"
                        />
                        <Trash2 className="text-red-600" />
                        <div className="relative w-fit cursor-pointer text-slate-400">
                            <input
                                className=" opacity-0 absolute inset-0"
                                type="file"
                                accept=".txt,.doc,.docx,.pdf"
                            />
                            <Paperclip />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
