import type { EChartsOption } from "echarts-for-react";
import ReactECharts from "echarts-for-react";

export const StudentAttendanceChart = ({
    total_days,
    total_presences,
}: {
    total_days: number;
    total_presences: number;
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
                radius: ["50%", "70%"],
                label: {
                    show: true,
                    position: "outside", // oppure "inside"
                    // colore di default per tutte le etichette
                    formatter: (params: { name: string; percent?: number }) => {
                        const percentRounded =
                            params.percent && Math.round(params.percent);
                        return `${params.name}: ${percentRounded}%`;
                    }, // nome e percentuale
                },
                data: [
                    {
                        value: total_presences,
                        name: "Present",
                        itemStyle: { color: "#42c8ff" },
                    },
                    {
                        value: total_days - total_presences,
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
                text: total_days + " days",
                fill: "#fff",
                fontSize: 18,
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
