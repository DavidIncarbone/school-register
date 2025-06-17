import { DailySchedule } from "@/components/DailySchedule";
import { QuickActions } from "@/components/QuickActions";
import type { IndexAssignmentsParams, Presence } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

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

const StudentAttendanceChart = ({
    total_days,
    total_presences,
    presences_percentage,
}: {
    total_days?: number;
    total_presences?: number;
    presences_percentage?: number;
}) => {
    const option: EChartsOption = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            bottom: "0",
            right: "0",
            textStyle: {
                color: "#fff", // ad esempio per sfondo scuro
            },
        },
        series: [
            {
                name: "attendance",
                type: "pie",
                radius: ["40%", "70%"],
                // label: {
                //     show: false,
                //     position: "center",
                //     opacity: 0,
                // },
                data: [
                    {
                        value: total_presences,
                        name: "Present",
                        itemStyle: { color: "#42c8ff" },
                    },
                    {
                        value:
                            total_days && total_presences
                                ? total_days - total_presences
                                : 0,
                        name: "Absent",
                        itemStyle: { color: "#fe9a00" },
                    },
                ],
            },
        ],
        graphic: {
            type: "text",
            left: "center",
            top: "center",
            style: {
                text: total_days + " days", // 🔹 Il tuo testo centrale
                fill: "#fff", // colore del testo
                fontSize: 18,
                fontWeight: "bold",
            },
        },
    };

    return (
        <div className="flex flex-col h-full relative max-md:h-[300px]">
            <h3 className="dashboard_h3 absolute top-1 left-1">Attendance</h3>
            <ReactECharts option={option} style={{ height: "100%" }} />
        </div>
    );
};
