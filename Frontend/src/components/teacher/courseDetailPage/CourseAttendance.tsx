import { BadgeCheck, CircleX, Info, Pencil } from "lucide-react";
import type { IndexPresenceParams, Presence } from "@/config/types";
import { useQueryIndexPresence } from "@/hooks/presencesQueries";
import { formatDateToDDMMYYYY } from "@/utilities/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";

export const CourseAttendance = ({
    params,
}: {
    params: IndexPresenceParams;
}) => {
    const {
        data: todayPresences,
        isLoading: isPresencesLoading,
        isError: isPresencesError,
    } = useQueryIndexPresence(params, true) as UseQueryResult<
        { data: Presence[]; total: number },
        Error
    >;
    if (isPresencesError) return <pre>Presences error - da gestire</pre>;
    return (
        <div className="h-full">
            <h3 className="font-semibold text-xl">
                Today's attendance -{" "}
                {formatDateToDDMMYYYY(new Date().toISOString().split("T")[0])}
            </h3>
            <div className="grid grid-cols-2 px-2 py-1 capitalize font-semibold pr-4">
                <div>student</div>
                <div className="grid grid-cols-3">
                    <span className="col-span-2">status</span>
                    <span>actions</span>
                </div>
            </div>
            <div className="flex flex-col h-4/5 overflow-auto rounded-md">
                {isPresencesLoading ? (
                    <div className="grid grid-cols-2 p-2 animate-pulse bg-zinc-800 h-full">
                        <div className="w-64 3xl:w-72"></div>
                        <div></div>
                    </div>
                ) : (
                    todayPresences &&
                    todayPresences?.data.map((presence) => (
                        <div
                            key={presence.id}
                            className="grid grid-cols-2 h-full p-2 bg-zinc-800"
                        >
                            <span className="inline-block ">
                                {presence.student_last_name}{" "}
                                {presence.student_first_name}
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
                                    <Link
                                        to={`/students/${presence.student_id}`}
                                        title="modify"
                                    >
                                        <Pencil className="cursor-pointer scale-90 transition-transform hover:scale-110" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
