import { periods } from "@/config/lessonHours";
import type { Period } from "@/config/types";
import { useQueryIndexCalendar } from "@/hooks/calendarQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

export const DailySchedule = () => {
    // queries
    const {
        data: rawSchedule,
        isLoading,
        isError,
    } = useQueryIndexCalendar() as UseQueryResult<Period[], Error>;

    // views
    if (isLoading) return <pre>calendar loading</pre>;
    if (isError) return <pre>calendar error</pre>;
    return (
        <>
            <h3 className="dashboard_h3">Schedule for today</h3>
            <div className="grow grid grid-cols-3 rounded-md border overflow-hidden capitalize [&>div]:border [&>div]:flex [&>div]:items-center [&>div]:px-2 bg-yellow-700">
                <div className="font-semibold">Timeframe</div>
                <div className="font-semibold">Period</div>
                <div className="font-semibold">Course</div>
                {rawSchedule?.map((schedule, i) => (
                    <Fragment key={i}>
                        <div className="">{schedule.lesson_time}°</div>
                        <div>
                            {
                                periods.find(
                                    (p) => schedule.lesson_time == p.period
                                )?.timeFrame
                            }
                        </div>
                        <div>
                            <Link
                                to={`/course/${schedule.course_id}`}
                                className="underline underline-offset-2 hover:italic"
                            >
                                {schedule.course_name}
                            </Link>
                        </div>
                    </Fragment>
                ))}
            </div>
        </>
    );
};
