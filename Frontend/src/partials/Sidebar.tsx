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
        <>
            <nav className="bg-[#25282d] max-lg:hidden lg:w-1/7 fixed h-screen top-0 left-0">
                <div className="h-16 flex justify-center items-center">
                    logo
                </div>
                <div className="flex flex-col gap-4 p-2">
                    {navLinks.map((link, i) => (
                        <NavLink
                            key={i}
                            className="border p-2 rounded-md"
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
