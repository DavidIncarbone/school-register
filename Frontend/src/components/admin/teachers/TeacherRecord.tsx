import Loader from "@/components/ui/Loader";
import {
  UserType,
  type Teacher,
  type IndexTeachersParams,
} from "@/config/types";
import { useMutationUpdateTeacher } from "@/hooks/admin/teachersQueries";
import {
  teachersSchema,
  type TeacherFormData,
} from "@/schemas/admin/teachersSchema";
import { useGlobalStore } from "@/store/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const TeacherRecord = ({
  teacher,
  setIsOpen,
  setTeacherId,
  setTeacherEmail,
  queryParams,
}: {
  teacher: Teacher;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTeacherId: Dispatch<SetStateAction<number>>;
  setTeacherEmail: Dispatch<SetStateAction<string>>;
  queryParams: IndexTeachersParams;
}) => {
  // * vars
  const { authUser } = useGlobalStore();
  const [isModifying, setIsModifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teachersSchema),
  });

  // queries

  const {
    mutate: updateMutate,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
    data: updateData,
  } = useMutationUpdateTeacher(queryParams, teacher.id as number); // * actions
  const onModifyClick = () => {
    setIsModifying(true);
  };

  const updateTeacher = async (formData: TeacherFormData) => {
    formData = { ...formData, id: 0 };
    updateMutate(formData as Teacher);
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
      toast.success("Teacher updated succesfully");
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
        onSubmit={handleSubmit(updateTeacher)}
      >
        <input
          type="input"
          disabled={!isModifying}
          {...register("first_name")}
          defaultValue={teacher.first_name}
          className=" border px-4 w-40 flex justify-center"
        />
        <input
          type="input"
          disabled={!isModifying}
          {...register("last_name")}
          defaultValue={teacher.last_name}
          className=" border px-4 w-40 flex justify-center items-center"
        />
        <input
          type="email"
          disabled={!isModifying}
          {...register("email")}
          defaultValue={teacher.email}
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
              <Pencil onClick={onModifyClick} className="text-yellow-500" />
              <Trash2
                className="text-red-600"
                onClick={() => {
                  setTeacherId(teacher.id as number);
                  setTeacherEmail(teacher.email as string);
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
