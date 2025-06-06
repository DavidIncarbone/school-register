import { NavLink } from "react-router";

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
        <nav className="bg-blue-300 max-sm:hidden w-1/4 lg:w-1/5">
            <div className="bg-red-300 h-[7%] flex justify-center items-center">
                logo
            </div>
            <div className="bg-green-300 flex flex-col gap-4 p-2">
                {navLinks.map((link, i) => (
                    <NavLink
                        key={i}
                        className="border border-black p-2 rounded-md"
                        to={link.path}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
