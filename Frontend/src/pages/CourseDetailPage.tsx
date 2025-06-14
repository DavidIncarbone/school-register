import type { Course, Presence, IndexPresenceParams } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { BadgeCheck, CircleX, Info, Pencil } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";

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
                    <p></p>
                </div>
                <div className="grow">
                    <Attendance params={params} />
                </div>
            </div>
        </div>
    );
};

const CourseInfo = ({
    course,
    cachedCourse,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
}) => {
    return (
        <div className="md:w-1/2 space-y-2">
            <div className="flex gap-6">
                <img src="/logo.png" className="w-36 rounded-lg" />
                <div className="space-y-2">
                    <h1 className="font-bold text-5xl lg:text-6xl capitalize ">
                        {cachedCourse?.name ?? course?.name ?? "Il tuo corso"}
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
    );
};

const CourseStats = ({
    course,
    cachedCourse,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
}) => {
    return (
        <div className="grid grid-cols-3 h-fit gap-4 lg:gap-8 [&>div]:rounded-md">
            <StatCard
                value={course?.subjects_count}
                label="Total subjects"
                color="bg-blue-700"
            />

            <StatCard
                value={course?.teachers_count}
                label="Total teachers"
                color="bg-emerald-700"
            />

            <StatCard
                value={cachedCourse?.students_count ?? course?.students_count}
                label="Total students"
                color="bg-amber-700"
            />

            <StatCard
                value={course?.total_presence}
                label="Total attendance"
                color="bg-slate-700"
            />

            <StatCard
                value={course?.presences_percentage}
                label="Attendance Rate"
                color="bg-fuchsia-700"
            />
        </div>
    );
};

const StatCard = ({
    value,
    label,
    color,
}: {
    value: string | number | undefined | null;
    label: string;
    color: string;
}) => {
    const isLoading = value === null || value === undefined;
    return (
        <div
            className={`w-24 lg:w-28 aspect-square flex flex-col justify-center items-center ${color} ${
                isLoading ? "animate-pulse text-transparent" : ""
            }`}
        >
            <span className="text-3xl lg:text-4xl font-semibold">
                {isLoading ? "0" : value}
            </span>
            <span className="text-xs text-center">{label}</span>
        </div>
    );
};

const Attendance = ({ params }: { params: IndexPresenceParams }) => {
    const {
        data: todayPresences,
        isLoading: isPresencesLoading,
        isError: isPresencesError,
    } = useQueryIndexPresence(params, true) as UseQueryResult<
        { data: Presence[]; total: number },
        Error
    >;
    return (
        <>
            <h3 className="font-semibold text-xl">
                Today's attendance -{" "}
                {formatDateToDDMMYYYY(new Date().toISOString().split("T")[0])}
            </h3>
            <div className="grid grid-cols-2 px-2 py-1 capitalize font-semibold">
                <div>student</div>
                <div className="grid grid-cols-3">
                    <span className="col-span-2">status</span>
                    <span>actions</span>
                </div>
            </div>
            <div className="flex flex-col h-full overflow-auto rounded-md">
                {isPresencesLoading ? (
                    <div className="grid grid-cols-2 p-2 animate-pulse bg-zinc-800 h-full">
                        <div className="w-64 3xl:w-72"></div>
                        <div></div>
                    </div>
                ) : (
                    todayPresences &&
                    todayPresences?.data.map((presence) => (
                        <div
                            key={presence.id}
                            className="grid grid-cols-2 p-2 bg-zinc-800"
                        >
                            <span className="inline-block ">
                                {presence.student_last_name}{" "}
                                {presence.student_first_name}
                            </span>
                            <div className="grid grid-cols-3">
                                {presence.is_present ? (
                                    <div className="col-span-2 flex items-center gap-2 ">
                                        <span className="w-16">present</span>
                                        <BadgeCheck className="text-green-600" />
                                    </div>
                                ) : (
                                    <div className="col-span-2 flex items-center gap-2">
                                        <span className="w-16">absent</span>
                                        <CircleX className="text-red-600" />
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <div title="info">
                                        <Info className="cursor-pointer scale-90 transition-transform hover:scale-110" />
                                    </div>
                                    <Link
                                        to={`/students/${presence.student_id}`}
                                        title="modify"
                                    >
                                        <Pencil className="cursor-pointer scale-90 transition-transform hover:scale-110" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
