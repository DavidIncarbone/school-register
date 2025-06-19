import { CourseSelect } from "@/components/teacher/CourseSelect";
import { SkeleExamsList } from "@/components/ui/SkeleExamsList";
import { SkeleGradesList } from "@/components/ui/SkeleGradesList";
import type { Course, Exam, Grade } from "@/config/types";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexExams } from "@/hooks/examsQueries";
import { useQueryIndexGrades } from "@/hooks/gradesQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { Navigation, X } from "lucide-react";
import {
    useEffect,
    useState,
    type Dispatch,
    type MouseEvent,
    type SetStateAction,
} from "react";

export const TeacherExamsPage = () => {
    // * vars
    const [examIdShowed, setExamIdShowed] = useState(0);

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

    const { data: grades, isLoading: isGradesLoading } = useQueryIndexGrades(
        { exam_id: examIdShowed },
        Boolean(examIdShowed)
    );

    // * side effects
    useEffect(() => {
        if (courses && !("course_id" in queryParams)) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        }
    }, [courses, queryParams, updateSearchParams]);

    useEffect(() => {
        setExamIdShowed(0);
    }, [courses]);

    return (
        <div className="px-5 py-2">
            <div className="title_h1 flex gap-1 items-center justify-center mb-2">
                <p>Exams for:</p>
                <CourseSelect
                    courses={courses}
                    queryParams={queryParams}
                    updateSearchParams={updateSearchParams}
                    cb={() => setExamIdShowed(0)}
                />
            </div>
            <div className="flex flex-col gap-4">
                {isExamsLoading ? (
                    <SkeleExamsList />
                ) : (
                    <ExamsList
                        exams={exams}
                        examIdShowed={examIdShowed}
                        setExamIdShowed={setExamIdShowed}
                    />
                )}
                {examIdShowed ? (
                    <>
                        {isGradesLoading ? (
                            <div className="lg:w-1/2 mx-auto">
                                <SkeleGradesList />
                            </div>
                        ) : (
                            <div className="flex flex-col lg:w-1/2 mx-auto gap-1">
                                <div className="flex justify-end">
                                    <X
                                        onClick={() => setExamIdShowed(0)}
                                        className="scale-90 hover:scale-100 rounded-full border transition-transform cursor-pointer"
                                    />
                                </div>
                                <GradesList grades={grades} />
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

const GradesList = ({ grades }: { grades: Grade[] }) => {
    return (
        <div className=" bg-zinc-800 rounded-sm border">
            {/* head */}
            <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold">
                <div className="border-b col-span-1">ID number</div>
                <div className="border-x border-b col-span-2">student</div>
                <div className="border-b col-span-2">grade</div>
            </div>
            {/* exams */}
            {grades?.map((grade) => (
                <div
                    key={grade.id}
                    className="grid grid-cols-5 [&>div]:p-2 text-center"
                >
                    <div className="border-b col-span-1">
                        {grade.student_id}
                    </div>
                    <div className="border-x border-b col-span-2">
                        {grade.student.first_name} {grade.student.last_name}
                    </div>
                    <div className="border-b col-span-2 text-center">
                        {grade.grade}
                    </div>
                </div>
            ))}
        </div>
    );
};

const ExamsList = ({
    exams,
    examIdShowed,
    setExamIdShowed,
}: {
    exams: Exam[] | undefined;
    examIdShowed: number;
    setExamIdShowed: Dispatch<SetStateAction<number>>;
}) => {
    console.log(exams);

    // * actions
    const handleShowGrades = async (e: MouseEvent<SVGSVGElement>) => {
        const button = e.currentTarget;
        const examId = button.id;
        setExamIdShowed(Number(examId));
    };

    return (
        <div className=" bg-zinc-800 w-11/12 lg:w-3/5 mx-auto rounded-sm border">
            {/* head */}
            <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold">
                <div className="border-b col-span-2">date</div>
                <div className="border-x border-b col-span-2">topic</div>
                <div className="border-b col-span-1">results</div>
            </div>
            {/* exams */}
            {exams?.map((exam) => (
                <div
                    key={exam.id}
                    className={`${
                        examIdShowed !== exam.id &&
                        examIdShowed !== 0 &&
                        "hidden"
                    } grid grid-cols-5 [&>div]:p-2`}
                >
                    <div className="border-b col-span-2">
                        {formatDateToDDMMYYYY(exam.date.split(" ")[0])}
                    </div>
                    <div className="border-x border-b col-span-2">
                        {exam.topic} {exam.id}
                    </div>
                    <div className="border-b col-span-1 flex justify-center items-center">
                        <Navigation
                            id={String(exam.id)}
                            onClick={handleShowGrades}
                            className="scale-75 hover:scale-100 transition-transform cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
