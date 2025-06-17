// src/components/auth/RequireRole.tsx
import type { UserType } from "@/config/types";
import { useGlobalStore } from "@/store/useGlobalStore";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
    role: UserType;
    children: ReactNode;
};

export const RequireRole = ({ role, children }: Props) => {
    const { authUser, isAuthLoading } = useGlobalStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthLoading && authUser && authUser.type !== role) {
            navigate("/unauthorized");
        }
    }, [authUser, isAuthLoading, role, navigate]);

    if (isAuthLoading) return <p>Caricamento...</p>;

    if (authUser?.type === role) {
        return <>{children}</>;
    }

    return null; // no flickering
};
