import type { Course, Presence, IndexPresenceParams } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";
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

    const {
        data: todayPresences,
        isLoading: isPresencesLoading,
        isError: isPresencesError,
    } = useQueryIndexPresence(params, true) as UseQueryResult<
        { data: Presence[]; total: number },
        Error
    >;

    // console.log(presences);

    return (
        <div className="p-8 max-h-full flex flex-col gap-4">
            {/* course detail */}
            <div className="flex flex-wrap gap-8 justify-around">
                <div className="space-y-4 w-1/2">
                    <div className="flex gap-6">
                        <img src="/logo.png" className="w-36 rounded-lg" />
                        <div className="space-y-2">
                            <h1 className="font-bold text-6xl capitalize ">
                                {cachedCourse?.name ??
                                    course?.name ??
                                    "Il tuo corso"}
                            </h1>
                            <span className="text-neutral-300">
                                ID: {cachedCourse?.id ?? course?.id ?? " "}
                            </span>
                        </div>
                    </div>
                    <p className="font-semibold">
                        {cachedCourse?.description ?? course?.description}
                    </p>
                </div>
                <div className="grid grid-cols-3 h-fit gap-8 [&>div]:rounded-md">
                    <div className="w-28 aspect-square flex flex-col justify-center items-center bg-blue-700">
                        <span
                            className={`${
                                !course?.subjects_count && "text-transparent"
                            } text-4xl font-semibold`}
                        >
                            {course?.subjects_count ?? "0"}
                        </span>
                        <span className="text-xs">Total subjects</span>
                    </div>
                    <div className="w-28 aspect-square flex flex-col justify-center items-center bg-emerald-700">
                        <span className="text-4xl font-semibold">
                            {course?.teachers_count}
                        </span>
                        <span className="text-xs">Total teachers</span>
                    </div>
                    <div className="w-28 aspect-square flex flex-col justify-center items-center bg-amber-700">
                        <span className="text-4xl font-semibold">
                            {cachedCourse?.students_count ??
                                course?.students_count}
                        </span>
                        <span className="text-xs">Total students</span>
                    </div>
                    <div className="w-28 aspect-square flex flex-col justify-center items-center bg-slate-700">
                        <span className="text-4xl font-semibold">
                            {course?.total_presence}
                        </span>
                        <span className="text-xs">Total attendance</span>
                    </div>
                    <div className="w-28 aspect-square flex flex-col justify-center items-center bg-fuchsia-700">
                        <span className="text-4xl font-semibold">
                            {course?.presences_percentage}
                        </span>
                        <span className="text-xs">Attendance Rate</span>
                    </div>
                </div>
            </div>
            {/* attendance */}
            <div className="grow overflow-hidden h-[300px]">
                <h3 className="font-semibold text-xl mb-2">
                    Today's attendance
                </h3>
                {/* <div className="grid grid-cols-4">
                    <div className="flex border justify-between text-center">
                        <h4 className="w-1/2">Student</h4>
                        <h4 className="w-1/2">Status</h4>
                    </div>
                </div> */}
                <div className="bg-zinc-900 flex flex-col flex-wrap h-full">
                    {todayPresences &&
                        todayPresences?.data.map((presence) => (
                            <div key={presence.id} className="p-4 w-fit flex gap-2">
                                <div className="space-x-1">
                                    <span>{presence.student_first_name}</span>
                                    <span>{presence.student_last_name}</span>
                                </div>
                                <span>{presence.is_present ? "present" : "absent"}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
