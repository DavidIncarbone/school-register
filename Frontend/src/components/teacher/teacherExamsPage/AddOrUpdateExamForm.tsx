import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import { examSchema, type ExamFormData } from "@/schemas/examSchema";
import { useGlobalStore } from "@/store/useGlobalStore";
import { api, examsEndpoint } from "@/services/api";
import { useState } from "react";
import type { Exam } from "@/config/types";

type AddOrUpdateExamFormProps = {
    course_name: string | undefined;
    course_id: number | undefined;
    queryParams: Record<string, string>;
    closeForm: () => void;
    updatingExam?: Exam;
};

export const AddOrUpdateExamForm = ({
    course_name,
    course_id,
    queryParams,
    closeForm,
    updatingExam,
}: AddOrUpdateExamFormProps) => {
    // * global store
    const { queryClient } = useGlobalStore();

    // * vars
    const [isLoading, setIsLoading] = useState(false);
    const defaultValues = updatingExam
        ? {
              date: updatingExam?.date.split(" ")[0],
              topic: updatingExam?.topic,
          }
        : {
              date: "",
              topic: "",
          };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(examSchema),
        defaultValues,
    });

    // * actions
    const createNewExam = async (formData: ExamFormData) => {
        try {
            setIsLoading(true);
            const data = { ...formData, course_id };
            let res;
            if (updatingExam) {
                res = await api.patch(
                    examsEndpoint + `/${updatingExam?.id}`,
                    data
                );
            } else {
                res = await api.post(examsEndpoint, data);
            }
            console.log(res.data);
            queryClient?.invalidateQueries({
                queryKey: ["exams", queryParams],
                exact: true,
            });
            if (updatingExam) {
                toast.success("Exam updated successfully");
            } else {
                toast.success("Exam added successfully");
            }
            closeForm();
            reset(defaultValues);
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // * views
    return (
        <form
            className="w-full bg-zinc-800 p-4 rounded-md shadow-lg"
            onSubmit={handleSubmit(createNewExam)}
        >
            <div>
                <h2 className="text-white text-2xl">
                    {updatingExam ? (
                        <span>Updating {updatingExam?.topic}</span>
                    ) : (
                        <>
                            <span>
                                Add exam for{" "}
                                <span className="italic capitalize">
                                    {course_name}
                                </span>
                            </span>{" "}
                        </>
                    )}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                    The fields marked with * are required
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="date">Date*</label>
                        <input
                            type="date"
                            {...register("date")}
                            className="border border-white p-3"
                        />
                    </div>
                    <p className="text-red-500 text-sm">
                        {errors?.date?.message}
                    </p>
                </div>
                <div>
                    <label className="flex flex-col" htmlFor="topic">
                        <span>Topic*</span>
                        <span className="text-xs text-white/80 pb-1">
                            Max. 50 characters
                        </span>
                    </label>
                    <textarea
                        {...register("topic")}
                        className="w-full border border-white p-3"
                        rows={2}
                        maxLength={50}
                    />
                    <p className="text-red-500 text-sm">
                        {errors?.topic?.message}
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center mt-2">
                <button
                    type="submit"
                    className={`btn-pretty ${
                        isLoading && "!cursor-not-allowed"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="inline-block absolute inset-0">
                                <Loader isContained={true} />
                            </span>
                            <span className="text-transparent">
                                {updatingExam ? "Update Exam" : "Add Exam"}
                            </span>
                        </>
                    ) : (
                        <span>{updatingExam ? "Update Exam" : "Add Exam"}</span>
                    )}
                </button>
            </div>
        </form>
    );
};
