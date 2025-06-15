import { useGlobalStore } from "../store/useGlobalStore";
import { Outlet, useNavigate } from "react-router";
import type { User } from "../config/types";
import { api } from "../services/api";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";

export default function PublicRoutes() {
    // * global store
    const { isAuthLoading, authUser, setAuthUser, setIsAuthLoading } =
        useGlobalStore();

    // * vars
    const navigate = useNavigate();

    // * side effects
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

    // * views
    return !isAuthLoading ? <Outlet /> : <Loader />;
}
