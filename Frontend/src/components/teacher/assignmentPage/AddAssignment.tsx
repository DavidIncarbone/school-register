import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useMutationStoreAssignment } from "@/hooks/assignmentsQueries";
import type { Course, IndexAssignmentsParams } from "@/config/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import {
    assignmentsSchema,
    type AssignmentFormData,
} from "@/schemas/assignmentsSchema";

// TYPES
type AddAssignmentProps = {
    courses: Course[] | undefined;
    queryParams: IndexAssignmentsParams;
    isLoading: boolean;
    // tipizzazione speciale per useState
    setIsFormShowing: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AddAssignment = ({
    courses,
    queryParams,
    setIsFormShowing,
}: AddAssignmentProps) => {
    // * vars
    const startDate = new Date().toISOString().split("T")[0];
    const currentCourse = courses?.find(
        (course) => course.id == queryParams.course_id
    );
    const defaultValues = {
        course_id: queryParams?.course_id,
        assignment_date: "",
        deadline: "",
        body: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(assignmentsSchema),
        defaultValues,
    });

    // * queries
    const {
        mutate: storeMutate,
        isSuccess: isStoreSuccess,
        isPending: isStorePending,
    } = useMutationStoreAssignment(queryParams);

    // * actions
    const createNewAssignment = async (formData: AssignmentFormData) => {
        console.log(formData);
        console.log(typeof queryParams?.course_id);
        storeMutate(formData);
    };

    // * collaterals effects
    useEffect(() => {
        if (isStoreSuccess) {
            toast.success("Assignment added successfully");
            reset(defaultValues);
            setIsFormShowing(false);
        }
    }, [isStoreSuccess, reset]);

    // views

    return (
        <form
            id="AssignmentForm"
            className="w-full"
            onSubmit={handleSubmit(createNewAssignment)}
        >
            <div>
                <h2 className="text-white text-2xl">
                    Add Assignment for{" "}
                    <span className="underline capitalize">
                        {currentCourse?.name}
                    </span>
                </h2>
                <p className="text-gray-400 text-sm">
                    The fields marked with * are required
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-16 lg:gap-32 my-3">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="start">Start*</label>
                        <input
                            type="date"
                            {...register("assignment_date")}
                            id="start"
                            max={startDate}
                            className="border border-white p-3"
                        />
                    </div>
                    {errors.body && (
                        <p className="text-red-500 text-sm">
                            {errors.assignment_date?.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5 ">
                        <label htmlFor="deadline">Deadline*</label>
                        <input
                            type="date"
                            {...register("deadline")}
                            id="deadline"
                            className="border border-white p-3 "
                        />
                    </div>
                    {errors.deadline && (
                        <p className="text-red-500 text-sm">
                            {errors.deadline.message}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="body">Body*</label>
                <p className="text-xs text-white/80 pb-1">
                    Max. 10 rows | Max. 255 charachters
                </p>
                <textarea
                    id="body"
                    {...register("body")} // name assegnato tramite useForm
                    className="w-full border border-white p-3"
                    rows={10}
                    maxLength={255}
                ></textarea>
                <div className="h-[20px]">
                    {errors.body && (
                        <p className="text-red-500 text-sm">
                            {errors.body?.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <button
                    type="submit"
                    className={`btn-pretty ${
                        isStorePending && "!cursor-not-allowed"
                    }`}
                    disabled={isStorePending}
                >
                    {isStorePending ? (
                        <>
                            <div className="absolute inset-0">
                                <Loader isContained={true} />
                            </div>
                            <span className="text-transparent">
                                Add Assignment
                            </span>
                        </>
                    ) : (
                        "Add Assignment"
                    )}
                </button>
                <button
                    type="reset"
                    className={`${
                        isStorePending && "!cursor-not-allowed opacity-50"
                    } btn-pretty`}
                >
                    Reset
                </button>
            </div>
            {/* HIDDEN INPUT
                <input
                    type="hidden"
                    {...register("course_id")}
                    value={queryParams.course_id}
                /> */}
        </form>
    );
};
