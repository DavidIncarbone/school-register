import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { CourseSelect } from "../CourseSelect";
import Loader from "@/components/ui/Loader";
import { api, assignmentEndpoint } from "@/services/api";
import {
  useMutationStoreAssignment,
  useQueryIndexAssignment,
} from "@/hooks/assignmentsQueries";
import type {
  Assignment,
  Course,
  IndexAssignmentsParams,
} from "@/config/types";
import { numericUUID } from "@/utilities/utils";

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
  const startDate = new Date().toISOString().split("T")[0];
  const deadlineDate = new Date("2025/06/31").toISOString().split("T")[0];

  //   queries

  const { mutate } = useMutationStoreAssignment(queryParams);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData.entries()),
      id: 0, // solo per typescript
    } as Assignment;
    console.log(data);
    setIsLoading(true);
    console.log(assignmentEndpoint);
    mutate(data);
  };

  return (
    <section className="mt-5">
      <h3 className="text-white">Add Assignment</h3>
      <form
        action=""
        id="AssignmentForm"
        className="w-full"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="form-select flex flex-col">
            <label htmlFor="courses">Selected course</label>
            <CourseSelect courses={courses} queryParams={queryParams} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="start">Start</label>
            <input
              type="date"
              name="assignment_date"
              id="start"
              max={startDate}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              max={deadlineDate}
            />
          </div>
        </div>
        <div className="form-">
          <label htmlFor="body">Body</label>
          <p className="text-xs text-white/80 pb-1">
            Max. 10 rows | Max. 255 charachters
          </p>
          <textarea
            name="body"
            id="body"
            className="w-full border border-white"
            rows={10}
            maxLength={255}
          ></textarea>
        </div>
        <button type="submit" className="mt-2 btn-pretty">
          Add Assignment
        </button>
        <button type="reset" className="btn">
          Reset
        </button>
      </form>
    </section>
  );
};
