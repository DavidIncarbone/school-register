import { Link } from "react-router";
import { UserType } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../components/ui/Loader";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CoursesList } from "@/components/teacher/CoursesList";

export default function Homepage() {
    // global store
    const { authUser } = useGlobalStore((state) => state);

    const [date, setDate] = useState<Date | undefined>(new Date());

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
                <div className="flex flex-col min-h-full sm:h-full">
                    <div className="teacher-dashboard">
                        <h1 className="title text-2xl font-bold px-5 pt-5">
                            Teacher Dashboard
                        </h1>
                        <div className="info flex justify-center items-center">
                            <Link
                                to="/teacher/search-students"
                                role="button"
                                className="btn"
                            >
                                I tuoi studenti
                            </Link>
                            <Link
                                to="/attendance-form"
                                role="button"
                                className="btn"
                            >
                                L'appello di oggi
                            </Link>
                        </div>

                        <div className="big overflow-hidden">
                            <CoursesList />
                        </div>
                        <div className="calendar flex justify-center items-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border bg-primary sm:scale-80 lg:scale-100"
                            />
                        </div>
                        <div className="others"></div>
                    </div>
                </div>
            )}
        </>
    );
}
