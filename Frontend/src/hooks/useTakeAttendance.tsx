import type { UseQueryResult } from "@tanstack/react-query";
import type { Period, Presence } from "@/config/types";
import { useQueryIndexPresence } from "./presencesQueries";
import { useQueryIndexLessonSchedule } from "./lessonScheduleQueries";

export const useTakeAttendance = () => {
    // queries
    const { data: lessonSchedule, isLoading: isLessonScheduleLoading } =
        useQueryIndexLessonSchedule() as UseQueryResult<Period[], Error>;

    const firstCourseId =
        lessonSchedule?.find((period) => period.lesson_time == 1)?.course_id ?? 0;
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
