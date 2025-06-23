import { AddTeacher } from "@/components/admin/teachers/AddTeacher";
import { TeacherHead } from "./TeacherHead";

import { TeacherRecord } from "@/components/admin/teachers/TeacherRecord";
import { CourseSelect } from "@/components/teacher/CourseSelect";
import DeleteModalExample from "@/components/ui/modal";
import {
  SortOptionAdminTeacher,
  UserType,
  type Teacher,
  type Course,
  type Subject,
} from "@/config/types";
import {
  useMutationDestroyTeacher,
  useQueryAdminIndexTeacher,
} from "@/hooks/admin/teachersQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import toast from "react-hot-toast";
import DeleteModalTeacher from "@/components/ui/admin/DeleteModalTeacher";
import { useQueryAdminIndexCourse } from "@/hooks/admin/coursesQueries";
import { useQueryAdminIndexSubject } from "@/hooks/admin/subjectsQueries";
import type { Subjects } from "react-hook-form";

export const TeacherIndex = () => {
  // * global store
  const { authUser } = useGlobalStore();
  // * custom hooks
  const { queryParams, updateSearchParams } = useDynamicSearchParams();

  // vars
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teacherId, setTeacherId] = useState(0);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortingCols, setSortingCols] = useState(initialSortingCols);
  const [isModifying, setIsModifying] = useState(false);
  const [teacherToUpdate, setTeacherToUpdate] = useState<Teacher | undefined>();
  const activeSort = queryParams.sort;
  const activeDir = queryParams.dir;

  // * queries
  const { data: courses } = useQueryAdminIndexCourse() as UseQueryResult<
    Course[],
    Error
  >;
  const { data: subjects } = useQueryAdminIndexSubject() as UseQueryResult<
    Subject[],
    Error
  >;

  const {
    data: teachers,
    isLoading: isAssigmentsLoading,
    isError: isAssigmentsError,
  } = useQueryAdminIndexTeacher(
    queryParams,
    "course_id" in queryParams
  ) as UseQueryResult<{
    data: Teacher[];
    total: number;
  }>;

  const {
    mutate: destroyMutate,
    isSuccess: isDestroySuccess,
    isPending: isDestroyPending,
  } = useMutationDestroyTeacher(queryParams);

  // * actions

  const handleForm = () => {
    setIsFormShowing(!isFormShowing);
    isModifying && setIsModifying(false);
  };

  const destroyTeacher = async (teacherId: number) => {
    console.log("destroy");
    destroyMutate(teacherId);
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

  const teacher = teachers?.data?.find((teacher) => teacher?.id == teacherId);
  console.log(teacher);

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
      toast.success("Teacher deleted succesfully");
      setIsOpen(false);
    }
  }, [isDestroySuccess]);

  console.log(teachers);

  // * views
  if (isAssigmentsError) return <pre>teacher error - da gestire</pre>;
  return (
    <>
      <div className="px-5 py-2">
        <div className="flex flex-col items-start mb-2">
          <h1 className="title_h1 self-center">teachers</h1>
          <div className="text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-2 font-bold w-full ">
            <div className="flex justify-between items-center w-full ">
              <div>
                {authUser?.type === UserType.ADMIN && (
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

              {authUser?.type === UserType.ADMIN &&
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
            <AddTeacher
              courses={courses}
              subjects={subjects}
              queryParams={queryParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsFormShowing={setIsFormShowing}
              isModifying={isModifying}
              setIsModifying={setIsModifying}
              teacherId={teacherId}
              teacherToUpdate={teacherToUpdate}
              setTeacherToUpdate={setTeacherToUpdate}
            />
          </section>
        )}
        {/* teachers list (per corso) */}
        <div className="max-lg:w-[92dvw] mx-auto overflow-auto">
          <div className="min-w-fit">
            <TeacherHead
              sortingCols={sortingCols}
              activeDir={activeDir}
              activeSort={activeSort}
              onClick={handleSortingColClick}
            />
            <div className="border rounded-b-sm overflow-hidden bg-zinc-900">
              {isAssigmentsLoading ? (
                <div className="h-[425px] animate-pulse bg-zinc-800"></div>
              ) : (
                teachers?.data.map((teacher) => (
                  <TeacherRecord
                    key={teacher.id}
                    teacher={teacher}
                    setIsOpen={setIsOpen}
                    setTeacherId={setTeacherId}
                    setTeacherEmail={setTeacherEmail}
                    isFormShowing={isFormShowing}
                    setIsFormShowing={setIsFormShowing}
                    isModifying={isModifying}
                    setIsModifying={setIsModifying}
                    queryParams={queryParams}
                    width="w-80"
                    teacherToUpdate={teacherToUpdate}
                    setTeacherToUpdate={setTeacherToUpdate}
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
      <DeleteModalTeacher
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        destroyTeacher={destroyTeacher}
        teacherId={teacherId}
        teacherEmail={teacherEmail}
        isDestroyPending={isDestroyPending}
      />
    </>
  );
};

const initialSortingCols = [
  {
    label: "First Name",
    sort: SortOptionAdminTeacher.BY_FIRST_NAME,
    dir: "asc",
    className:
      "border w-80 flex justify-center items-center py-3 cursor-pointer",
  },
  {
    label: "Last Name",
    sort: SortOptionAdminTeacher.BY_LAST_NAME,
    dir: "asc",
    className: "border w-80 flex justify-center items-center cursor-pointer",
  },
  {
    label: "Email",
    sort: SortOptionAdminTeacher.BY_LAST_NAME,
    dir: "asc",
    className: "grow border flex justify-center items-center cursor-pointer",
  },
  {
    label: "Actions",
    sort: SortOptionAdminTeacher.BY_LAST_NAME,
    dir: "asc",
    className: " border w-32 flex justify-center items-center cursor-pointer",
  },
];
