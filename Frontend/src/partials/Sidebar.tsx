import { Calendar } from "@/components/ui/calendar";
import { useGlobalStore } from "@/store/useGlobalStore";
import { Bot, ChevronLeft, PanelLeftOpen } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function Sidebar() {
    // * global store
    const { sidebarHidden, toggleSidebar } = useGlobalStore();

    // * views
    return (
        <>
            <nav
                className={`${
                    sidebarHidden &&
                    "lg:!w-0 [&>*]:opacity-0 [&>*]:pointer-events-none [&>*]:-translate-x-32"
                } transition-all duration-500 [&>*]:duration-500 bg-[#25282d] max-lg:hidden lg:w-1/6 sticky h-screen top-0 left-0 z-50`}
            >
                <div
                    className={`${
                        sidebarHidden && "!translate-x-2"
                    } h-16 flex !opacity-100 !pointer-events-auto gap-4  relative z-50`}
                >
                    <Link
                        to="/"
                        className="h-full flex items-center gap-2 grow capitalize font-bold text-2xl tracking-wider font-serif px-2"
                    >
                        <Bot className={`size-15`} />
                        <span>achsios</span>
                    </Link>
                    <div className={`transition-all flex items-center pr-4`}>
                        <PanelLeftOpen
                            onClick={toggleSidebar}
                            className={`${
                                sidebarHidden && "rotate-y-0"
                            } transition-all size-6 cursor-pointer opacity-70 hover:opacity-100 -rotate-y-180`}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Calendar
                        mode="single"
                        className="rounded-lg border bg-primary scale-70 2xl:scale-80"
                    />
                </div>
                <div className="flex flex-col gap-4 p-2">
                    {navLinks.map((link, i) => (
                        <NavLink
                            key={i}
                            className="border-b p-2 mx-4"
                            to={link.path}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
}

const navLinks = [
    {
        path: "/",
        label: "prova",
    },
    {
        path: "/",
        label: "prova",
    },
    {
        path: "/",
        label: "prova",
    },
    {
        path: "/",
        label: "prova",
    },
];
