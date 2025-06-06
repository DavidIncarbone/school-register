import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { api } from "../../services/api";
import type { Course, Student } from "../../config/types";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";

export default function SearchStudentsPage() {
    // console.log("render homepage");
    // vars, let const ... ...
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [students, setStudents] = useState<Student[] | null>(null);

    // actions
    // // ? l'utente studente ricevera solo la propria scheda da questa chiamata
    // const testStudentIndex = async () => {
    //     try {
    //         const res = await api.get("/api/students");
    //         console.log(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

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

    // effects
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/api/courses");
                setCourses(res.data.data as Course[]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        // ! da cancellare pero gestire l'if sotto
        let paramsFromUrl = searchParams.toString();
        paramsFromUrl = paramsFromUrl && "?" + paramsFromUrl;

        let params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (value) {
                params = { ...params, [key]: value };
            } else {
                delete params[key];
            }
        });

        console.log(params);

        const fetchStudents = async () => {
            try {
                const res = await api.get(`/api/students`, { params });
                console.log(res.data);
                setStudents(res.data.data as Student[]);
            } catch (err) {
                console.error(err);
            }
        };
        if (paramsFromUrl) {
            fetchStudents();
        }
    }, [searchParams]);

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
                    <select onChange={handleCourseSelected} name="course_id">
                        <option value="" selected disabled hidden>
                            Seleziona corso
                        </option>
                        {courses &&
                            courses.map((course) => (
                                <option key={course.id} value={course.id}>
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
