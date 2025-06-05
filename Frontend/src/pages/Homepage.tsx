import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Course } from "../config/types";

export default function Homepage() {
    // vars, let const ... ...
    const [courses, setCourses] = useState<Course[] | null>(null);

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

    const testTeacherIndex = async () => {
        try {
            const res = await api.get("/api/students?course_id=4");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
        // console.log("test");
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

    // view
    return (
        <div className="flex justify-center items-center h-full gap-8">
            <button onClick={testStudentIndex} className="btn">
                test student index
            </button>

            <div className="auth-form">
                <form action="">
                    <div>
                        <input type="text" placeholder="Cerca per cognome" />
                    </div>
                    <div>
                        <label htmlFor="">Seleziona corso</label>
                        <select name="" id="">
                            {courses &&
                                courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                        </select>
                        <button onClick={testTeacherIndex} className="btn">
                            test teacher index
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
