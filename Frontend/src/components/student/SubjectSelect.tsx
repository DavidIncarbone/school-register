import type { IndexAssignmentsParams, Subject } from "@/config/types";
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
  removeSearchParam: (key: string) => void;
}) => {
  const handleSubjectSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
    const key = "subject_id";
    const selectedSubjectId = e.target.value;
    if (selectedSubjectId) {
      updateSearchParams([{ key, value: selectedSubjectId }]);
    } else {
      removeSearchParam(key);
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
        <option selected value="" className="text-base not-italic">
          Show all
        </option>
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
