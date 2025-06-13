import { periods } from "@/config/lessonHours";
import { Fragment } from "react";

export const SkeleWeeklyScheduleTable = () => {
    return (
        <>
            {periods.map((lessonTime) => (
                <Fragment key={lessonTime.period}>
                    <div className="col-span-1 text-sm flex items-center animate-pulse bg-[#151922] "></div>
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div
                            className="animate-pulse bg-[#151922] col-span-2 flex justify-center items-center"
                            key={i}
                        ></div>
                    ))}
                </Fragment>
            ))}
        </>
    );
};
