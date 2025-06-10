import { Outlet, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { useEffect } from "react";
import type { User } from "../config/types";
import { api } from "../services/api";
import Loader from "../components/ui/Loader";

export default function PrivateRoutes() {
    // console.log("render private routes");
    const navigate = useNavigate();
    const { authUser, setAuthUser, setIsAuthLoading } = useGlobalStore(
        (state) => state
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

    return authUser ? <Outlet /> : <Loader />;
}
