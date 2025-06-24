import { useEffect, type Dispatch, type SetStateAction } from "react";
import type {
  Course,
  IndexTeachersParams,
  Subject,
  Teacher,
} from "@/config/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import {
  teachersSchema,
  type TeacherFormData,
} from "@/schemas/admin/teachersSchema";
import { useMutationStoreTeacher } from "@/hooks/admin/teachersQueries";

// TYPES

// TIPIZZAZIONE DELLE PROPS
type AddTeacherProps = {
  courses: Course[] | undefined;
  subjects: Subject[] | undefined;
  queryParams: IndexTeachersParams;
  isLoading: boolean;
  setIsFormShowing: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  teacherId: number;
  teacherToUpdate?: Teacher;

  setTeacherToUpdate: Dispatch<SetStateAction<Teacher | undefined>>;
  isModifying: boolean;
  setIsModifying: Dispatch<SetStateAction<boolean>>;
};

export const AddTeacher = ({
  courses,
  subjects,
  queryParams,
  setIsFormShowing,
  isModifying,
  setIsModifying,
  teacherId,
  teacherToUpdate,
}: AddTeacherProps) => {
  // vars

  const teacherCourses = teacherToUpdate?.courses?.map((course) =>
    String(course.id)
  );

  console.log("ciao");
  console.log(teacherCourses);

  const defaultValues = isModifying
    ? {
        id: 0,
        first_name: teacherToUpdate?.first_name as string,
        last_name: teacherToUpdate?.last_name as string,
        email: teacherToUpdate?.email as string,
        courses_ids: teacherCourses as string[],
        subject_id: String(teacherToUpdate?.subject_id),
      }
    : {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        courses_ids: [],
        subject_id: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(teachersSchema),
    defaultValues,
  });

  console.log(teacherCourses);
  console.log(teacherToUpdate, "update");

  //   queries
  const {
    mutate: storeMutate,
    isSuccess: isStoreSuccess,
    isPending: isStorePending,
  } = useMutationStoreTeacher(queryParams);

  // actions

  const createNewTeacher = async (formData: TeacherFormData) => {
    console.log(formData);
    console.log(typeof queryParams?.course_id);
    storeMutate(formData);
  };

  // collaterals effects

  useEffect(() => {
    console.log("ciao");
  }, [teacherToUpdate]);

  useEffect(() => {
    if (isStoreSuccess) {
      toast.success("Teacher added successfully");
      // reset(defaultValues);
      setIsFormShowing(false);
    }
  }, [isStoreSuccess, reset]);

  // views

  console.log(errors);

  return (
    <section className="mt-5">
      <form
        action=""
        id="TeacherForm"
        className="w-full p-3"
        onSubmit={handleSubmit(createNewTeacher)}
      >
        <div className="">
          <h2 className="text-white text-2xl">Add Teacher for</h2>
          <p className="text-gray-400 text-sm mb-3">
            The fields marked with * are required
          </p>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-7 mb-3 max-[640px]:grid-cols-1">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <label htmlFor="first_name">First Name*</label>
                <p className="text-xs text-white/80 pb-1">
                  Min. 1 Max. 255 characters
                </p>
                <input
                  type="input"
                  {...register("first_name")}
                  id="first_name"
                  className="border border-white "
                  // value={isModifying ? teacherToUpdate?.first_name : ""}
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <label htmlFor="last_name">Last Name*</label>
                <p className="text-xs text-white/80 pb-1">
                  Min. 1 Max. 255 characters
                </p>
                <input
                  type="input"
                  {...register("last_name")}
                  id="last_name"
                  className="border border-white "
                  // value={isModifying ? teacherToUpdate?.last_name : ""}
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5 ">
                <label htmlFor="email">Email*</label>
                <p className="text-xs text-white/80 pb-1">
                  Only email format is accepted
                </p>
                <input
                  id="email"
                  {...register("email")} // name assegnato tramite useForm
                  className="w-full border border-white "
                  // value={isModifying ? teacherToUpdate?.email : ""}
                ></input>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-2 my-3">
              <p>Select Subject*</p>
              <select {...register("subject_id")} id="subject_id">
                {/* <option value="">Select Subject</option> */}
                {subjects?.map((subject, i) => (
                  <option key={i} value={subject?.id}>
                    {subject?.name}
                  </option>
                ))}
              </select>
              {errors.subject_id && (
                <p className="text-red-500 text-sm">
                  {errors.subject_id?.message}
                </p>
              )}
            </div>
          </div>
          <p>Select courses*:</p>
          <div className="grid grid-cols-6 max-[640px]:grid-cols-2 my-3">
            {courses?.map((course, i) => {
              return (
                <div key={i} className="flex gap-2">
                  <label className="custom-checkbox capitalize">
                    <input
                      type="checkbox"
                      {...register("courses_ids")}
                      value={course.id}
                      defaultChecked={
                        isModifying
                          ? teacherCourses?.includes(String(course.id))
                          : false
                      }
                    />
                    <span className="checkmark"></span>
                    {course.name}
                  </label>
                </div>
              );
            })}
            {errors.courses_ids && (
              <p className="text-red-500 text-sm">
                {errors.courses_ids?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center mt-2">
          <button
            type="submit"
            className={`btn-pretty ${isStorePending && "!cursor-not-allowed"}`}
            disabled={isStorePending}
          >
            {isStorePending ? (
              <>
                <div className="absolute inset-0">
                  <Loader isContained={true} />
                </div>
                <span className="text-transparent">Add Teacher</span>
              </>
            ) : (
              "Add Teacher"
            )}
          </button>
          <button
            className={`${
              isStorePending && "!cursor-not-allowed opacity-50"
            } btn-pretty`}
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};
