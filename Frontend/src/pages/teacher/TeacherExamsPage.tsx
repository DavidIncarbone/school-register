import { CourseSelect } from "@/components/teacher/CourseSelect";
import { AddOrUpdateExamForm } from "@/components/teacher/teacherExamsPage/AddOrUpdateExamForm";
import { ExamsList } from "@/components/teacher/teacherExamsPage/ExamsList";
import { GradesList } from "@/components/teacher/teacherExamsPage/GradesList";
import { SkeleExamsList } from "@/components/ui/SkeleExamsList";
import type { Course, Exam } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexExams } from "@/hooks/examsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import type { UseQueryResult } from "@tanstack/react-query";
import { SquareMinus, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

export const TeacherExamsPage = () => {
    // *  custom hooks
    const { queryParams, updateSearchParams } = useDynamicSearchParams();

    // * vars
    const [examIdShowed, setExamIdShowed] = useState(0);
    const [isAddExamFormOpen, setIsAddExamFormOpen] = useState(false);
    const [updatingExam, setUpdatingExam] = useState<
        Exam | undefined
    >();
    const activeCourseId = queryParams?.course_id
        ? Number(queryParams.course_id)
        : 0;

    // * queries
    const { data: courses } = useQueryIndexCourse({}) as UseQueryResult<
        Course[],
        Error
    >;
    const { data: exams, isLoading: isExamsLoading } = useQueryIndexExams(
        queryParams,
        "course_id" in queryParams
    ) as UseQueryResult<Exam[], Error>;

    // * side effects
    useEffect(() => {
        if (courses && !("course_id" in queryParams)) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        }
    }, [courses, queryParams, updateSearchParams]);

    return (
        <div className="px-5 pt-2 pb-6 text-sm md:text-base">
            {/* headings */}
            <div className="flex items-center justify-between md:w-11/12 lg:w-3/5 mx-auto">
                <div className="title_h1 flex gap-1 items-center justify-center">
                    <p>Exams for:</p>
                    <CourseSelect
                        courses={courses}
                        queryParams={queryParams}
                        updateSearchParams={updateSearchParams}
                        cb={() => {
                            setExamIdShowed(0);
                            setIsAddExamFormOpen(false);
                        }}
                    />
                </div>
                <button title="Add an exam">
                    {isAddExamFormOpen ? (
                        <SquareMinus
                            onClick={() => setIsAddExamFormOpen(false)}
                            className="size-8 scale-90 hover:scale-100 transition-transform cursor-pointer"
                        />
                    ) : (
                        <SquarePlus
                            onClick={() => {
                                setIsAddExamFormOpen(true);
                                setUpdatingExam(undefined);
                            }}
                            className="size-8 scale-90 hover:scale-100 transition-transform cursor-pointer"
                        />
                    )}
                </button>
            </div>
            {/* add exam form */}
            {isAddExamFormOpen && (
                <div className="md:w-11/12 lg:w-3/5 mx-auto mt-4 mb-8">
                    <AddOrUpdateExamForm
                        queryParams={queryParams}
                        course_name={
                            courses?.find(
                                (course) => course.id === activeCourseId
                            )?.name
                        }
                        course_id={activeCourseId}
                        closeForm={() => setIsAddExamFormOpen(false)}
                        updatingExam={updatingExam}
                    />
                </div>
            )}
            {/* exams list */}
            {isExamsLoading ? (
                <SkeleExamsList />
            ) : (
                <ExamsList
                    queryParams={queryParams}
                    exams={exams}
                    examIdShowed={examIdShowed}
                    isAddExamFormOpen={isAddExamFormOpen}
                    setExamIdShowed={setExamIdShowed}
                    setUpdatingExam={setUpdatingExam}
                    setIsAddExamFormOpen={setIsAddExamFormOpen}
                />
            )}
            {/* grades list */}
            {examIdShowed ? (
                <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-8">
                    <GradesList
                        activeCourseId={activeCourseId}
                        examIdShowed={examIdShowed}
                        setExamIdShowed={setExamIdShowed}
                    />
                </div>
            ) : null}
        </div>
    );
};
