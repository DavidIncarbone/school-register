import Loader from "@/components/ui/Loader";
import {
    UserType,
    type Assignment,
    type IndexAssignmentsParams,
} from "@/config/types";
import { useMutationUpdateAssignment } from "@/hooks/assignmentsQueries";
import {
    assignmentsSchema,
    type AssignmentFormData,
} from "@/schemas/assignmentsSchema";
import { useGlobalStore } from "@/store/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const AssignmentRecord = ({
    assignment,
    setIsOpen,
    setAssignmentId,
    setAssignmentBody,
    queryParams,
}: {
    assignment: Assignment;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setAssignmentId: Dispatch<SetStateAction<number>>;
    setAssignmentBody: Dispatch<SetStateAction<string>>;
    queryParams: IndexAssignmentsParams;
}) => {
    // * vars
    const { authUser } = useGlobalStore();
    const [isModifying, setIsModifying] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(assignmentsSchema),
    });

    // queries

    const {
        mutate: updateMutate,
        isSuccess: isUpdateSuccess,
        isPending: isUpdatePending,
        data: updateData,
    } = useMutationUpdateAssignment(queryParams, assignment.id as number); // * actions
    const onModifyClick = () => {
        setIsModifying(true);
    };

    const updateAssignment = async (formData: AssignmentFormData) => {
        updateMutate(formData as Assignment);
    };

    // collaterals

    useEffect(() => {
        if (isUpdateSuccess) {
            setIsModifying(false);
            // if (updateData?.isClean) {
            //   toast.success("No changes made.", {
            //     style: {
            //       border: "1px solid blue",
            //       padding: "16px",
            //       color: "blue",
            //     },
            //     iconTheme: {
            //       primary: "blue",
            //       secondary: "#FFFAEE",
            //     },
            //   });
            // } else {
            toast.success("Assignment updated succesfully");
            // }
        }
    }, [updateData]);

    // * views
    return (
        <>
            <form
                className={`${
                    isModifying && "italic"
                } flex  odd:bg-zinc-800 even:bg-zinc-950 3xl:h-40`}
                onSubmit={handleSubmit(updateAssignment)}
            >
                <input
                    type="date"
                    disabled={!isModifying}
                    {...register("assignment_date")}
                    defaultValue={assignment.assignment_date.split(" ")[0]}
                    className=" border px-4 w-40 flex justify-center"
                />
                <input
                    type="date"
                    disabled={!isModifying}
                    {...register("deadline")}
                    defaultValue={assignment.deadline.split(" ")[0]}
                    className=" border px-4 w-40 flex justify-center items-center"
                />
                <textarea
                    disabled={!isModifying}
                    {...register("body")}
                    rows={isModifying ? 10 : 3}
                    defaultValue={assignment.body}
                    className="grow border min-w-92 p-3 tracking-wider leading-7 flex justify-center items-center"
                />

                <div className="border w-32 flex justify-center items-center gap-2 [&>*]:cursor-pointer [&>*]:scale-90 [&>*]:hover:scale-100 [&>*]:transition-transform">
                    {authUser?.type === UserType.TEACHER && isModifying ? (
                        isUpdatePending ? (
                            <Loader isContained={true} />
                        ) : (
                            <button type="submit">
                                <Save className="text-blue-400" />
                            </button>
                        )
                    ) : (
                        <>
                            <Pencil
                                onClick={onModifyClick}
                                className="text-yellow-500"
                            />
                            <Trash2
                                className="text-red-600"
                                onClick={() => {
                                    setAssignmentId(assignment.id as number);
                                    setAssignmentBody(
                                        assignment.body as string
                                    );
                                    setIsOpen(true);
                                }}
                            />
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
                    {authUser?.type === UserType.STUDENT && (
                        <label className="custom-checkbox">
                            <input type="checkbox" id="myCheckbox" />
                            <span className="checkmark"></span>
                        </label>
                    )}
                </div>
            </form>
        </>
    );
};
