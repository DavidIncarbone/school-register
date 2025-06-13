import type { UseQueryResult } from "@tanstack/react-query";
import { useQueryIndexCalendar } from "./calendarQueries";
import type { Period, Presence } from "@/config/types";
import { useQueryIndexPresence } from "./presencesQueries";

export const useTakeAttendance = () => {
    // queries
    const { data: calendar, isLoading: isCalendarLoading } =
        useQueryIndexCalendar() as UseQueryResult<Period[], Error>;

    const firstCourseId =
        calendar?.find((period) => period.lesson_time == 1)?.course_id ?? 0;
    const { data: presences } = useQueryIndexPresence(
        {
            course_id: firstCourseId,
            date: new Date().toISOString().split("T")[0],
        },
        Boolean(firstCourseId)
    ) as UseQueryResult<{ data: Presence[]; total: number }[], Error>;

    // fai appello
    const takeAttendance =
        presences && presences[0]?.total === 0 ? true : false;

    return { firstCourseId, takeAttendance, presences };
};
