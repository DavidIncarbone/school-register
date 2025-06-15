import { Fragment } from "react";

export const SkeleDailyScheduleTable = () => {
    return (
        <>
            {Array.from({ length: 8 })?.map((_, i) => (
                <Fragment key={i}>
                    <div className="text-transparent animate-pulse bg-teal-900 border border-white">
                        .
                    </div>
                    <div className="text-transparent animate-pulse bg-teal-900 border border-white">
                        .
                    </div>
                    <div className="text-transparent animate-pulse bg-teal-900 border border-white">
                        .
                    </div>
                </Fragment>
            ))}
        </>
    );
};
