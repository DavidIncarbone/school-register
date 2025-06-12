import { Link } from "react-router";
import { UserType } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../components/ui/Loader";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CoursesList } from "@/components/teacher/CoursesList";
import {
    BarChart3,
    CalendarDays,
    ClipboardList,
    LayoutList,
    NotebookPen,
    Settings,
    User,
} from "lucide-react";

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
                        <div className="info grid grid-cols-3 sm:grid-cols-4 !px-4 gap-4 ">
                            <QuickActions />
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
                        <div className="others">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Itaque exercitationem accusamus ratione rerum
                            dolorum aliquam eum adipisci numquam. Ratione
                            obcaecati asperiores pariatur ab odit impedit
                            tenetur consequuntur, consectetur est rem commodi
                            voluptatem optio adipisci at deserunt, expedita in.
                            Fugit, cum. Eos temporibus commodi atque beatae est
                            sequi, obcaecati perspiciatis nisi.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* <Link to="/attendance-form" role="button" className="btn">
                L'appello di oggi
            </Link> */
const quickActions = [
    // ! da gestire ancora
    {
        path: "/",
        icon: <User />,
        iconColor: "bg-lime-500",
        label: "Profile",
    },
    {
        path: "/attendance-form",
        icon: <ClipboardList />,
        iconColor: "bg-blue-500",
        label: "Today's Attendance",
    },
    {
        path: "/weekly-schedule",
        icon: <CalendarDays />,
        iconColor: "bg-green-500",
        label: "Weekly schedule",
    },
    {
        path: "/teacher/search-students",
        icon: <LayoutList />,
        iconColor: "bg-red-500",
        label: "Students",
    },
    {
        path: "/",
        icon: <BarChart3 />,
        iconColor: "bg-teal-500",
        label: "Exams",
    },
    {
        path: "/",
        icon: <NotebookPen />,
        iconColor: "bg-amber-500",
        label: "Homework",
    },
    {
        path: "/",
        icon: <Settings />,
        iconColor: "bg-slate-500",
        label: "Settings",
    },
];

const QuickActions = () => {
    // global store
    // const { authUser } = useGlobalStore((state) => state);

    return (
        <>
            {quickActions.map((action, i) => (
                <Link
                    key={i}
                    to={action.path}
                    className="rounded-md bg-zinc-900 hover:bg-zinc-950 active:bg-black p-2 max-sm:h-24 flex flex-col justify-center items-center text-center text-xs 3xl:text-lg gap-1"
                >
                    <div>
                        <div
                            className={`${action.iconColor} size-10 3xl:size-16 3xl:[&>*]:scale-150 flex justify-center items-center rounded-sm`}
                        >
                            {action.icon}
                        </div>
                    </div>
                    <div className="grow flex items-center">
                        <h3>{action.label}</h3>
                    </div>
                </Link>
            ))}
        </>
    );
};
