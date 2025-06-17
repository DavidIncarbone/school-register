import { BadgeCheck, CircleX, Info, Pencil } from "lucide-react";
import type { IndexPresenceParams, Presence } from "@/config/types";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { DateTime } from "luxon";

export const CourseAttendance = ({
  params,
}: {
  params: IndexPresenceParams;
}) => {
  // * vars
  // da libreria esterna luxon prendo datetima odierno
  const now = DateTime.now().setLocale("en");
  // controllo se è festivo o feriale
  const isWeekend = ["saturday", "sunday"].includes(
    now.weekdayLong.toLowerCase()
  );

  // * queries
  const {
    data: todayPresences,
    isLoading: isPresencesLoading,
    isError: isPresencesError,
  } = useQueryIndexPresence(params, true) as UseQueryResult<
    { data: Presence[]; total: number },
    Error
  >;

  // * views
  if (isPresencesError) return <pre>Presences error - da gestire</pre>;
  return (
    <div className="h-full">
      <h3 className="font-semibold text-xl">
        Today's attendance - {}
        {new Date().toLocaleDateString()}
      </h3>
      <div className="grid grid-cols-2 px-2 py-1 capitalize font-semibold pr-4 max-md:border-x">
        <div>student</div>
        <div className="grid grid-cols-3">
          <span className="col-span-2">status</span>
          <span>actions</span>
        </div>
      </div>
      <div className="flex flex-col h-[80%] 3xl:h-[90%] overflow-auto md:rounded-md max-md:border-x">
        {isWeekend ? (
          <div className="h-full flex flex-col justify-center items-center text-center text-yellow-500">
            <span>This operation is restricted on this day of the week</span>
          </div>
        ) : isPresencesLoading ? (
          <div className=" animate-pulse bg-zinc-800 h-full" />
        ) : todayPresences && !todayPresences.total ? (
          <ZeroAttendanceMessage params={params} />
        ) : (
          todayPresences?.data.map((presence) => (
            <AttendanceRecord key={presence.id} presence={presence} />
          ))
        )}
      </div>
    </div>
  );
};

const AttendanceRecord = ({ presence }: { presence: Presence }) => {
  return (
    <div className="grid grid-cols-2 h-full p-2 bg-zinc-800">
      <span className="inline-block ">
        {presence.student_last_name} {presence.student_first_name}
      </span>
      <div className="grid grid-cols-3">
        {presence.is_present ? (
          <div className="col-span-2 flex items-center gap-2 ">
            <span className="w-16">present</span>
            <BadgeCheck className="text-green-600" />
          </div>
        ) : (
          <div className="col-span-2 flex items-center gap-2">
            <span className="w-16">absent</span>
            <CircleX className="text-red-600" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div title="info">
            <Info className="cursor-pointer scale-90 transition-transform hover:scale-110" />
          </div>
          <Link to={`/students/${presence.student_id}`} title="modify">
            <Pencil className="cursor-pointer scale-90 transition-transform hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ZeroAttendanceMessage = ({ params }: { params: IndexPresenceParams }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-yellow-500">
      <span>Attendance has not been taken yet</span>
      <Link
        to="/attendance-form"
        state={{
          forcedCourseId: params.course_id,
          forcedTakeAttendance: true,
        }}
        className="btn"
      >
        Click here to take attendance
      </Link>
    </div>
  );
};
