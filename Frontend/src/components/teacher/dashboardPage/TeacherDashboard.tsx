import { QuickActions } from "@/components/QuickActions";
import { CoursesList } from "./CoursesList";
import { DailySchedule } from "@/components/DailySchedule";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";

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
                <div className="flex flex-col mt-6 text-sm">
                    <div className="flex font-semibold text-base border-y-2 [&>div]:p-1 text-center max-md:pr-5">
                        <div className="w-1/3">Course</div>
                        <div className="w-1/2 border-x">
                            Latest communication
                        </div>
                        <div className="grow">Signer</div>
                    </div>
                    <div className="flex line-clamp-3 border-b [&>div]:p-1">
                        <div className="w-1/3 flex justify-center items-center ">
                            lorem
                        </div>
                        <div className="border-x w-1/2 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Nemo recusandae esse debitis illo perferendis
                            quibusdam maiores ex molestiae aliquam aliquid!
                        </div>
                        <div className="flex justify-center items-center grow">
                            Pincopallo
                        </div>
                    </div>
                    <div className="flex line-clamp-3 border-b [&>div]:p-1">
                        <div className="w-1/3 flex justify-center items-center">
                            lorem
                        </div>
                        <div className="border-x w-1/2 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Nemo recusandae esse debitis illo perferendis
                            quibusdam maiores ex molestiae aliquam aliquid!
                        </div>
                        <div className="flex justify-center items-center grow">
                            Pincopallo
                        </div>
                    </div>
                </div>
            </div>
            <div className="others !bg-yellow-700/50 h-fit">
                <h3 className="dashboard_h3">General announcements</h3>
                <div className="flex flex-col border rounded-sm overflow-hidden text-sm bg-yellow-700">
                    <div className="flex justify-between border p-2">
                        <div>lorem</div>
                        <div>Lorem ipsum dolor sit amet.</div>
                    </div>
                    <div className="flex justify-between border p-2">
                        <div>lorem</div>
                        <div>Lorem ipsum dolor sit amet.</div>
                    </div>
                    <div className="flex justify-between border p-2">
                        <div>lorem</div>
                        <div>Lorem ipsum dolor sit amet.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
