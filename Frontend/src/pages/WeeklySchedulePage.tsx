import { SkeleWeeklyScheduleTable } from "@/components/ui/SkeleWeeklyScheduleTable";
import { periods } from "@/config/lessonHours";
import type { Period } from "@/config/types";
import { useQueryIndexLessonSchedule } from "@/hooks/lessonScheduleQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

export const WeeklySchedulePage = () => {
    // queries
    const {
        data: lessonSchedule,
        isLoading,
        isError,
    } = useQueryIndexLessonSchedule({
        show_week: Number(true),
    }) as UseQueryResult<Period[], Error>;

    // views
    if (isError) return <pre>lessonSchedule error</pre>;

    return (
        <section className="p-4">
            <h3 className="dashboard_h3">Courses schedule</h3>
            <div className="overflow-auto max-lg:max-w-[92vw] mx-auto">
                <div className="min-w-[900px] rounded-md border overflow-hidden grid grid-cols-13 capitalize [&>div]:border [&>div]:p-1 [&>div]:h-16 bg-[#242831]">
                    <div className="col-span-1"></div>
                    {days.map((day, i) => (
                        <div
                            className="col-span-2 !px-4 flex items-center"
                            key={i}
                        >
                            {day}
                        </div>
                    ))}
                    {isLoading ? (
                        <SkeleWeeklyScheduleTable />
                    ) : (
                        <>
                            {lessonSchedule &&
                                periods.map((lessonTime) => (
                                    <Fragment key={lessonTime.period}>
                                        <div className="col-span-1 text-sm flex items-center">
                                            {lessonTime.timeFrame}
                                        </div>
                                        {courseListByPeriod(
                                            lessonSchedule,
                                            lessonTime.period
                                        ).map((course, i) => (
                                            <div
                                                className="col-span-2 flex justify-center items-center"
                                                key={i}
                                            >
                                                <div className="size-full mx-2">
                                                    {course && (
                                                        <Link
                                                            to={`/courses/${course.course_id}`}
                                                            style={{
                                                                background: `hsl(${
                                                                    i * 45
                                                                }, 50%, 50%, 90%)`,
                                                            }}
                                                            className="hover:opacity-80 hover:[&>*]:scale-110 [&>*]:transition-all
                                                    size-full rounded-md px-2 flex items-center gap-2"
                                                        >
                                                            <div
                                                                style={{
                                                                    background: `hsl(${
                                                                        i * 45
                                                                    }, 100%, 25%)`,
                                                                }}
                                                                className="w-2 rounded-full z-20 h-3/5 left-2"
                                                            ></div>
                                                            <span className="font-semibold">
                                                                {
                                                                    course.course_name
                                                                }
                                                            </span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </Fragment>
                                ))}
                        </>
                    )}
                </div>
            </div>
            <strong className="mt-2 inline-block lg:hidden landscape:hidden">
                Rotate the device for better visualisation
            </strong>
        </section>
    );
};

enum WeekDay {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
}

const days = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
];

const courseListByPeriod = (
    courses: Period[],
    lesson_time: number
): (Period | undefined)[] => {
    const periodList = courses.filter(
        (course) => Number(course.lesson_time) === lesson_time
    );

    return days.map((day) => periodList.find((period) => period?.day == day));
};
