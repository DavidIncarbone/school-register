import { api } from "../services/api";
import { useGlobalStore } from "../store/useGlobalStore";
import { Link, useNavigate } from "react-router";
import { Bell, Calendar, LogOut, Megaphone } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    // * global store
    const { authUser, setAuthUser, sidebarHidden, profile } = useGlobalStore();
    // * vars
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // * actions
    const handleLogout = async () => {
        setAuthUser(null);
        navigate("/login");
        try {
            await api.post("/logout");
        } catch (err) {
            console.error(err);
        } finally {
            queryClient.clear(); // elimina tutte le cache e tutte le queries
        }
    };

    return (
        <header
            className={`${
                !authUser && "justify-end"
            } max-md:justify-end h-16 sticky top-0 bg-[#1e2125] flex flex-wrap z-40`}
        >
            {authUser && (
                <>
                    <div
                        className={`${
                            sidebarHidden && "lg:translate-x-64"
                        } transition-transform duration-500 max-sm:hidden flex items-center grow px-4`}
                    >
                        <input
                            type="text"
                            className="w-full md:w-[300px] lg:w-[400px]"
                            placeholder="Search for something.."
                        />
                    </div>
                </>
            )}

            <div className="flex items-center gap-4 px-4">
                {authUser && profile ? (
                    <>
                        <div className="flex items-center gap-6 mr-4">
                            <Calendar className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                            <Megaphone className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                            <Bell className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                        </div>
                        <div
                            onClick={() => navigate("/")}
                            className="w-12 aspect-square border rounded-full overflow-hidden flex justify-center items-center"
                        >
                            <img src="/avatar.jpg" alt="avatar" className="w-11/12 h-11/12 object-cover"/>
                        </div>
                        <div className="max-md:hidden flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="capitalize">
                                    {profile.first_name} {profile.last_name}
                                </span>
                                {authUser.type === "student" ? (
                                    <span className="text-xs">student</span>
                                ) : (
                                    <span className="text-xs">
                                        <span className="capitalize">
                                            {profile.subject_name}
                                        </span>
                                        <span> teacher</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        <LogOut
                            onClick={handleLogout}
                            className="cursor-pointer"
                        />
                    </>
                ) : (
                    <Link to="/login">Sign in</Link>
                )}
            </div>
        </header>
    );
}
