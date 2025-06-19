import { CourseSelect } from "@/components/teacher/CourseSelect";
import { SkeleExamsList } from "@/components/ui/SkeleExamsList";
import type { Course, Exam } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexExams } from "@/hooks/examsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import type { UseQueryResult } from "@tanstack/react-query";
import { Navigation } from "lucide-react";
import { useEffect } from "react";

export const TeacherExamsPage = () => {
    // *  custom hooks
    const { queryParams, updateSearchParams } = useDynamicSearchParams();

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
        <div className="px-5 py-2">
            <div className="title_h1 flex items-center justify-center mb-2">
                <p>Exams for:</p>
                <CourseSelect
                    courses={courses}
                    queryParams={queryParams}
                    updateSearchParams={updateSearchParams}
                />
            </div>
            {isExamsLoading ? <SkeleExamsList /> : <ExamsList exams={exams} />}
        </div>
    );
};

const ExamsList = ({ exams }: { exams: Exam[] | undefined }) => {
    return (
        <div className=" bg-zinc-800 lg:w-4/5 mx-auto rounded-sm border">
            {/* head */}
            <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold">
                <div className="border-b col-span-2">date</div>
                <div className="border-x border-b col-span-2">topic</div>
                <div className="border-b col-span-1">results</div>
            </div>
            {/* exams */}
            {exams?.map((exam) => (
                <div key={exam.id} className="grid grid-cols-5 [&>div]:p-2">
                    <div className="border-b col-span-2">
                        {exam.date.split(" ")[0]}
                    </div>
                    <div className="border-x border-b col-span-2">
                        {exam.topic}
                    </div>
                    <div className="border-b col-span-1 flex justify-center items-center">
                        <Navigation className="scale-75 hover:scale-100 transition-transform" />
                    </div>
                </div>
            ))}
        </div>
    );
};
