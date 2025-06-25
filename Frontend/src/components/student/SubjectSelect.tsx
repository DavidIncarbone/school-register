import {
  UserType,
  type IndexAssignmentsParams,
  type Subject,
} from "@/config/types";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { ChangeEvent } from "react";

export const SubjectSelect = ({
  subjects,
  queryParams,
  cb,
  updateSearchParams,
  removeSearchParam,
}: {
  subjects: Subject[] | undefined;
  queryParams: IndexAssignmentsParams;
  cb?: () => void;
  updateSearchParams: (params: { key: string; value: string }[]) => void;
  removeSearchParam?: (key: string) => void;
}) => {
  const { authUser } = useGlobalStore();
  const handleSubjectSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
    const key = "subject_id";
    const selectedSubjectId = e.target.value;
    if (selectedSubjectId) {
      updateSearchParams([{ key, value: selectedSubjectId }]);
    } else {
      removeSearchParam && removeSearchParam(key);
    }
    if (cb) cb();
  };

  return (
    <>
      <select
        onChange={handleSubjectSelected}
        name="subject_id"
        className="no-default w-fit capitalize italic cursor-pointer"
      >
        {authUser?.type === UserType.ADMIN ? (
          <option selected value="" className="text-base not-italic">
            Show all
          </option>
        ) : (
          <option selected hidden disabled className="text-base not-italic">
            Selected Subject
          </option>
        )}
        {subjects &&
          subjects.map((subject, i) => (
            <option
              selected={Number(queryParams?.subject_id) === subject.id}
              key={i}
              value={subject.id}
              className="text-base not-italic"
            >
              {subject.name}
            </option>
          ))}
      </select>
    </>
  );
};
