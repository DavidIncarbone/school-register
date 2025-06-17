import { QuickActions } from "@/components/QuickActions";
import { CoursesList } from "./CoursesList";
import { DailySchedule } from "@/components/DailySchedule";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";
import { GeneralAnnouncements } from "@/components/GeneralAnnouncements";
import { CoursesCommunications } from "./CoursesCommunications";

export const TeacherDashboard = () => {
    // * custom hooks
    const { takeAttendance } = useTakeAttendance();

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
