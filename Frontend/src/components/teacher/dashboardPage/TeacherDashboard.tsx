import { QuickActions } from "@/components/QuickActions";
import { CoursesList } from "./CoursesList";
import { DailySchedule } from "@/components/DailySchedule";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";
import { GeneralAnnouncements } from "@/components/GeneralAnnouncements";
import { CoursesCommunications } from "./CoursesCommunications";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const TeacherDashboard = () => {
    // * custom hooks
    const { takeAttendance } = useTakeAttendance();

    useEffect(() => {
        if (takeAttendance) {
            toast.custom(
                (t) => (
                    <div
                        className={`transition-all duration-300 transform px-4 py-2 rounded shadow bg-yellow-100 text-yellow-800 ${
                            t.visible
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-70 -translate-y-2"
                        }`}
                    >
                        ⚠️ Take attendance before class starts.
                    </div>
                ),
                { position: "top-center" }
            );
        }
    }, [takeAttendance]);

    // * views
    return (
        <div className="dashboard teacher-dashboard">
            <div className="info max-md:overflow-auto max-md:flex md:grid md:grid-cols-3 lg:grid-cols-4  !px-4 gap-4 !bg-slate-800 max-lg:h-fit">
                <QuickActions takeAttendance={takeAttendance} />
            </div>
            <div className="daily-schedule flex flex-col !bg-teal-700/50">
                <DailySchedule />
            </div>
            <div className="big !bg-neutral-950/50 overflow-hidden">
                <CoursesList />
                <CoursesCommunications />
            </div>
            <div className="announcements !bg-yellow-700/50 h-fit">
                <GeneralAnnouncements />
            </div>
        </div>
    );
};
