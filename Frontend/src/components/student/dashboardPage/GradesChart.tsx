import { TitleAndNavigation } from "@/components/TitleAndNavigation";
import type { GradesAvg } from "@/config/types";
import { useQueryGetGradesAverages } from "@/hooks/gradesQueries";
import type { UseQueryResult } from "@tanstack/react-query";
import type { EChartsOption } from "echarts-for-react";
import ReactECharts from "echarts-for-react";

export const GradesChart = () => {
    const { data: gradesAvgs } = useQueryGetGradesAverages() as UseQueryResult<
        GradesAvg[],
        Error
    >;

    const option: EChartsOption = gradesAvgs
        ? {
              xAxis: {
                  type: "category",
                  data: gradesAvgs.map((avg) => avg.subject_name),
              },
              yAxis: {
                  type: "value",
              },
              series: [
                  {
                      data: gradesAvgs.map((avg) =>
                          Number(avg.average_grade).toFixed(1)
                      ),
                      type: "bar",
                      itemStyle: {
                          color: (params: { value: number }) => {
                              const value = params.value;

                              if (value < 18) return "#F44336"; // rosso per voti bassi
                              return "#5c7bd9";
                          },
                      },
                      label: {
                          show: true,
                          position: "inside",
                      },
                  },
              ],
          }
        : {};
    return (
        <div className="flex flex-col h-full relative min-h-[300px]">
            <div className="dashboard_h3 w-full absolute top-1 z-10">
                <TitleAndNavigation
                    title="Average Grades"
                    path="/student-exams"
                />
            </div>
            <ReactECharts option={option} style={{ height: "100%" }} />
        </div>
    );
};
