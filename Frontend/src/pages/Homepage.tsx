import { UserType } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../components/ui/Loader";
import { CoursesList } from "@/components/teacher/CoursesList";
import { QuickActions } from "@/components/QuickActions";
import { DailySchedule } from "@/components/DailySchedule";
import { Search } from "lucide-react";
import { useTakeAttendance } from "@/hooks/useTakeAttendance";

export default function Homepage() {
    // global store
    const { authUser } = useGlobalStore((state) => state);

    const { takeAttendance } = useTakeAttendance();

    // views
    if (!authUser) return <Loader />;
    return (
        <>
            {authUser.type === UserType.STUDENT ? (
                <div className="h-full flex flex-col">
                    <h1 className="text-2xl font-bold px-5 py-5">
                        Student Dashboard
                    </h1>
                    <div className="h-6/12 flex gap-5 p-5 pt-0">
                        <div className="w-3/5 flex flex-col gap-5">
                            <div className="bg-red-300 h-2/5"></div>
                            <div className="h-3/5 flex gap-5">
                                <div className="bg-blue-300 w-2/5"></div>
                                <div className="bg-blue-800 grow"></div>
                            </div>
                        </div>
                        <div className="bg-red-700 grow p-5"></div>
                    </div>
                    <div className="grow flex pt-0 p-5 gap-5">
                        <div className="border bg-green-500 border-black h-full grow-3"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col min-h-full lg:h-full py-2">
                    <h1 className="title text-2xl font-bold px-5 py-1">
                        Teacher Dashboard
                    </h1>
                    <div className="teacher-dashboard">
                        <div className="info max-md:overflow-auto max-md:flex md:grid md:grid-cols-3 lg:grid-cols-4  !px-4 gap-4 !bg-slate-800 max-lg:h-fit">
                            <QuickActions takeAttendance={takeAttendance} />
                        </div>

                        <div className="big !bg-neutral-950/50 overflow-hidden">
                            <CoursesList />
                            <div className="flex flex-col mt-6 text-sm">
                                <div className="flex font-semibold text-base border-y-2 [&>div]:p-1">
                                    <div className="w-1/3">Course</div>
                                    <div className="w-1/2 border-x">
                                        Notices
                                    </div>
                                    <div className="grow">Action</div>
                                </div>
                                <div className="flex line-clamp-3 border-b [&>div]:p-1">
                                    <div className="w-1/3">lorem</div>
                                    <div className="border-x w-1/2 line-clamp-3">
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Nemo recusandae esse
                                        debitis illo perferendis quibusdam
                                        maiores ex molestiae aliquam aliquid!
                                    </div>
                                    <div className="flex justify-center items-center grow">
                                        <Search />
                                    </div>
                                </div>
                                <div className="flex line-clamp-3 border-b [&>div]:p-1">
                                    <div className="w-1/3">lorem</div>
                                    <div className="border-x w-1/2 line-clamp-3">
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Nemo recusandae esse
                                        debitis illo perferendis quibusdam
                                        maiores ex molestiae aliquam aliquid!
                                    </div>
                                    <div className="flex justify-center items-center grow">
                                        <Search />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="daily-schedule flex flex-col !bg-teal-700/50 h-fit">
                            <DailySchedule />
                        </div>
                        <div className="others !bg-yellow-700/50 h-fit">
                            <h3 className="dashboard_h3">
                                General announcements
                            </h3>
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
                </div>
            )}
        </>
    );
}
