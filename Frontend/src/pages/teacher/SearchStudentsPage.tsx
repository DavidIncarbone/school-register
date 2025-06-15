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
import { Search } from "lucide-react";
import { StudentsList } from "../../components/teacher/StudentsList";
import { GoTriangleDown } from "react-icons/go";
import Loader from "../../components/ui/Loader";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { CourseSelect } from "@/components/teacher/CourseSelect";

export default function SearchStudentsPage() {
    // vars
    const { queryParams, updateSearchParams } = useDynamicSearchParams();
    const [sortingCols, setSortingCols] = useState(initialSortingCols);
    const activeSort = queryParams.sort ?? SortOption.BY_ID;
    const activeDir = queryParams.dir ?? "asc";

    // queries
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
    ) as UseQueryResult<{ total_students: number; data: Student[] }, Error>;

    // side effects
    useEffect(() => {
        if (courses && !("course_id" in queryParams)) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        }
    }, [courses, queryParams, updateSearchParams]);

    // actions
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
        <div className="h-full p-5 text-sm flex flex-col gap-2">
            {/* ricerca e filtro */}
            <CourseSelect
                courses={courses}
                queryParams={queryParams}
                onChange={handleCourseSelected}
            />
            <div className="flex flex-wrap gap-4 items-end pb-4 mb-4 border-b">
                {/* //! fare controllo per id/matricola in backend */}
                <div className="relative w-full sm:max-w-96">
                    <input
                        onChange={debouncedHandleInputChange}
                        type="text"
                        name="name"
                        placeholder="Search student / ID number"
                        className="w-full"
                        defaultValue={queryParams?.name}
                    />
                    <Search className="absolute h-full top-0 right-2" />
                </div>
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
                    <div className="grid grid-cols-4 md:grid-cols-9 border-b-2 lg:pr-4">
                        {sortingCols.map((col, i, ar) => (
                            <div
                                key={i}
                                id={col.sort}
                                onClick={handleSortingColClick}
                                className={`${
                                    col.sort === SortOption.BY_EMAIL &&
                                    "max-md:hidden"
                                } cursor-pointer transition-colors bg-zinc-900 hover:bg-zinc-950 active:[&>*]:scale-90 [&>*]:transition-transform flex items-center gap-1 px-2 py-2 lg:py-4 first:col-span-1 not-first:md:col-span-2 last:justify-center first:rounded-tl-sm last:rounded-tr-sm`}
                            >
                                <span className="line-clamp-1">
                                    {col.label}
                                </span>
                                {i < ar.length - 1 && (
                                    <GoTriangleDown
                                        className={`${
                                            (col.dir === "desc" ||
                                                activeDir === "desc") &&
                                            "rotate-180"
                                        } ${
                                            activeSort === col.sort &&
                                            "!opacity-100"
                                        } opacity-0`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="overflow-auto grow ">
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

const initialSortingCols = [
    { label: "ID number", sort: SortOption.BY_ID, dir: "asc" },
    { label: "Last name", sort: SortOption.BY_LAST_NAME, dir: "asc" },
    { label: "First name", sort: SortOption.BY_FIRST_NAME, dir: "asc" },
    { label: "Email", sort: SortOption.BY_EMAIL, dir: "asc" },
    { label: "Actions", sort: SortOption.BY_ID, dir: "asc" },
];
