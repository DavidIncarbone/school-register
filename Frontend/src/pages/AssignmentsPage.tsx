import { AddAssignment } from "@/components/teacher/assignmentPage/AddAssignment";
import { AssignmentHead } from "@/components/teacher/assignmentPage/AssignmentHead";
import { AssignmentRecord } from "@/components/teacher/assignmentPage/AssignmentRecord";
import { CourseSelect } from "@/components/teacher/CourseSelect";
import DeleteModalExample from "@/components/ui/modal";
import {
  SortOptionAssignment,
  UserType,
  type Assignment,
  type Course,
} from "@/config/types";
import {
  useMutationDestroyAssignment,
  useQueryIndexAssignment,
} from "@/hooks/assignmentsQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import toast from "react-hot-toast";

export const AssignmentsPage = () => {
  // * global store
  const { authUser } = useGlobalStore();
  // * custom hooks
  const { queryParams, updateSearchParams } = useDynamicSearchParams();

  // vars
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentId, setAssignmentId] = useState(0);
  const [assignmentBody, setAssignmentBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortingCols, setSortingCols] = useState(initialSortingCols);
  const activeSort =
    queryParams.sort ?? SortOptionAssignment.BY_ASSIGNMENT_DATE;
  const activeDir = queryParams.dir ?? "desc";

  // * queries
  const { data: courses } = useQueryIndexCourse({}) as UseQueryResult<
    Course[],
    Error
  >;

  const {
    data: assignments,
    isLoading: isAssigmentsLoading,
    isError: isAssigmentsError,
  } = useQueryIndexAssignment(
    queryParams,
    "course_id" in queryParams
  ) as UseQueryResult<{ data: Assignment[]; total: number }>;

  const {
    mutate: destroyMutate,
    isSuccess: isDestroySuccess,
    isPending: isDestroyPending,
  } = useMutationDestroyAssignment(queryParams);

  // * actions

  const handleForm = () => setIsFormShowing(!isFormShowing);

  const destroyAssignment = async (assignmentId: number) => {
    console.log("destroy");
    destroyMutate(assignmentId);
  };

  const handleSortingColClick = (e: MouseEvent<HTMLDivElement>): void => {
    const key = "sort";
    const col = sortingCols.find((col) => col.sort === e.currentTarget.id);
    if (!col) return;
    updateSearchParams([
      { key, value: col.sort },
      { key: "dir", value: col.dir === "desc" ? "asc" : "desc" },
    ]);
    setSortingCols((curr) =>
      curr.map((c) =>
        c.sort === col.sort
          ? { ...c, dir: c.dir === "desc" ? "asc" : "desc" }
          : c
      )
    );
  };

  // * side effects
  useEffect(() => {
    if (courses && !("course_id" in queryParams)) {
      updateSearchParams([{ key: "course_id", value: String(courses[0].id) }]);
    }
  }, [courses, queryParams, updateSearchParams]);

  useEffect(() => {
    if (isFormShowing) {
      const form = document.getElementById("formSection");
      form?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isFormShowing]);
  useEffect(() => {
    if (isDestroySuccess) {
      toast.success("Assignment deleted succesfully");
      setIsOpen(false);
    }
  }, [isDestroySuccess]);

  // * views
  if (isAssigmentsError) return <pre>assignment error - da gestire</pre>;
  return (
    <>
      <div className="px-5 py-2">
        <div className="flex flex-col items-start mb-2">
          <h1 className="title_h1 self-center">assignments</h1>
          <div className="text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-2 font-bold w-full ">
            <div className="flex justify-between items-center w-full ">
              <div>
                {authUser?.type === UserType.TEACHER && (
                  <>
                    <p>Selected course:</p>
                    <CourseSelect
                      courses={courses}
                      queryParams={queryParams}
                      updateSearchParams={updateSearchParams}
                    />
                  </>
                )}
              </div>

              {authUser?.type === UserType.TEACHER &&
                (!isFormShowing ? (
                  <button className="btn-pretty" onClick={handleForm}>
                    +
                  </button>
                ) : (
                  <button className="btn-pretty" onClick={handleForm}>
                    -
                  </button>
                ))}
            </div>
          </div>
        </div>
        {isFormShowing && (
          <section id="formSection" className="mb-5">
            <AddAssignment
              courses={courses}
              queryParams={queryParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsFormShowing={setIsFormShowing}
            />
          </section>
        )}
        {/* assignments list (per corso) */}
        <div className="max-lg:w-[92dvw] mx-auto overflow-auto">
          <div className="min-w-fit">
            <AssignmentHead
              sortingCols={sortingCols}
              activeDir={activeDir}
              activeSort={activeSort}
              onClick={handleSortingColClick}
            />
            <div className="border rounded-b-sm overflow-hidden bg-zinc-900">
              {isAssigmentsLoading ? (
                <div className="h-[425px] animate-pulse bg-zinc-800"></div>
              ) : (
                assignments?.data.map((as) => (
                  <AssignmentRecord
                    key={as.id}
                    assignment={as}
                    // destroyAssignment={destroyAssignment}
                    // isDestroyPending={isDestroyPending}
                    setIsOpen={setIsOpen}
                    setAssignmentId={setAssignmentId}
                    setAssignmentBody={setAssignmentBody}
                    queryParams={queryParams}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <p className="mt-2 landscape:hidden">
          Rotate the device for better visualization
        </p>
      </div>
      <DeleteModalExample
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        destroyAssignment={destroyAssignment}
        assignmentId={assignmentId}
        assignmentBody={assignmentBody}
        isDestroyPending={isDestroyPending}
      />
    </>
  );
};

const initialSortingCols = [
  {
    label: "Start",
    sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
    dir: "asc",
    className: "border w-40 flex justify-center items-center py-3",
  },
  {
    label: "Deadline",
    sort: SortOptionAssignment.BY_DEADLINE,
    dir: "asc",
    className: "border w-40 flex justify-center items-center",
  },
  {
    label: "Body",
    sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
    dir: "asc",
    className: "grow border flex justify-center items-center",
  },
  {
    label: "Actions",
    sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
    dir: "asc",
    className: "border w-32 flex justify-center items-center gap-2",
  },
];
