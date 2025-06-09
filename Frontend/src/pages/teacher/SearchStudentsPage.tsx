import { useEffect, useRef, type ChangeEvent } from "react";
import type { Course, Student } from "../../config/types";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";
import { type UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexStudent } from "../../hooks/studentsQueries";
import { useQueryIndexCourse } from "../../hooks/coursesQueries";

export default function SearchStudentsPage() {
    // vars, let const ... ...
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    const {
        data: students,
        isLoading: isStudentsLoading,
        isError: isStudentsError,
    } = useQueryIndexStudent(params) as UseQueryResult<Student[], Error>;

    const {
        data: courses,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
    } = useQueryIndexCourse() as UseQueryResult<Course[], Error>;

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
                        <option value="" selected disabled hidden>
                            Seleziona corso
                        </option>
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
