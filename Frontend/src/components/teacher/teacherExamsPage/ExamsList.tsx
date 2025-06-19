import type { Exam } from "@/config/types";
import { api, examsEndpoint } from "@/services/api";
import { useGlobalStore } from "@/store/useGlobalStore";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import { Navigation, Pencil, Trash2 } from "lucide-react";
import {
    useState,
    type Dispatch,
    type MouseEvent,
    type SetStateAction,
} from "react";

export const ExamsList = ({
    queryParams,
    exams,
    examIdShowed,
    isAddExamFormOpen,
    setExamIdShowed,
    setUpdatingExam,
    setIsAddExamFormOpen,
}: {
    queryParams: Record<string, string>;
    exams: Exam[] | undefined;
    examIdShowed: number;
    isAddExamFormOpen: boolean;
    setExamIdShowed: Dispatch<SetStateAction<number>>;
    setUpdatingExam: Dispatch<
        SetStateAction<Record<string, string> | undefined>
    >;
    setIsAddExamFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    // * global store
    const { queryClient } = useGlobalStore();
    // * vars
    const [isRemoveLoading, setIsRemoveLoading] = useState(false);

    // * actions
    const handleShowGrades = async (e: MouseEvent<SVGSVGElement>) => {
        const button = e.currentTarget;
        const examId = button.id;
        setExamIdShowed(Number(examId));
    };

    const btnDisabled =
        isRemoveLoading || Boolean(examIdShowed) || isAddExamFormOpen;

    return (
        <div className=" bg-zinc-800 w-11/12 lg:w-3/5 mx-auto rounded-sm border">
            {/* head */}
            <div className="grid grid-cols-6 capitalize [&>div]:p-2 text-center font-semibold">
                <div className="border-b col-span-2">date</div>
                <div className="border-x border-b col-span-2">topic</div>
                <div className="border-b border-r col-span-1">results</div>
                <div className="border-b col-span-1">actions</div>
            </div>
            {/* exams */}
            {exams?.map((exam) => (
                <div
                    key={exam.id}
                    className={`${
                        examIdShowed !== exam.id &&
                        examIdShowed !== 0 &&
                        "hidden"
                    } grid grid-cols-6 [&>div]:p-2`}
                >
                    <div className="border-b col-span-2">
                        {formatDateToDDMMYYYY(exam.date.split(" ")[0])}
                    </div>
                    <div className="border-x border-b col-span-2">
                        {exam.topic} {exam.id}
                    </div>
                    <div className="border-r border-b col-span-1 flex justify-center items-center">
                        <button
                            disabled={btnDisabled}
                            className={`${
                                btnDisabled && "!cursor-not-allowed"
                            } cursor-pointer`}
                        >
                            <Navigation
                                id={String(exam.id)}
                                onClick={handleShowGrades}
                                className="scale-75 hover:scale-100 text-blue-500 transition-transform"
                            />
                        </button>
                    </div>
                    <div className="border-b col-span-1 flex justify-center items-center gap-2">
                        <button
                            disabled={btnDisabled}
                            className={`${
                                btnDisabled && "!cursor-not-allowed"
                            } cursor-pointer`}
                        >
                            <Pencil
                                onClick={() => {
                                    console.log(exam.date);
                                    setUpdatingExam({
                                        id: String(exam.id),
                                        course_id: String(exam.course_id),
                                        date: exam.date.split(" ")[0],
                                        topic: exam.topic,
                                    });
                                    setIsAddExamFormOpen(true);
                                }}
                                className="text-yellow-500 scale-75 hover:scale-100 transition-transform"
                            />
                        </button>
                        <button
                            disabled={btnDisabled}
                            className={`${
                                btnDisabled && "!cursor-not-allowed"
                            } cursor-pointer`}
                        >
                            <Trash2
                                onClick={async () => {
                                    try {
                                        setIsRemoveLoading(true);
                                        await api.delete(
                                            examsEndpoint + `/${exam.id}`
                                        );
                                        queryClient?.invalidateQueries({
                                            queryKey: ["exams", queryParams],
                                            exact: true,
                                        });
                                    } catch (err) {
                                        console.error(err);
                                    } finally {
                                        setIsRemoveLoading(false);
                                    }
                                }}
                                className="text-red-600 scale-75 hover:scale-100 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
