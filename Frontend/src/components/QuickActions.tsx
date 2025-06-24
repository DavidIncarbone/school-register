import { UserType } from "@/config/types";
import { useGlobalStore } from "@/store/useGlobalStore";
import {
    BarChart3,
    CalendarDays,
    ClipboardList,
    LayoutList,
    NotebookPen,
    Settings,
    User,
} from "lucide-react";
import { Link } from "react-router";

export const QuickActions = ({
    takeAttendance,
}: {
    takeAttendance: boolean;
}) => {
    // * global store
    const { authUser } = useGlobalStore();

    // * views
    return (
        <>
            {quickActions.map((action, i) => (
                <Link
                    key={i}
                    to={action.path}
                    className={`${
                        action.path === "/attendance-form" && takeAttendance
                            ? "!bg-red-950 animate-pulse"
                            : action.path === "/attendance-form" &&
                              !takeAttendance &&
                              "hidden"
                    } 
                            ${
                                authUser?.type === UserType.STUDENT &&
                                action.path === "/search-students" &&
                                "hidden"
                            }
                            ${
                                authUser?.type === UserType.STUDENT &&
                                action.path === "/teacher-exams" &&
                                "hidden"
                            }
                            ${
                                authUser?.type === UserType.TEACHER &&
                                action.path === "/student-exams" &&
                                "hidden"
                            }
                            max-md:aspect-square h-24 rounded-md bg-slate-900 hover:bg-slate-950 active:bg-black p-2 flex flex-col justify-center items-center text-center text-xs 3xl:text-lg gap-1`}
                >
                    <div>
                        <div
                            className={`${action.iconColor} size-10 3xl:size-15 3xl:[&>*]:scale-125 flex justify-center items-center rounded-sm`}
                        >
                            {action.icon}
                        </div>
                    </div>
                    <div className="max-lg:grow flex items-center">
                        <span
                            className={`${
                                action.label === "Today's Attendance" &&
                                takeAttendance &&
                                "!text-red-500"
                            }`}
                        >
                            {action.label}
                        </span>
                    </div>
                </Link>
            ))}
        </>
    );
};

const quickActions = [
    // ! da gestire ancora
    {
        path: "/attendance-form",
        icon: <ClipboardList />,
        iconColor: "bg-red-700",
        label: "Today's Attendance",
    },
    {
        path: "/",
        icon: <User />,
        iconColor: "bg-lime-500",
        label: "Profile",
    },
    {
        path: "/weekly-schedule",
        icon: <CalendarDays />,
        iconColor: "bg-green-500",
        label: "Weekly schedule",
    },
    {
        path: "/search-students",
        icon: <LayoutList />,
        iconColor: "bg-blue-500",
        label: "Students list",
    },
    {
        path: "/assignments",
        icon: <NotebookPen />,
        iconColor: "bg-amber-500",
        label: "Assignments",
    },
    {
        path: "/teacher-exams",
        icon: <BarChart3 />,
        iconColor: "bg-teal-500",
        label: "Exams",
    },
    {
        path: "/student-exams",
        icon: <BarChart3 />,
        iconColor: "bg-teal-500",
        label: "Exams",
    },
    {
        path: "/",
        icon: <Settings />,
        iconColor: "bg-slate-500",
        label: "Preferences",
    },
];
