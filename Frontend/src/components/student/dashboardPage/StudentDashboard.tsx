import { DailySchedule } from "@/components/DailySchedule";
import { QuickActions } from "@/components/QuickActions";
import type {
    Assignment,
    IndexAssignmentsParams,
    Presence,
} from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import { StudentAttendanceChart } from "./StudentAttendanceChart";
import { TitleAndNavigation } from "@/components/TitleAndNavigation";
import { GeneralAnnouncements } from "@/components/GeneralAnnouncements";

export const StudentDashboard = () => {
    // * global store
    const { profile } = useGlobalStore();

    // * queries
    const { data: presences } = useQueryIndexPresence(
        {
            student_id: profile?.id,
        },
        Boolean(profile)
    ) as UseQueryResult<{
        total_days: number;
        total_presences: number;
        presences_percentage: number;
        data: Presence[];
    }>;

    return (
        <div className="dashboard student-dashboard">
            <div className="info max-md:overflow-auto max-md:flex md:grid md:grid-cols-3 lg:grid-cols-4  !px-4 gap-4 !bg-slate-800 max-lg:h-fit">
                <QuickActions takeAttendance={false} />
            </div>
            <div className="daily-schedule flex flex-col !bg-teal-700/50">
                <DailySchedule />
            </div>
            <div className="attendance">
                <>
                    {!presences ? (
                        <Loader />
                    ) : (
                        <StudentAttendanceChart
                            total_days={presences.total_days}
                            total_presences={presences.total_presences}
                        />
                    )}
                </>
            </div>
            <div className="assignments">
                <DashboardAssignments />
            </div>
            <div className="grades">grades</div>
            <div className="announcements !bg-yellow-700/50 h-fit">
                <GeneralAnnouncements />
            </div>
        </div>
    );
};

const DashboardAssignments = () => {
    // * global store
    const { profile } = useGlobalStore();

    const assignmentsParams: IndexAssignmentsParams = {
        course_id: profile?.course_id,
    };

    const { data: assignments } = useQueryIndexAssignment(
        assignmentsParams,
        Boolean(profile)
    ) as UseQueryResult<{ data: Assignment[]; total: number }, Error>;
    return (
        <>
            <TitleAndNavigation
                title="Assignments"
                path="/teacher-assignments"
            />
            <div className="grid grid-cols-3 border rounded-t-sm text-center">
                <div className="border-r p-1">Subject</div>
                <div className="col-span-2">Body</div>
            </div>
            {!assignments
                ? [1, 2, 3, 4].map((_, i) => (
                      <div
                          key={i}
                          className="grid grid-cols-3 border border-white last:rounded-b-sm text-transparent animate-pulse bg-zinc-900
                          "
                      >
                          <div className="flex justify-center items-center border-r">
                              name
                          </div>
                          <div className="line-clamp-2 col-span-2 p-1">
                              body <br /> boody
                          </div>
                      </div>
                  ))
                : assignments?.data.map((as) => (
                      <div
                          key={as.id}
                          className="grid grid-cols-3 border last:rounded-b-sm"
                      >
                          <div className="flex justify-center items-center border-r">
                              {as.subject.name}
                          </div>
                          <div className="line-clamp-2 col-span-2 p-1">
                              {as.body}
                          </div>
                      </div>
                  ))}
        </>
    );
};
