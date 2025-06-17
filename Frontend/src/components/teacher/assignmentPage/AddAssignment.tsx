import {
  useEffect,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";

import { useMutationStoreAssignment } from "@/hooks/assignmentsQueries";
import type {
    Assignment,
    Course,
    IndexAssignmentsParams,
} from "@/config/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";

const schema = z.object({
  body: z
    .string()
    .min(1, "Body field is required")
    .max(255, "the maximum number of characters is 255"),
  assignment_date: z.string().nonempty("Start's filed is required"),
  deadline: z.string().nonempty("Deadline's filed is required"),
  course_id: z.string().min(1),
});
// TYPES

// Tipizzazione custom di zod
type AssignmentFormData = z.infer<typeof schema>;

type AddAssignmentProps = {
    courses: Course[] | undefined;
    queryParams: IndexAssignmentsParams;
    isLoading: Boolean;
    // tipizzazione speciale per useState
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AddAssignment = ({
    courses,
    queryParams,
    isLoading,
    setIsLoading,
}: AddAssignmentProps) => {
    console.log(courses);

    // vars
    const startDate = new Date().toISOString().split("T")[0];
    const deadlineDate = new Date("2025/06/31").toISOString().split("T")[0];
    const currentCourse = courses?.find(
        (course) => course.id == queryParams.course_id
    );

  //   queries
  const { mutate, isSuccess, isPending } =
    useMutationStoreAssignment(queryParams);

  useEffect(() => {
    if (isSuccess) {
      toast.success("ok");
    }
  }, [isSuccess]);

  // Validation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createNewAssignment = async (formData: AssignmentFormData) => {
    console.log(formData);
    console.log(typeof queryParams?.course_id);
    mutate(formData);
    // toast.success("Assignment added succesfully");
  };
  return (
    <section className="mt-5">
      <h2 className="text-white text-2xl">
        Add Assignment for{" "}
        <span className="underline capitalize">{currentCourse?.name}</span>
      </h2>
      <form
        action=""
        id="AssignmentForm"
        className="w-full"
        onSubmit={handleSubmit(createNewAssignment)}
      >
        <p className="text-gray-400 text-sm mb-3">
          The fields marked with * are required
        </p>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="start">Start*</label>
              <input
                type="date"
                // name="assignment_date"
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
          <div className="flex flex-col gap-2  p-3">
            <div className="flex flex-col gap-0.5 ">
              <label htmlFor="deadline">Deadline*</label>
              <input
                type="date"
                // name="deadline"
                {...register("deadline")}
                id="deadline"
                max={deadlineDate}
                className="border border-white p-3 "
              />
            </div>
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="body">Body*</label>
          <p className="text-xs text-white/80 pb-1">
            Max. 10 rows | Max. 255 charachters
          </p>
          <textarea
            // name="body"
            id="body"
            {...register("body")} // name assegnato tramite useForm
            className="w-full border border-white p-3"
            rows={10}
            maxLength={255}
          ></textarea>
          <div className="h-[20px]">
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body?.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center mt-2">
          <button
            type="submit"
            className={`btn-pretty ${isPending && "!cursor-not-allowed"}`}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader isContained={true} />
                <span className="text-transparent">Add Assignment</span>
              </>
            ) : (
              "Add Assignment"
            )}
          </button>
          <button type="reset" className="btn-pretty">
            Reset
          </button>
        </div>
        {/* HIDDEN INPUT */}
        <input
          type="hidden"
          {...register("course_id")}
          value={queryParams.course_id}
        />
      </form>
    </section>
  );
};
