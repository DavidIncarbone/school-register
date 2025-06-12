import type { Course, Presence, IndexPresenceParams } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";

export const CourseDetailPage = () => {
    // vars
    const { id } = useParams();
    const location = useLocation();
    const cachedCourse: Course = location.state?.course;
    const params: IndexPresenceParams = { course_id: Number(id) };
    // queries
    const {
        data: course,
        isLoading: isCourseLoading,
        isError: isCourseError,
    } = useQueryShowCourse(Number(id)) as UseQueryResult<Course, Error>;

    const {
        data: presences,
        isLoading: isPresencesLoading,
        isError: isPresencesError,
    } = useQueryIndexPresence(params) as UseQueryResult<Presence[], Error>;

    // console.log(presences);

    return (
        <div className="p-8">
            <h1 className="font-semibold italic text-4xl capitalize">
                {cachedCourse?.name ?? course?.name ?? "Il tuo corso"}
            </h1>
            <h2>
                Description: {cachedCourse?.description ?? course?.description}
            </h2>
            <ul>
                <li>
                    Total students:{" "}
                    {cachedCourse?.students_count ?? course?.students_count}
                </li>
                <li>Total teachers: {course?.teachers_count}</li>
                <li>Total subjects: {course?.subjects_count}</li>
            </ul>
            <h3 className="font-semibold text-xl">Presences</h3>
            <div className="bg-zinc-900 overflow-auto h-[400px]">
                {presences &&
                    presences.map((presence) => (
                        <div key={presence.id} className="border p-4">
                            <p>{presence.student_id}</p>
                            <p>{presence.is_present}</p>
                            <p>{presence.date}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};
