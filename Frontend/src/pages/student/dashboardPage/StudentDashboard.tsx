import { DailySchedule } from "@/components/DailySchedule";
import { QuickActions } from "@/components/QuickActions";
import type { IndexAssignmentsParams, Presence } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";

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

    const assignmentsParams: IndexAssignmentsParams = {
        course_id: profile?.course_id,
    };
    const { data: assignments } = useQueryIndexAssignment(
        assignmentsParams,
        Boolean(profile)
    );

    return (
        <div className="dashboard student-dashboard">
            <div className="info max-md:overflow-auto max-md:flex md:grid md:grid-cols-3 lg:grid-cols-4  !px-4 gap-4 !bg-slate-800 max-lg:h-fit">
                <QuickActions takeAttendance={false} />
            </div>
            <div className="daily-schedule flex flex-col !bg-teal-700/50">
                <DailySchedule />
            </div>
            <div className="attendance">
                <StudentAttendanceChart
                    total_days={presences?.total_days}
                    total_presences={presences?.total_presences}
                    presences_percentage={presences?.presences_percentage}
                />
            </div>
            <div className="assignments">assignments</div>
            <div className="grades">grades</div>
            <div className="announcements">announcements</div>
        </div>
    );
};

const option = {
    tooltip: {
        trigger: "item",
    },
    legend: {
        orient: "vertical",
        top: "0",
        left: "0",
        color: "white"
    },
    series: [
        {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "white" 
                },
            },
            // labelLine: {
            //     show: false,
            // },
            data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" },
            ],
        },
    ],
};

const StudentAttendanceChart = ({
    total_days,
    // total_presences,
    presences_percentage,
}: {
    total_days?: number;
    total_presences?: number;
    presences_percentage?: number;
}) => {
    return <ReactECharts option={option} />;
};
