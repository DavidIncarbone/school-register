import { useEffect, useRef, type ChangeEvent } from "react";
import { api } from "../../services/api";
import type { Course, Student } from "../../config/types";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export default function SearchStudentsPage() {
    // vars, let const ... ...
    // const [courses, setCourses] = useState<Course[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    // const [students, setStudents] = useState<Student[] | null>(null);

    const params = Object.fromEntries(searchParams.entries());

    console.log(params);

    const {
        data: students,
        // isLoading: isStudentsLoading,
        isError: isStudentsError,
    } = useQuery({
        queryKey: ["students", params], // sta a indicare la chiave che si riferisce alla chiamata api
        queryFn: async () => {
            // se params contiene course_id allora fai fetch senno throw error
            if (!("course_id" in params)) {
                throw new Error("no course_id");
            }
            const res = await api.get(`/api/students`, { params });
            return res.data.data;
        },
        staleTime: 60 * 60 * 1000, // ms
        refetchInterval: 60 * 60 * 1000,
    }) as UseQueryResult<Student[], Error>;

    const {
        data: courses,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
    } = useQuery({
        queryKey: ["courses"], // sta a indicare la chiave che si riferisce alla chiamata api
        queryFn: async () => {
            const res = await api.get(`/api/courses`);
            return res.data.data;
        },
        staleTime: Infinity,
    }) as UseQueryResult<Course[], Error>;

    useEffect(() => {
        if (courses && !("course_id" in params)) {
            setSearchParams({ course_id: String(courses[0].id) });
        }
    }, [courses, params]);

    // * actions

    const updateSearchParam = (
        key: string,
        value: string,
        currentParams: URLSearchParams
    ) => {
        const newParams = new URLSearchParams(currentParams); // clona quelli esistenti
        newParams.set(key, value);
        // if (!value) newParams.delete(key);
        setSearchParams(newParams);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        currentParams: URLSearchParams
    ) => {
        const key = "name";
        const student_name = e.target.value;
        updateSearchParam(key, student_name, currentParams);
    };

    const debouncedFn = useRef(
        debounce(
            (
                e: ChangeEvent<HTMLInputElement>,
                currentParams: URLSearchParams
            ) => {
                handleInputChange(e, currentParams);
            },
            500
        )
    ).current;

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedFn(e, searchParams);
    };

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const key = "course_id";
        const selectedCourseId = e.target.value;
        updateSearchParam(key, selectedCourseId, searchParams);
    };

    if (isCoursesLoading) return <pre>courses loading</pre>;
    if (isCoursesError) return <pre>courses error</pre>;
    // if (isStudentsLoading) return <pre>students loading</pre>;
    if (isStudentsError) return <pre>students error</pre>;

    // view
    return (
        <div className="h-full p-5">
            {/* <button onClick={testStudentIndex} className="btn">
                test student index
            </button> */}
            {/* ricerca e filtro */}
            <div className="flex justify-center gap-8 bg-amber-600">
                <div>
                    <input
                        onChange={onInput}
                        type="text"
                        name="name"
                        placeholder="Cerca per nome"
                    />
                </div>
                <div>
                    <select
                        onChange={handleCourseSelected}
                        name="course_id"
                        className="w-48"
                    >
                        {/* <option value="" selected disabled hidden>
                            Seleziona corso
                        </option> */}
                        {courses &&
                            courses.map((course) => (
                                <option
                                    selected={
                                        Number(
                                            searchParams.get("course_id")
                                        ) === course.id
                                    }
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {/* tabella studenti */}
            <div className="space-y-2">
                {students &&
                    students.map((student) => (
                        <div key={student.id} className="p-2 border">
                            {student.first_name} {student.last_name}
                        </div>
                    ))}
            </div>
        </div>
    );
}
