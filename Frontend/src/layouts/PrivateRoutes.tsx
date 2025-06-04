import { Outlet, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { useEffect } from "react";
import type { User } from "../config/types";
import { api } from "../services/api";

export default function PrivateRoutes() {
    console.log("render private routes");
    const navigate = useNavigate();
    const authUser = useGlobalStore((state) => state.authUser);
    const { setAuthUser } = useGlobalStore((state) => state);

    useEffect(() => {
        const fetchAndSetAuthUser = async () => {
            try {
                const res = await api.get("/api/user");
                const user = res.data as User;
                setAuthUser(user);
            } catch {
                console.log("redirect login");
                navigate("/login");
            }
        };

        fetchAndSetAuthUser();
    }, [setAuthUser, navigate]);

    return authUser ? <Outlet /> : <pre>loading</pre>;
}
