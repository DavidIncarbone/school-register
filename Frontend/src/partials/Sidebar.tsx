import { Calendar } from "@/components/ui/calendar";
import { Bot } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function Sidebar() {
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

    return (
        <>
            <nav className="bg-[#25282d] max-lg:hidden lg:w-1/6 sticky h-screen top-0 left-0">
                <Link to="/" className="h-16 flex justify-center items-center">
                    <div className="h-11/12 aspect-square">
                        <Bot className="size-full" />
                    </div>
                    {/* <img src="/logo.png" alt="logo" className="h-full object-contain"/> */}
                </Link>
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
