import type { UseQueryResult } from "@tanstack/react-query";
import type { LessonSchedule, Presence } from "@/config/types";
import { useQueryIndexPresence } from "./presencesQueries";
import { useQueryIndexLessonSchedule } from "./lessonScheduleQueries";
import { DateTime } from "luxon";

export const useTakeAttendance = (
    forcedCourseId?: number,
    forcedTakeAttendance = false
) => {
    // vars
    const localDate = DateTime.local();
    // queries
    const { data: lessonSchedule } = useQueryIndexLessonSchedule(
        {},
        !forcedCourseId
    ) as UseQueryResult<LessonSchedule[], Error>;

    const firstCourseId =
        lessonSchedule?.find((period) => period.lesson_time == 1)?.course_id ??
        0;
    const { data: presences } = useQueryIndexPresence(
        {
            course_id: forcedCourseId ? forcedCourseId : firstCourseId,
            date: localDate.toISODate(),
            // date: "2025-06-16", // ! testing
        },
        Boolean(forcedCourseId ?? firstCourseId)
    ) as UseQueryResult<{ data: Presence[]; total: number }, Error>;

    // fai appello
    const takeAttendance = forcedTakeAttendance
        ? forcedTakeAttendance
        : presences && presences?.total === 0
        ? true
        : false;

    return {
        courseId: forcedCourseId ? forcedCourseId : firstCourseId,
        takeAttendance,
        presences,
    };
};
