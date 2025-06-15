import type { UseQueryResult } from "@tanstack/react-query";
import type { LessonSchedule, Presence } from "@/config/types";
import { useQueryIndexPresence } from "./presencesQueries";
import { useQueryIndexLessonSchedule } from "./lessonScheduleQueries";
import { DateTime } from "luxon";

// da utilizzare solo se user.type === teacher
// questo hook può ricevere due props (opzionali) che indicano la possibilità di effettuare un appello di un corso specifico se ancora non è stato fatto
// di default queste due props, se non settate, non alterano le operazioni standard dell'hook
// l'hook ritornerà sempre un courseId, un booleano takeAttendance, e un'array di presenze oppure undefined
export const useTakeAttendance = (
    forcedCourseId?: number,
    forcedTakeAttendance = false
) => {
    // * vars
    const localDate = DateTime.local(); // localDate da libreria esterna luxon

    // * queries
    // chiamata api per ottenere l'orario delle lezioni di oggi, abilitata solo se forcedCourseId è undefined (no appello di corso specifico)
    const { data: lessonSchedule } = useQueryIndexLessonSchedule(
        {},
        !forcedCourseId
    ) as UseQueryResult<LessonSchedule[], Error>;

    // l'id del corso sarà forcedCourseId (se esiste) sennò sara il courseId della lezione della prima ora del teacher (se esiste) sennò 0 (falsy value)
    const courseId =
        forcedCourseId ??
        lessonSchedule?.find((period) => period.lesson_time == 1)?.course_id ??
        0;

    // chiamata api per ottenere le presenze di oggi, abilitata solo se courseId !== 0 (quindi o è forcedCourseId o il courseId alla prima ora) e forcedTakeAttendance non è settato
    const { data: presences } = useQueryIndexPresence(
        {
            course_id: courseId,
            date: localDate.toISODate(),
            // date: "2025-06-16", // ! testing
        },
        Boolean(courseId) && !forcedTakeAttendance
    ) as UseQueryResult<{ data: Presence[]; total: number }, Error>;

    // boolean che comanda se fare o meno l'appello del corso con id = courseId. Se forcedTakeAttendance è settato diventa automaticamente true sennò dipende dal numero di presenze di oggi ( se = 0 significa che non è stato fatto l appello quindi takeAttendance = true)
    const takeAttendance = forcedTakeAttendance
        ? forcedTakeAttendance
        : presences && presences?.total === 0
        ? true
        : false;

    return {
        courseId,
        takeAttendance,
        presences,
    };
};
