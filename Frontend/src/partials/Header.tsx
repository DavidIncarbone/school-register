import { api } from "../services/api";
import { useGlobalStore } from "../store/useGlobalStore";
import { Link, useNavigate } from "react-router";
import { Bell, Bot, Calendar, LogOut, Megaphone } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import { useState } from "react";

export default function Header() {
    // * global store
    const { authUser, setAuthUser, setProfile, sidebarHidden, profile } =
        useGlobalStore();
    // * vars
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const user = authUser;

    // * actions
    const handleLogout = async () => {
        setAuthUser(null);
        setProfile(null);
        navigate("/login");
        try {
            setIsLoading(true);
            await api.post("/logout");
            toast.success(`See you later ${user?.name}`);
        } catch (err) {
            console.error(err);
        } finally {
            queryClient.clear(); // elimina tutte le cache e tutte le queries
            setIsLoading(false);
        }
    };

    return (
        <header
            className={`${
                !authUser && "justify-end"
            } max-md:justify-between h-16 sticky top-0 bg-[#1e2125] flex z-40`}
        >
            <Link
                to="/"
                className="md:hidden flex items-center gap-4 capitalize font-bold text-xl tracking-wider font-serif px-3"
            >
                <Bot className={`scale-150`} />
                <span>achsios</span>
            </Link>
            {authUser && (
                <>
                    <div
                        className={`${
                            sidebarHidden && "lg:translate-x-64"
                        } transition-transform duration-500 max-sm:hidden flex items-center grow px-4`}
                    >
                        <input
                            type="text"
                            className="w-full md:w-[300px] lg:w-[350px]"
                            placeholder="Search for something..."
                        />
                    </div>
                </>
            )}

            <div className="flex items-center gap-3 md:gap-4 px-4">
                {authUser ? (
                    isLoading ? (
                        <Loader isContained={true} />
                    ) : (
                        <>
                            <div className="flex items-center gap-4 md:gap-6 mr-2 md:mr-4">
                                <Calendar className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                                <Megaphone className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                                <Bell className="size-6 scale-90 hover:scale-100 cursor-pointer opacity-70 hover:opacity-100 transition-all" />
                            </div>
                            <div
                                onClick={() => navigate("/")}
                                className="w-10 aspect-square border rounded-full overflow-hidden flex justify-center items-center"
                            >
                                <img
                                    src="/avatar.jpg"
                                    alt="avatar"
                                    className="w-11/12 h-11/12 object-cover"
                                />
                            </div>
                            <div className="max-md:hidden flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="capitalize">
                                        {profile?.first_name}{" "}
                                        {profile?.last_name}
                                    </span>
                                    {authUser.type === "student" ? (
                                        <span className="text-xs">student</span>
                                    ) : (
                                        <span className="text-xs">
                                            <span className="capitalize">
                                                {profile?.subject_name}
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
                    )
                ) : (
                    <Link to="/login">Sign in</Link>
                )}
            </div>
        </header>
    );
}
