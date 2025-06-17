import { periods } from "@/config/globals";
import { UserType, type LessonSchedule } from "@/config/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { SkeleDailyScheduleTable } from "./ui/SkeleDailyScheduleTable";
import { useQueryIndexLessonSchedule } from "@/hooks/lessonScheduleQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import { TitleAndNavigation } from "./TitleAndNavigation";

export const DailySchedule = () => {
    // * global store
    const { authUser } = useGlobalStore();
    // * queries
    const {
        data: dailySchedule,
        isLoading,
        isError,
    } = useQueryIndexLessonSchedule({}) as UseQueryResult<
        LessonSchedule[],
        Error
    >;

    // * views
    if (isError) return <pre>lessonSchedule error</pre>;
    return (
        <>
            <TitleAndNavigation
                title={`Today's timetable - ${new Date().toLocaleDateString()}`}
            />
            <div className="shrink-0 grid grid-cols-3 rounded-t-md border-t border-x [&>div]:border [&>div]:border-b-0 overflow-hidden capitalize [&>div]:flex [&>div]:items-center [&>div]:p-2 bg-teal-700">
                <div className="font-semibold">Period</div>
                <div className="font-semibold">Timeframe</div>
                <div className="font-semibold">
                    {authUser?.type === UserType.STUDENT ? "Subject" : "course"}
                </div>
            </div>
            <div className="grow grid grid-cols-3 rounded-b-md border  overflow-hidden capitalize [&>div]:border [&>div]:flex [&>div]:items-center [&>div]:p-2 bg-teal-700 text-sm">
                {isLoading ? (
                    <SkeleDailyScheduleTable />
                ) : !dailySchedule?.length ? (
                    <ZeroLessonsMessage />
                ) : (
                    dailyScheduleList(dailySchedule)?.map((schedule, i) => (
                        <Fragment key={i}>
                            <div className="">{periods[i].period}°</div>
                            <div className="">{periods[i].timeFrame}</div>
                            <div className="">
                                <Link
                                    to={`/courses/${schedule?.course_id}`}
                                    className={`${
                                        authUser?.type === UserType.TEACHER &&
                                        "underline underline-offset-2 hover:italic"
                                    } `}
                                >
                                    {authUser?.type === UserType.STUDENT
                                        ? schedule?.subject_name
                                        : schedule?.course_name}
                                </Link>
                            </div>
                        </Fragment>
                    ))
                )}
            </div>
        </>
    );
};

const ZeroLessonsMessage = () => {
    return (
        <div className="col-span-full flex flex-col justify-center items-center bg-teal-800">
            <span>No lessons for today!</span>
            <span className="lowercase text-xs">
                <span>Check your weekly schedule</span>{" "}
                <Link
                    to="/weekly-schedule"
                    className="italic underline underline-offset-2 hover:!scale-110 transition-transform inline-block"
                >
                    here
                </Link>
            </span>
        </div>
    );
};

// riempi un array di schedules e undefined con lunghezza periods.length
const dailyScheduleList = (
    schedule: LessonSchedule[]
): (LessonSchedule | undefined)[] => {
    return periods.map((p) =>
        schedule.find((lesson) => lesson.lesson_time == p.period)
    );
};
