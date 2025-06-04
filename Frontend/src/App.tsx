import { Route, Routes, useNavigate } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { api } from "./services/api";
import PrivateRoutes from "./layouts/PrivateRoutes";
import RegistrationPage from "./pages/RegistrationPage";
import { useGlobalStore } from "./store/useGlobalStore";
import type { User } from "./config/types";

function App() {
    console.log("render app");
    const navigate = useNavigate();
    const setAuthUser = useGlobalStore((state) => state.setAuthUser);
    const setIsAuthLoading = useGlobalStore((state) => state.setIsAuthLoading);

    // collaterals effect
    useEffect(() => {
        const fetchCsrfCookie = async () => {
            try {
                await api.get("/sanctum/csrf-cookie");
            } catch (err) {
                console.error(err);
            }
        };

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
        // chiamato solo al primo render
        fetchCsrfCookie();
        fetchAndSetUser();
    }, []);

    return (
        <Routes>
            <Route path="/" Component={DefaultLayout}>
                {/* pagine senza auth */}
                <Route path="/login" Component={LoginPage} />
                <Route path="/register" Component={RegistrationPage} />

                {/* pagine con auth */}
                <Route Component={PrivateRoutes}>
                    <Route index Component={Homepage} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
