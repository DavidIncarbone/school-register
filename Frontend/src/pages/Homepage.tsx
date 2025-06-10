import { Link } from "react-router";
import { UserType, type Course } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../components/ui/Loader";
import { useQueryIndexCourse } from "../hooks/coursesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { BookOpenText, GraduationCap, PersonStanding } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function Example() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            // ...
        </Carousel>
    );
}

export default function Homepage() {
    // global store
    const { authUser } = useGlobalStore((state) => state);

    const [date, setDate] = useState<Date | undefined>(new Date());

    // views
    if (!authUser) return <Loader />;
    return (
        <>
            {authUser.type === UserType.STUDENT ? (
                <div className="h-full flex flex-col">
                    <h1 className="text-2xl font-bold px-5 py-5">
                        Student Dashboard
                    </h1>
                    <div className="h-6/12 flex gap-5 p-5 pt-0">
                        <div className="w-3/5 flex flex-col gap-5">
                            <div className="bg-red-300 h-2/5"></div>
                            <div className="h-3/5 flex gap-5">
                                <div className="bg-blue-300 w-2/5"></div>
                                <div className="bg-blue-800 grow"></div>
                            </div>
                        </div>
                        <div className="bg-red-700 grow p-5"></div>
                    </div>
                    <div className="grow flex pt-0 p-5 gap-5">
                        <div className="border bg-green-500 border-black h-full grow-3"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col">
                    <h1 className="text-2xl font-bold px-5 py-5">
                        Teacher Dashboard
                    </h1>
                    <div className="flex h-full p-5 pt-0 gap-5">
                        <div className="h-full w-3/5 flex flex-col gap-5">
                            <div className="h-1/5 bg-blue-950">
                                <Link
                                    to="/teacher/search-students"
                                    role="button"
                                    className="btn"
                                >
                                    Cerca i tuoi pezzenti
                                </Link>
                                <Link
                                    to="/teacher/search-students"
                                    role="button"
                                    className="btn"
                                >
                                    la tua scheda personale
                                </Link>
                                <Link
                                    to="/teacher/search-students"
                                    role="button"
                                    className="btn"
                                >
                                    l'orario
                                </Link>
                                <Link
                                    to="/teacher/search-students"
                                    role="button"
                                    className="btn"
                                >
                                    comunicazioni
                                </Link>
                            </div>

                            <div className="grow p-2 rounded-md bg-zinc-800">
                                <Courses />
                            </div>
                        </div>
                        <div className=" h-full grow flex flex-col gap-5">
                            <div className="h-3/5 bg-zinc-800 flex justify-center items-center">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-lg border bg-primary"
                                />
                            </div>
                            <div className="grow bg-green-300">1</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const Courses = () => {
    // queries
    const {
        data: courses,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
    } = useQueryIndexCourse() as UseQueryResult<Course[], Error>;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <h3 className="text-xl font-semibold">I tuoi corsi</h3>
            {/* <div className="flex gap-4 overflow-x-auto scrollbar-hide"> */}
            <div className="">
                <Carousel
                    plugins={[Autoplay({ delay: 10000, active: !isHovered })]}
                    // opts={{ loop: true }}
                    className="rounded-md overflow-hidden"
                    onMouseMove={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CarouselContent className=" gap-4">
                        {courses?.map((course, i) => (
                            <CarouselItem
                                style={{
                                    background: `hsl(${i * 90}, 50%, 50%)`,
                                }}
                                key={course.id}
                                className="rounded-sm p-4 w-24 basis-1/3 flex flex-col gap-2 cursor-pointer hover:opacity-85 active:opacity-90"
                            >
                                <Link to={`/course/${course.id}`}>
                                    <div className="flex items-center gap-4 justify-betFween">
                                        <h4 className="font-semibold text-xl italic capitalize">
                                            {course.name}
                                        </h4>
                                        <BookOpenText />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>Total students: </span>
                                        <span>{course.students_count}</span>
                                        <PersonStanding />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>
                                            Attendance: {course.students_count}
                                        </span>
                                        <GraduationCap />
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-black scale-75 translate-x-12 opacity-50 hover:opacity-100 cursor-pointer" />
                    <CarouselNext className="text-black scale-75 -translate-x-12 opacity-50 hover:opacity-100 cursor-pointer" />
                </Carousel>
            </div>
            {/* </div> */}
        </>
    );
};
