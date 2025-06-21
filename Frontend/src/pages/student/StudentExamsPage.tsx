import { SubjectSelect } from "@/components/student/SubjectSelect";
import type { Grade, GradesParams } from "@/config/types";
import { useQueryIndexGrades } from "@/hooks/gradesQueries";
import { useQueryIndexSubjects } from "@/hooks/subjectsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const StudentExamsPage = () => {
    // * custom hooks
    const { queryParams, updateSearchParams } = useDynamicSearchParams();

    // * vars
    const subjectId = queryParams.subject_id
        ? Number(queryParams.subject_id)
        : 0;

    // * queries
    const { data: subjects } = useQueryIndexSubjects();

    // * side effects
    useEffect(() => {
        if (subjects && !("subject_id" in queryParams)) {
            updateSearchParams([
                { key: "subject_id", value: String(subjects[0].id) },
            ]);
        }
    }, [subjects, queryParams, updateSearchParams]);

    // * views
    return (
        <div className="px-5 py-2 lg:max-w-3/5 mx-auto flex flex-col">
            {/* headings */}
            <h1 className="title_h1 text-center">Grades overview</h1>
            <div className="space-x-1 font-semibold">
                <span>Select subject:</span>
                <SubjectSelect
                    subjects={subjects}
                    queryParams={queryParams}
                    updateSearchParams={updateSearchParams}
                />
            </div>

            {/* gradesList */}
            <div className="w-full mt-4 max-md:text-sm">
                <GradesList subjectId={subjectId} />
            </div>
        </div>
    );
};

const GradesList = ({ subjectId }: { subjectId: number }) => {
    // * queries
    const { data: grades, isLoading: isGradesLoading } = useQueryIndexGrades(
        { subject_id: subjectId },
        Boolean(subjectId)
    ) as UseQueryResult<Grade[], Error>;

    return (
        <div>
            {isGradesLoading ? (
                <>
                    {[1, 2, 3].map((_, i) => (
                        <div
                            key={i}
                            className="text-transparent grid grid-cols-4 text-center border border-white first:rounded-t-sm last:rounded-b-sm [&>div]:px-2 [&>div]:py-2 bg-zinc-950 animate-pulse"
                        >
                            <div>00/00/0000</div>
                            <div className="border-white border-x col-span-2 text-start">
                                Lorem, ipsum.
                            </div>
                            <div>00</div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <div className="bg-zinc-950 grid grid-cols-4 border capitalize font-semibold text-center rounded-t-sm [&>div]:py-2">
                        <div>date</div>
                        <div className="border-x col-span-2">topic</div>
                        <div>grade</div>
                    </div>
                    {grades?.map((grade) => (
                        <div
                            key={grade.id}
                            className="even:bg-zinc-800 odd:bg-zinc-900 grid grid-cols-4 text-center border-x border-b last:rounded-b-sm [&>div]:px-2 [&>div]:py-2"
                        >
                            <div>
                                {formatDateToDDMMYYYY(
                                    grade.exam.date.split(" ")[0]
                                )}
                            </div>
                            <div className="border-x col-span-2 text-start">
                                {grade.exam.topic}
                            </div>
                            <div>{grade.grade}</div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
