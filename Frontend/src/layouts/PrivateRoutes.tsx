import { Outlet, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { useEffect } from "react";
import type { User } from "../config/types";
import { api } from "../services/api";
import Loader from "../components/ui/Loader";
import { useQueryIndexPersonalProfile } from "@/hooks/personalProfile";

export default function PrivateRoutes() {
    // console.log("render private routes");
    const navigate = useNavigate();
    const { authUser, setAuthUser, setIsAuthLoading, setProfile } =
        useGlobalStore();

    const { data: personalProfile } = useQueryIndexPersonalProfile(
        Boolean(authUser)
    );

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

    return authUser ? <Outlet /> : <Loader />;
}
