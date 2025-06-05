import { useEffect, useState, type ChangeEvent } from "react";
import { api } from "../services/api";
import type { Course } from "../config/types";
import { useSearchParams } from "react-router";

export default function Homepage() {
    // vars, let const ... ...
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // console.log(searchParams.get("course"));

    // ? l'utente studente ricevera solo la propria scheda da questa chiamata
    const testStudentIndex = async () => {
        try {
            const res = await api.get("/api/students");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCourseId = e.target.value;
        try {
            const res = await api.get(
                `/api/students?course_id=${selectedCourseId}`
            );
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/api/courses");
                console.log(res.data);
                setCourses(res.data.data as Course[]);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        // let queryString: { last_name?: string; course_id?: string } = {};
        const last_name = searchParams.get("last_name");
        const course_id = searchParams.get("course_id");
        // if (searchParams.get("last_name")) {
        //     queryString = {
        //         ...queryString,
        //         last_name: searchParams.get("last_name") ?? undefined,
        //     };
        // }
        // if (searchParams.get("course_id")) {
        //     queryString = {
        //         ...queryString,
        //         course_id: searchParams.get("course_id") ?? undefined,
        //     };
        // }

        const fetchStudents = async () => {
            try {
                const res = await api.get(
                    `/api/students?${last_name && "last_name=" + last_name}&${
                        course_id && "course_id=" + course_id
                    }}`
                );
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStudents();

        // console.log(queryString);

        // fetch /api/courses? ...queryString
    }, []);

    // view
    return (
        <div className="flex justify-center items-center h-full gap-8">
            <button onClick={testStudentIndex} className="btn">
                test student index
            </button>

            <div className="auth-form">
                <div>
                    <input
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
