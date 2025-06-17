import { CourseAttendance } from "@/components/teacher/courseDetailPage/CourseAttendance";
import { CourseInfo } from "@/components/teacher/courseDetailPage/CourseInfo";
import { CourseStats } from "@/components/teacher/courseDetailPage/CourseStats";
import { UserType, type Course } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router";

export const CourseDetailPage = () => {
    // * global store
    const { authUser } = useGlobalStore();
    // * vars
    const { id } = useParams();
    const location = useLocation();
    const cachedCourse: Course = location.state?.course;

    // * queries
    const {
        data: course,
        isLoading: isCourseLoading,
        isError: isCourseError,
    } = useQueryShowCourse(Number(id)) as UseQueryResult<Course, Error>;

    // * views
    if (isCourseError) return <pre>course error - da gestire</pre>;
    return (
        <div className="p-5 3xl:p-8 md:h-full flex flex-col gap-8 lg:gap-6">
            <div className="flex max-md:flex-col gap-8 justify-around ">
                <CourseInfo
                    cachedCourse={cachedCourse}
                    course={course}
                    isLoading={isCourseLoading}
                />
                <CourseStats cachedCourse={cachedCourse} course={course} />
            </div>
            <div className="md:h-2/3 lg:h-auto overflow-hidden flex max-md:flex-col gap-6 max-lg:grow">
                <div
                    className={`${
                        authUser?.type === UserType.STUDENT && "!w-full"
                    } md:w-1/2 lg:w-7/12 h-full`}
                >
                    <div className="gap-2 mb-4 flex flex-wrap">
                        {navLinks(Number(id)).map(
                            ({ label, to, className }) => (
                                <Link key={label} to={to} className={className}>
                                    {label}
                                </Link>
                            )
                        )}
                    </div>
                    <div className="h-4/5">
                        <CourseAnnouncements />
                    </div>
                </div>
                {authUser?.type === UserType.TEACHER && (
                    <div className="max-md:h-[500px] grow">
                        <CourseAttendance courseId={Number(id)} />
                    </div>
                )}
            </div>
        </div>
    );
};

const navLinks = (courseId: number) => {
    return [
        {
            label: "Assignments",
            to: `/teacher-assignments?course_id=${courseId}`,
            className: "btn-pretty !text-yellow-300",
        },
        {
            label: "Grades",
            to: "/",
            className: "btn-pretty !text-blue-300",
        },
        {
            label: "Disciplinary note",
            to: "/",
            className: "btn-pretty !text-red-400",
        },
        {
            label: "New communication",
            to: "/",
            className: "btn-pretty !text-teal-400",
        },
    ];
};

const CourseAnnouncements = () => {
    return (
        <>
            <div className="grid grid-cols-4 font-semibold border-y-2 text-center [&>div]:p-1 lg:pr-4">
                <div className="">Subject</div>
                <div className="col-span-2 border-x">All communications</div>
                <div className="">Signer</div>
            </div>
            <div className="h-[500px] md:h-[80%] lg:h-[95%] text-sm overflow-auto  rounded-lg ">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-4 line-clamp-3 border-b [&>div]:p-1"
                    >
                        <div className="">lorem</div>
                        <div className="col-span-2 border-x line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Nemo recusandae esse debitis illo perferendis
                            quibusdam maiores ex molestiae aliquam aliquid!
                        </div>
                        <div className="flex justify-center items-center ">
                            Pincopallo
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
