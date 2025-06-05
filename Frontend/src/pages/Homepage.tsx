import { useEffect, useState, type ChangeEvent } from "react";
import { api } from "../services/api";
import type { Course } from "../config/types";
import { useSearchParams } from "react-router";

export default function Homepage() {
    console.log("render homepage");
    // vars, let const ... ...
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputData, setInputData] = useState("");

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

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const last_name = e.target.value;
        const key = "last_name";

        try {
            const res = await api.get(
                `/api/students?${key}=${selectedCourseId}`
            );
            setSearchParams({
                [key]: selectedCourseId,
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCourseId = e.target.value;
        const key = "course_id";
        try {
            const res = await api.get(
                `/api/students?${key}=${selectedCourseId}`
            );
            setSearchParams({
                [key]: selectedCourseId,
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
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
        let queryStr = searchParams.toString();
        queryStr = queryStr && "?" + queryStr;
        // let params: Record<string, string> = {};
        // searchParams.forEach((val, key) => {
        //     params = { ...params, [key]: val };
        // });
        const fetchStudents = async () => {
            try {
                const res = await api.get(`/api/students${queryStr}`);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (queryStr) {
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
                        onChange={handleInputChange}
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
