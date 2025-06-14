import { CourseAttendance } from "@/components/teacher/courseDetailPage/CourseAttendance";
import { CourseInfo } from "@/components/teacher/courseDetailPage/CourseInfo";
import { CourseStats } from "@/components/teacher/courseDetailPage/CourseStats";
import type { Course, IndexPresenceParams } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";

export const CourseDetailPage = () => {
    // vars
    const { id } = useParams();
    const location = useLocation();
    const cachedCourse: Course = location.state?.course;
    const params: IndexPresenceParams = {
        course_id: Number(id),
        date: new Date().toISOString().split("T")[0],
    };
    // queries
    const {
        data: course,
        isLoading: isCourseLoading,
        isError: isCourseError,
    } = useQueryShowCourse(Number(id)) as UseQueryResult<Course, Error>;

    return (
        <div className="p-8 md:h-full flex flex-col gap-8 lg:gap-6">
            <div className="flex max-md:flex-col md:h-1/3  lg:h-auto max-lg:items-center gap-8 justify-around">
                <CourseInfo cachedCourse={cachedCourse} course={course} />
                <CourseStats cachedCourse={cachedCourse} course={course} />
            </div>
            <div className="md:h-2/3 lg:h-auto lg:grow overflow-hidden flex max-md:flex-col">
                <div className="md:w-1/2 lg:w-7/12">
                    <p>la tua materia</p>
                    <p>Compiti da assegnare</p>
                    <p>Voti da assegnare</p>
                    <p>Note da assegnare</p>
                    <p>Comunicazioni</p>
                </div>
                <div className="max-md:h-[500px] grow">
                    <CourseAttendance params={params} />
                </div>
            </div>
        </div>
    );
};
