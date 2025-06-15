import { useGlobalStore } from "../store/useGlobalStore";
import { Outlet, useNavigate } from "react-router";
import type { User } from "../config/types";
import { api } from "../services/api";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";

export default function PublicRoutes() {
    // console.log("render public routes");
    const navigate = useNavigate();
    const { isAuthLoading, authUser, setAuthUser, setIsAuthLoading } =
        useGlobalStore();

    useEffect(() => {
        const fetchAndSetUser = async () => {
            try {
                const res = await api.get("/api/user");
                setAuthUser(res.data as User);
                navigate("/");
            } catch (err) {
                console.error(err);
            } finally {
                setIsAuthLoading(false);
            }
        };
        if (!authUser) {
            fetchAndSetUser();
        }
    }, []);
    return !isAuthLoading ? <Outlet /> : <Loader />;
}
