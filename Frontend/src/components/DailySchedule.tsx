import { periods } from "@/config/lessonHours";
import type { Period } from "@/config/types";
import { useQueryIndexCalendar } from "@/hooks/calendarQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { SkeleDailyScheduleTable } from "./ui/SkeleDailyScheduleTable";

export const DailySchedule = () => {
    // queries
    const {
        data: dailySchedule,
        isLoading,
        isError,
    } = useQueryIndexCalendar() as UseQueryResult<Period[], Error>;

    // views
    if (isError) return <pre>calendar error</pre>;
    return (
        <>
            <h3 className="dashboard_h3">Schedule for today</h3>
            <div className="shrink-0 grid grid-cols-3 rounded-t-md border-t border-x [&>div]:border [&>div]:border-b-0 overflow-hidden capitalize [&>div]:flex [&>div]:items-center [&>div]:p-2 bg-teal-700">
                <div className="font-semibold">Period</div>
                <div className="font-semibold">Timeframe</div>
                <div className="font-semibold">Course</div>
            </div>
            <div>
                <div className="grow grid grid-cols-3 rounded-b-md border  overflow-hidden capitalize [&>div]:border [&>div]:flex [&>div]:items-center [&>div]:p-2 bg-teal-700 text-sm">
                    {isLoading ? (
                        <SkeleDailyScheduleTable />
                    ) : (
                        dailySchedule?.map((schedule, i) => (
                            <Fragment key={i}>
                                <div className="">{schedule.lesson_time}°</div>
                                <div className="">
                                    {
                                        periods.find(
                                            (p) =>
                                                schedule.lesson_time == p.period
                                        )?.timeFrame
                                    }
                                </div>
                                <div className="">
                                    <Link
                                        to={`/course/${schedule.course_id}`}
                                        className="underline underline-offset-2 hover:italic"
                                    >
                                        {schedule.course_name}
                                    </Link>
                                </div>
                            </Fragment>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};
