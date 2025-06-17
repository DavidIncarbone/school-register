import { AddAssignment } from "@/components/teacher/assignmentPage/AddAssignment";
import { AssignmentHead } from "@/components/teacher/assignmentPage/AssignmentHead";
import { AssignmentRecord } from "@/components/teacher/assignmentPage/AssignmentRecord";
import { CourseSelect } from "@/components/teacher/CourseSelect";
import type { Assignment, Course } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import type { UseQueryResult } from "@tanstack/react-query";
import { Paperclip, Pencil, Save, Trash2 } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";

// ! pagina solo per teacher => creare teacher route wrapper !
export const TeacherAssignmentsPage = () => {
  // * custom hooks
  const { queryParams, updateSearchParams } = useDynamicSearchParams();

  //   variables
  const [isLoading, setIsLoading] = useState(false);
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

  // * actions
  const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
    const key = "course_id";
    const selectedCourseId = e.target.value;
    updateSearchParams([{ key, value: selectedCourseId }]);
  };

  // * side effects
  useEffect(() => {
    if (courses && !("course_id" in queryParams)) {
      updateSearchParams([{ key: "course_id", value: String(courses[0].id) }]);
    }
  }, [courses, queryParams, updateSearchParams]);

  // * views
  if (isAssigmentsError) return <pre>assignment error - da gestire</pre>;
  return (
    <div className="px-5 py-2">
      <div className="flex flex-col items-start mb-2">
        <h1 className="title_h1 self-center">assignments</h1>
        <div className="text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-2 font-bold">
          <p>Selected course:</p>
          <CourseSelect
            courses={courses}
            queryParams={queryParams}
            onChange={handleCourseSelected}
          />
        </div>
      </div>
      <section id="formSection">
        <AddAssignment
          courses={courses}
          queryParams={queryParams}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
      {/* assignments list (per corso) */}
      <div className="max-lg:w-[92dvw] mx-auto overflow-auto">
        <div className="min-w-fit">
          <AssignmentHead />
          <div className="border rounded-b-sm overflow-hidden bg-zinc-900">
            {isAssigmentsLoading ? (
              <div className="h-[425px] animate-pulse bg-zinc-800"></div>
            ) : (
              assignments?.data.map((as) => (
                <AssignmentRecord key={as.id} assignment={as} />
              ))
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 landscape:hidden">
        Rotate the device for better visualization
      </p>
    </div>
  );
};
