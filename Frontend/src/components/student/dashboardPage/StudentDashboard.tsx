import { DailySchedule } from "@/components/DailySchedule";
import { QuickActions } from "@/components/QuickActions";
import type { Presence } from "@/config/types";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import { AttendanceChart } from "./AttendanceChart";
import { GeneralAnnouncements } from "@/components/GeneralAnnouncements";
import { LatestAssignments } from "./LatestAssignments";
import { GradesChart } from "./GradesChart";

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
            <div className="info max-md:overflow-auto max-sm:flex sm:grid sm:grid-cols-3 lg:grid-cols-4  !px-4 gap-4 !bg-slate-800 max-lg:h-fit">
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
                        <AttendanceChart
                            total_days={presences.total_days}
                            total_presences={presences.total_presences}
                        />
                    )}
                </>
            </div>
            <div className="assignments !bg-fuchsia-900/50">
                <LatestAssignments />
            </div>
            <div className="grades h-[300px]">
                <GradesChart />
            </div>
            <div className="announcements !bg-yellow-700/50">
                <GeneralAnnouncements />
            </div>
        </div>
    );
};
