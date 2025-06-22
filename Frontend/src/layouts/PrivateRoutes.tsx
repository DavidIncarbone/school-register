import { Outlet, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { useEffect } from "react";
import type { User } from "../config/types";
import { api } from "../services/api";
import Loader from "../components/ui/Loader";
import { useQueryIndexPersonalProfile } from "@/hooks/personalProfileQueries";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import toast from "react-hot-toast";
declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}
window.Pusher = Pusher;

export default function PrivateRoutes() {
    // * global store
    const {
        authUser,
        setAuthUser,
        setIsAuthLoading,
        setProfile,
        echo,
        setEcho,
        queryClient,
        setIsGeneralNotifsOpen,
    } = useGlobalStore();

    // * vars
    const navigate = useNavigate();

    // * queries
    const { data: personalProfile } = useQueryIndexPersonalProfile(
        Boolean(authUser)
    );

    // * side effects
    useEffect(() => {
        if (authUser) {
            setEcho(
                new Echo({
                    broadcaster: "reverb",
                    key: import.meta.env.VITE_REVERB_APP_KEY,
                    wsHost: import.meta.env.VITE_REVERB_HOST,
                    wsPort: import.meta.env.VITE_REVERB_PORT || 80,
                    wssPort: import.meta.env.VITE_REVERB_PORT || 443,
                    forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",
                    disableStats: true,
                    enabledTransports: ["ws", "wss"],
                    // authEndpoint: "http://localhost:8000/broadcasting/auth",
                    authorizer: (channel) => {
                        return {
                            authorize: async (socketId, callback) => {
                                try {
                                    const response = await api.post(
                                        "http://localhost:8000/broadcasting/auth",
                                        {
                                            socket_id: socketId,
                                            channel_name: channel.name,
                                        },
                                        {
                                            withCredentials: true, // fondamentale per inviare cookie!
                                        }
                                    );
                                    // Nessun errore: passa null come primo argomento
                                    callback(null, response.data);
                                } catch (error) {
                                    console.error(
                                        "❌ Authorization error:",
                                        error
                                    );
                                    // Errore: primo argomento è un'istanza di Error
                                    callback(
                                        new Error("Authorization failed"),
                                        null
                                    );
                                }
                            },
                        };
                    },
                })
            );
        }
    }, [authUser, setEcho]);

    useEffect(() => {
        if (authUser && echo) {
            echo.join("room.1").listen("AnnouncementSent", () => {
                toast.success("New Announcement", {
                    icon: "🔔",
                    style: { background: "#fff4d4", color: "#c38521" },
                    duration: 5000,
                });
                queryClient?.invalidateQueries({ queryKey: ["announcements"] });
                setIsGeneralNotifsOpen(true);
            });
        }

        return () => {
            if (authUser && echo) echo.leave(`room.1`);
        };
    }, [echo, authUser, queryClient]);

    useEffect(() => {
        const fetchAndSetAuthUser = async () => {
            try {
                const res = await api.get("/api/user");
                const user = res.data as User;
                setAuthUser(user);
            } catch {
                navigate("/login");
            } finally {
                setIsAuthLoading(false);
            }
        };

        if (!authUser) {
            fetchAndSetAuthUser();
        }
    }, []);

    useEffect(() => {
        if (personalProfile) {
            setProfile(personalProfile);
        }
    }, [personalProfile, setProfile]);

    // * views
    return authUser ? <Outlet /> : <Loader />;
}
