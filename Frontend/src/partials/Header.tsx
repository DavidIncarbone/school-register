import { api } from "../services/api";
import { useGlobalStore } from "../store/useGlobalStore";
import { Link, useNavigate } from "react-router";
import { Bell, Calendar, LogOut, Megaphone } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { authUser, setAuthUser, sidebarHidden, profile } = useGlobalStore();

    const handleLogout = async () => {
        setAuthUser(null);
        navigate("/login");
        try {
            await api.post("/logout");
        } catch (err) {
            console.error(err);
        } finally {
            queryClient.clear();
        }
    };

    return (
        <header
            className={`${
                !authUser && "justify-end"
            } h-16 sticky top-0 bg-[#1e2125] flex flex-wrap z-40`}
        >
            {authUser && (
                <>
                    <div
                        className={`${
                            sidebarHidden && "lg:translate-x-36"
                        } transition-transform duration-500 max-sm:hidden flex items-center grow px-4`}
                    >
                        <input
                            type="text"
                            className="w-full xl:w-[500px]"
                            placeholder="Search for something.."
                        />
                    </div>

                    <div className="flex items-center gap-7 px-4">
                        <Calendar className="size-6" />
                        <Megaphone className="size-6" />
                        <Bell className="size-6" />
                    </div>
                </>
            )}

            <div className="flex items-center gap-2 px-4">
                {authUser && (
                    <div
                        onClick={() => navigate("/")}
                        className="w-12 aspect-square border rounded-full"
                    ></div>
                )}
                <div className="flex items-center gap-7">
                    {profile && authUser ? (
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
                    ) : (
                        <Link to="/login">Sign in</Link>
                    )}
                    {authUser && (
                        <LogOut
                            onClick={handleLogout}
                            className="cursor-pointer"
                        />
                    )}
                </div>
            </div>
        </header>
    );
}
