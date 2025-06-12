import type { Period } from "@/config/types";
import { useQueryIndexCalendar } from "@/hooks/calendarQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

export const WeeklySchedulePage = () => {
    // queries
    const {
        data: calendar,
        isLoading,
        isError,
    } = useQueryIndexCalendar({ show_week: Number(true) }) as UseQueryResult<
        Period[],
        Error
    >;

    // views
    if (isLoading) return <pre>calendar loading</pre>;
    if (isError) return <pre>calendar error</pre>;

    return (
        <section className="p-4 max-w-screen overflow-auto">
            <div className="min-w-[700px] grid grid-cols-13 capitalize [&>div]:border [&>div]:p-1 [&>div]:h-16 bg-[#242831]">
                <div className="col-span-1"></div>
                {days.map((day, i) => (
                    <div className="col-span-2" key={i}>
                        {day}
                    </div>
                ))}
                {calendar && (
                    <>
                        {periods.map((lessonTime) => (
                            <Fragment key={lessonTime.period}>
                                <div className="col-span-1 text-sm flex items-center">
                                    {lessonTime.timeFrame}
                                </div>
                                {courseListByPeriod(
                                    calendar,
                                    lessonTime.period
                                ).map((course, i) => (
                                    <div
                                        className="col-span-2 flex justify-center items-center"
                                        key={i}
                                    >
                                        <div
                                            className={`${
                                                course && "bg-emerald-600"
                                            } size-full mx-1 rounded-md px-4 flex items-center`}
                                        >
                                            {course?.name}
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
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

const periods = [
    { period: 1, timeFrame: "9:00 - 9:55" },
    { period: 2, timeFrame: "10:00 - 10:55" },
    { period: 3, timeFrame: "11:00 - 11:55" },
    { period: 4, timeFrame: "12:00 - 12:55" },
    { period: 5, timeFrame: "13:00 - 13:55" },
    { period: 6, timeFrame: "14:00 - 15:00" },
];

const courseListByPeriod = (
    courses: Period[],
    lesson_time: number
): (Period | undefined)[] => {
    const periodList = courses.filter(
        (course) => Number(course.pivot.lesson_time) === lesson_time
    );
    return days.map((day) =>
        periodList.find((period) => period?.pivot.day == day)
    );
};
