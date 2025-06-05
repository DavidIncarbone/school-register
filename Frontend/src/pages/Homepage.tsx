import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { api } from "../services/api";
import type { Course } from "../config/types";
import { useSearchParams } from "react-router";
import { debounce } from "lodash";

export default function Homepage() {
    // console.log("render homepage");
    // vars, let const ... ...
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // actions
    // ? l'utente studente ricevera solo la propria scheda da questa chiamata
    const testStudentIndex = async () => {
        try {
            const res = await api.get("/api/students");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

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
        const key = "last_name";
        const last_name = e.target.value;
        updateSearchParam(key, last_name, currentParams);
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
                // console.log(res.data);
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
        <div className="flex justify-center items-center h-full gap-8">
            <button onClick={testStudentIndex} className="btn">
                test student index
            </button>

            <div className="auth-form">
                <div>
                    <input
                        onChange={onInput}
                        type="text"
                        name="last_name"
                        placeholder="Cerca per cognome"
                    />
                </div>
                <div>
                    <label htmlFor="courses">Seleziona corso</label>
                    <select
                        onChange={handleCourseSelected}
                        name="course_id"
                        id="courses"
                    >
                        {courses &&
                            courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
