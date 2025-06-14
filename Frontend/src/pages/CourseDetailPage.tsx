import { CourseAttendance } from "@/components/teacher/courseDetailPage/CourseAttendance";
import { CourseInfo } from "@/components/teacher/courseDetailPage/CourseInfo";
import { CourseStats } from "@/components/teacher/courseDetailPage/CourseStats";
import type { Course, IndexPresenceParams } from "@/config/types";
import { useQueryShowCourse } from "@/hooks/coursesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Search } from "lucide-react";
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
        <div className="p-4 3xl:p-8 md:h-full flex flex-col gap-8 lg:gap-6">
            <div className="flex max-md:flex-col md:h-1/3  lg:h-auto max-lg:items-center gap-8 justify-around">
                <CourseInfo cachedCourse={cachedCourse} course={course} />
                <CourseStats cachedCourse={cachedCourse} course={course} />
            </div>
            <div className="md:h-2/3 lg:h-auto lg:grow overflow-hidden flex max-md:flex-col gap-6">
                <div className="md:w-1/2 lg:w-7/12">
                    <div className="space-x-4">
                        <span>la tua materia</span>
                        <span>Compiti da assegnare</span>
                        <span>Voti da assegnare</span>
                        <span>Note da assegnare</span>
                    </div>
                    <CourseAnnouncements />
                </div>
                <div className="max-md:h-[500px] grow">
                    <CourseAttendance params={params} />
                </div>
            </div>
        </div>
    );
};

const CourseAnnouncements = () => {
    return (
        <div className="h-full rounded-lg flex flex-col">
            <div className="grid grid-cols-4 font-semibold border-y-2 text-center [&>div]:p-1 pr-4">
                <div className="">Subject</div>
                <div className="col-span-2 border-x">
                    Note, avvisi, comunicazioni...
                </div>
                <div className="">Signer</div>
            </div>
            <div className=" text-sm overflow-auto h-4/5 rounded-lg ">
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
        </div>
    );
};
