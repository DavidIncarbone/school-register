import { SkeleWeeklyScheduleTable } from "@/components/ui/SkeleWeeklyScheduleTable";
import { periods } from "@/config/globals";
import type { LessonSchedule } from "@/config/types";
import { useQueryIndexLessonSchedule } from "@/hooks/lessonScheduleQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

export const WeeklySchedulePage = () => {
  // * queries
  const {
    data: lessonSchedule,
    isLoading,
    isError,
  } = useQueryIndexLessonSchedule({
    show_week: Number(true),
  }) as UseQueryResult<LessonSchedule[], Error>;

  // * views
  if (isError) return <pre>lessonSchedule error</pre>;
  return (
    <div className="px-5 py-2">
      <h1 className="title_h1">Courses schedule</h1>
      <div className="overflow-auto max-lg:max-w-[92vw] mx-auto">
        <div className="min-w-[900px] rounded-md border overflow-hidden grid grid-cols-13 capitalize [&>div]:border [&>div]:p-1 [&>div]:h-[62px] bg-[#242831]">
          <div className="col-span-1"></div>
          {days.map((day, i) => (
            <div className="col-span-2 !px-4 flex items-center" key={i}>
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
                    {courseListByPeriod(lessonSchedule, lessonTime.period).map(
                      (course, i) => (
                        <div
                          className="col-span-2 flex justify-center items-center"
                          key={i}
                        >
                          <div className="size-full mx-2">
                            {course && (
                              <Link
                                to={`/courses/${course.course_id}`}
                                style={{
                                  background: `hsl(${i * 45}, 50%, 50%, 90%)`,
                                }}
                                className="hover:opacity-80 hover:[&>*]:scale-110 [&>*]:transition-all
                                                    size-full rounded-md px-2 flex items-center gap-2"
                              >
                                <div
                                  style={{
                                    background: `hsl(${i * 45}, 100%, 25%)`,
                                  }}
                                  className="w-2 rounded-full z-20 h-3/5 left-2"
                                ></div>
                                <span className="font-semibold">
                                  {course.course_name}
                                </span>
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </Fragment>
                ))}
            </>
          )}
        </div>
      </div>
      <strong className="mt-2 inline-block lg:hidden landscape:hidden">
        Rotate the device for better visualization
      </strong>
    </div>
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

// ritorna un array di lezioni di un certo periodo (1°,2°...) lungo quanto i giorni di days
const courseListByPeriod = (
  courses: LessonSchedule[],
  lesson_time: number
): (LessonSchedule | undefined)[] => {
  const periodList = courses.filter(
    (course) => Number(course.lesson_time) === lesson_time
  );

  return days.map((day) => periodList.find((period) => period?.day == day));
};
