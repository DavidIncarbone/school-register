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
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import type { Course } from "@/config/types";
import { useState } from "react";
import { Link } from "react-router";
import SkeleCourseCard from "../../ui/SkeleCourseCard";
import { TitleAndNavigation } from "@/components/TitleAndNavigation";

export const CoursesList = () => {
    // * vars
    const [isHovered, setIsHovered] = useState(false);

    // * queries
    const {
        data: courses,
        isLoading: isCoursesLoading,
        isError: isCoursesError,
    } = useQueryIndexCourse({}) as UseQueryResult<Course[], Error>;

    // * views
    if (isCoursesError) return <pre>courses error - da gestire</pre>;
    return (
        <>
            <TitleAndNavigation title="Your courses" />
            <Carousel
                plugins={[Autoplay({ delay: 10000, active: !isHovered })]}
                orientation="horizontal"
                className="rounded-md mx-6"
                onMouseMove={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CarouselContent className="space-x-4 mx-2">
                    {isCoursesLoading
                        ? [1, 2, 3, 4].map((el) => (
                              <CarouselItem
                                  key={el}
                                  className="rounded-md overflow-hidden pl-4 basis-3/4 md:basis-1/2 lg:basis-2/5 cursor-pointer hover:opacity-85 active:opacity-90"
                              >
                                  <SkeleCourseCard />
                              </CarouselItem>
                          ))
                        : courses?.map((course, i) => (
                              <CarouselItem
                                  style={{
                                      background: `hsl(${i * 90}, 50%, 50%)`,
                                  }}
                                  key={course.id}
                                  className="rounded-md basis-10/12 md:basis-1/2 lg:basis-2/5 cursor-pointer hover:opacity-85 active:opacity-90"
                              >
                                  <CourseCard course={course} />
                              </CarouselItem>
                          ))}
                </CarouselContent>
                <CarouselPrevious className="text-black scale-75 translate-x-4 opacity-50 hover:opacity-100 cursor-pointer" />
                <CarouselNext className="text-black scale-75 -translate-x-4 opacity-50 hover:opacity-100 cursor-pointer" />
            </Carousel>
        </>
    );
};

const CourseCard = ({ course }: { course: Course }) => {
    return (
        <Link
            to={`/courses/${course.id}`}
            state={{ course }}
            className="inline-block w-full h-full p-4"
        >
            <div className="flex justify-between items-center">
                <h4 className="inline-block font-semibold text-xl italic capitalize">
                    {course.name}
                </h4>
                <BookOpenText className="inline-block" />
            </div>
            <div className="flex justify-between items-center">
                <span>Total students: {course.students_count}</span>
                <PersonStanding className="inline-block" />
            </div>
            <div className="flex justify-between items-center">
                <span>Attendance rate: {course.presences_percentage}</span>
                <GraduationCap className="inline-block" />
            </div>
        </Link>
    );
};
