import Loader from "@/components/ui/Loader";
import { UserType, type Assignment } from "@/config/types";
import { useGlobalStore } from "@/store/useGlobalStore";
import { Paperclip, Pencil, Save, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

export const AssignmentRecord = ({
  assignment,
  // destroyAssignment,
  // isDestroyPending,
  setIsOpen,
  setAssignmentId,
}: {
  assignment: Assignment;
  // destroyAssignment: (assignmentId: number) => void;
  // isDestroyPending: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAssignmentId: Dispatch<SetStateAction<number>>;
}) => {
  const { authUser } = useGlobalStore();
  // * vars
  const [isModifying, setIsModifying] = useState(false);

  // * actions
  const onModifyClick = () => {
    setIsModifying(true);
  };

  const onSaveClick = () => {
    setIsModifying(false);
  };

  // * views
  return (
    <>
      <div
        className={`${
          isModifying && "italic"
        } flex odd:bg-zinc-800 even:bg-zinc-950 3xl:h-40`}
      >
        <input
          type="date"
          disabled={!isModifying}
          defaultValue={assignment.assignment_date}
          className=" border px-4 w-40 flex justify-center items-center"
        />
        <input
          type="date"
          disabled={!isModifying}
          defaultValue={assignment.deadline}
          className=" border px-4 w-40 flex justify-center items-center"
        />
        <textarea
          disabled={!isModifying}
          rows={isModifying ? 10 : 3}
          defaultValue={assignment.body}
          className="grow border min-w-92 p-3 tracking-wider leading-7 flex justify-center items-center"
        />

        <div className="border w-32 flex justify-center items-center gap-2 [&>*]:cursor-pointer [&>*]:scale-90 [&>*]:hover:scale-100 [&>*]:transition-transform">
          {authUser?.type === UserType.TEACHER && isModifying ? (
            <Save onClick={onSaveClick} className="text-blue-400" />
          ) : (
            <>
              <Pencil onClick={onModifyClick} className="text-yellow-500" />
              <Trash2
                className="text-red-600"
                onClick={() => {
                  setAssignmentId(assignment.id as number);
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
      </div>
    </>
  );
};
