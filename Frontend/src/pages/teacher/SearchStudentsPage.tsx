import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { SortOption, type Course, type Student } from "../../config/types";
import { debounce } from "lodash";
import { type UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexCourse } from "../../hooks/coursesQueries";
import { TriangleRight } from "lucide-react";
import { StudentsList } from "../../components/teacher/searchStudentsPage/StudentsList";
import Loader from "../../components/ui/Loader";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { CourseSelect } from "@/components/teacher/CourseSelect";
import { SearchStudentInput } from "@/components/teacher/searchStudentsPage/SearchStudentInput";

export default function SearchStudentsPage() {
  // * custom hooks
  const { queryParams, updateSearchParams } = useDynamicSearchParams();
  // * vars
  const [sortingCols, setSortingCols] = useState(initialSortingCols);
  const activeSort = queryParams.sort ?? SortOption.BY_ID;
  const activeDir = queryParams.dir ?? "asc";

  // * queries
  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQueryIndexCourse({}) as UseQueryResult<Course[], Error>;

  const {
    data: students,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
  } = useQueryIndexStudent(
    queryParams,
    "course_id" in queryParams
  ) as UseQueryResult<{ data: Student[]; total_students: number }, Error>;

  // * side effects
  useEffect(() => {
    if (courses && !("course_id" in queryParams)) {
      updateSearchParams([{ key: "course_id", value: String(courses[0].id) }]);
    }
  }, [courses, queryParams, updateSearchParams]);

  // * actions
  const debouncedHandleInputChange = useRef(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const key = "name";
      const student_name = e.target.value;
      updateSearchParams([{ key, value: student_name }]);
    }, 500)
  ).current;

  const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
    const key = "course_id";
    const selectedCourseId = e.target.value;
    updateSearchParams([{ key, value: selectedCourseId }]);
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

  // view
  if (isCoursesError) return <pre>courses error - da gestire</pre>;
  return (
    <div className="h-full px-5 py-2 text-sm flex flex-col">
      {/* ricerca e filtro */}
      <CourseSelect
        courses={courses}
        queryParams={queryParams}
        onChange={handleCourseSelected}
      />
      <div className="flex flex-wrap gap-4 items-end mb-2">
        <SearchStudentInput
          onChange={debouncedHandleInputChange}
          queryParams={queryParams}
        />
        <div className="space-x-1">
          <span>Total students:</span>
          {isStudentsLoading ? (
            <div className="inline-block w-5 dots-loader"></div>
          ) : (
            <span>{students?.total_students}</span>
          )}
        </div>
      </div>
      {isCoursesLoading ? (
        <Loader />
      ) : (
        <>
          {/* tabella studenti */}
          <StudentHead
            sortingCols={sortingCols}
            activeDir={activeDir}
            activeSort={activeSort}
            onClick={handleSortingColClick}
          />
          <div className="overflow-auto grow">
            <StudentsList
              students={students}
              isLoading={isStudentsLoading}
              isError={isStudentsError}
            />
          </div>
        </>
      )}
    </div>
  );
}

const StudentHead = ({
  sortingCols,
  activeDir,
  activeSort,
  onClick,
}: {
  sortingCols: SortingCols[];
  activeDir: string;
  activeSort: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-9 border-b-2 lg:pr-4">
      {sortingCols.map((col, i, ar) => (
        <div
          key={i}
          id={col.sort}
          onClick={onClick}
          className={`${
            col.sort === SortOption.BY_EMAIL && "max-md:hidden"
          } cursor-pointer transition-colors bg-zinc-900 hover:bg-zinc-950 active:[&>*]:scale-90 [&>*]:transition-transform flex items-center gap-1 px-2 py-2 lg:py-4 first:col-span-1 not-first:md:col-span-2 last:justify-center first:rounded-tl-sm last:rounded-tr-sm`}
        >
          <span className="line-clamp-1">{col.label}</span>
          {i < ar.length - 1 && (
            <TriangleRight
              className={`${
                (col.dir === "desc" || activeDir === "desc") && "rotate-180"
              } ${
                activeSort === col.sort && "!opacity-100"
              } opacity-0 scale-70`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

type SortingCols = {
  label: string;
  sort: string;
  dir: string;
};

const initialSortingCols = [
  { label: "ID number", sort: SortOption.BY_ID, dir: "asc" },
  { label: "Last name", sort: SortOption.BY_LAST_NAME, dir: "asc" },
  { label: "First name", sort: SortOption.BY_FIRST_NAME, dir: "asc" },
  { label: "Email", sort: SortOption.BY_EMAIL, dir: "asc" },
  { label: "Actions", sort: SortOption.BY_ID, dir: "asc" },
];
