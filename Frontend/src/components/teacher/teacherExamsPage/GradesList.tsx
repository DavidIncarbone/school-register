import { SkeleGradesList } from "@/components/ui/SkeleGradesList";
import type { Grade, Student } from "@/config/types";
import { type Dispatch, type SetStateAction } from "react";
import { GradeRecord } from "./GradeRecord";
import { GradeHead } from "./GradeHead";
import { AddGradesTable } from "./AddGradesTable";
import { useQueryIndexGrades } from "@/hooks/gradesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";

export const GradesList = ({
    activeCourseId,
    examIdShowed,
    setExamIdShowed,
}: {
    activeCourseId: number;
    examIdShowed: number;
    setExamIdShowed: Dispatch<SetStateAction<number>>;
}) => {
    // * queries
    const { data: grades, isLoading: isGradesLoading } = useQueryIndexGrades(
        { exam_id: examIdShowed },
        Boolean(examIdShowed)
    ) as UseQueryResult<Grade[], Error>;

    const { data: students } = useQueryIndexStudent(
        { course_id: activeCourseId },
        Boolean(grades && !grades.length && activeCourseId)
    ) as UseQueryResult<{ data: Student[] }, Error>;

    // * vars
    const noResults = Boolean(grades && !grades.length);

    // * views
    return (
        <>
            {isGradesLoading ? (
                <SkeleGradesList threeCols={noResults} />
            ) : (
                <>
                    {noResults && <p className="text-center">No results yet</p>}
                    <div className=" bg-zinc-800 border-t rounded-sm mt-2">
                        {/* head */}
                        <GradeHead threeCols={noResults} />
                        {/* exams */}
                        {noResults ? (
                            !students ? (
                                <SkeleGradesList threeCols={noResults} />
                            ) : (
                                <AddGradesTable
                                    students={students.data}
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
            )}
        </>
    );
};
