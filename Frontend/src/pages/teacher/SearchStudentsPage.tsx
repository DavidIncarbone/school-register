import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type MouseEvent,
} from "react";
import {
    SortOption,
    type Course,
    type IndexStudentParams,
    type Student,
} from "../../config/types";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";
import { type UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexCourse } from "../../hooks/coursesQueries";
import { Search } from "lucide-react";
import { StudentsList } from "../../components/teacher/StudentsList";
import { GoTriangleDown } from "react-icons/go";
import Loader from "../../components/ui/Loader";
import { useQueryIndexStudent } from "@/hooks/studentsQueries";

export default function SearchStudentsPage() {
    // vars
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(
        searchParams.entries()
    ) as IndexStudentParams;
    const [sortingCols, setSortingCols] = useState(initialSortingCols);
    const activeSort = params.sort ?? SortOption.BY_ID;
    const activeDir = params.dir ?? "asc";

    // queries
    const {
        data: courses,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
    } = useQueryIndexCourse() as UseQueryResult<Course[], Error>;

    // queries
    const {
        data: students,
        isLoading: isStudentsLoading,
        isError: isStudentsError,
    } = useQueryIndexStudent(params, "course_id" in params) as UseQueryResult<
        { total_students: number; data: Student[] },
        Error
    >;

    // side effects
    useEffect(() => {
        if (courses && !("course_id" in params)) {
            setSearchParams({ course_id: String(courses[0].id) });
        }
    }, [courses, params, setSearchParams]);

    // actions
    const updateSearchParam = (
        params: { key: string; value: string }[],
        currentParams: URLSearchParams
    ) => {
        const newParams = new URLSearchParams(currentParams); // clona quelli esistenti
        params.forEach((param) => newParams.set(param.key, param.value));
        setSearchParams(newParams);
    };

    const debouncedHandleInputChange = useRef(
        debounce(
            (
                e: ChangeEvent<HTMLInputElement>,
                currentParams: URLSearchParams
            ) => {
                const key = "name";
                const student_name = e.target.value;
                updateSearchParam(
                    [{ key, value: student_name }],
                    currentParams
                );
            },
            500
        )
    ).current;

    const handleCourseSelected = async (
        e: ChangeEvent<HTMLSelectElement>,
        currentParams: URLSearchParams
    ) => {
        const key = "course_id";
        const selectedCourseId = e.target.value;
        updateSearchParam([{ key, value: selectedCourseId }], currentParams);
    };

    const handleSortingColClick = (
        e: MouseEvent<HTMLDivElement>,
        currentParams: URLSearchParams
    ): void => {
        const key = "sort";
        const col = sortingCols.find((col) => col.sort === e.currentTarget.id);
        if (!col) return;
        updateSearchParam(
            [
                { key, value: col.sort },
                { key: "dir", value: col.dir === "desc" ? "asc" : "desc" },
            ],
            currentParams
        );
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
        <div className="h-full p-5 text-sm flex flex-col">
            {/* ricerca e filtro */}
            <div className="text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-2 mb-2 font-bold">
                <p>Corso selezionato:</p>
                <select
                    onChange={(e) => handleCourseSelected(e, searchParams)}
                    name="course_id"
                    className="no-default w-fit capitalize italic cursor-pointer"
                >
                    <option selected disabled hidden>
                        Seleziona corso
                    </option>
                    {courses &&
                        courses.map((course) => (
                            <option
                                selected={
                                    Number(searchParams.get("course_id")) ===
                                    course.id
                                }
                                key={course.id}
                                value={course.id}
                                className="text-base not-italic"
                            >
                                {course.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="flex flex-wrap gap-4 items-end pb-4 mb-4 border-b">
                {/* //! fare controllo per id/matricola in backend */}
                <div className="relative w-full sm:max-w-96">
                    <input
                        onChange={(e) =>
                            debouncedHandleInputChange(e, searchParams)
                        }
                        type="text"
                        name="name"
                        placeholder="Search student / ID number"
                        className="w-full"
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
                    <div className="grid grid-cols-4 md:grid-cols-9 border-b-2">
                        {sortingCols.map((col, i, ar) => (
                            <div
                                key={i}
                                id={col.sort}
                                onClick={(e) =>
                                    handleSortingColClick(e, searchParams)
                                }
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
