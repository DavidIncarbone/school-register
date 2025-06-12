import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { api } from "./services/api";
import PrivateRoutes from "./layouts/PrivateRoutes";
import RegistrationPage from "./pages/RegistrationPage";
import PublicRoutes from "./layouts/PublicRoutes";
import Homepage from "./pages/Homepage";
import SearchStudentsPage from "./pages/teacher/SearchStudentsPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { AttendanceFormPage } from "./pages/teacher/AttendanceFormPage";
import { WeeklySchedulePage } from "./pages/WeeklySchedulePage";

function App() {
    // collaterals effect
    useEffect(() => {
        const fetchCsrfCookie = async () => {
            try {
                await api.get("/sanctum/csrf-cookie");
            } catch (err) {
                console.error(err);
            }
        };
        fetchCsrfCookie();
    }, []);

    return (
        <Routes>
            <Route path="/" Component={DefaultLayout}>
                {/* pagine con auth */}
                <Route Component={PrivateRoutes}>
                    <Route index Component={Homepage} />
                    <Route
                        path="/teacher/search-students"
                        Component={SearchStudentsPage}
                    />
                    <Route path="/course/:id" Component={CourseDetailPage} />
                    <Route path="/student/:id" Component={StudentDetailPage} />
                    <Route
                        path="/attendance-form"
                        Component={AttendanceFormPage}
                    />
                    <Route path="/weekly-schedule" Component={WeeklySchedulePage} />
                </Route>

                {/* pagine senza auth */}
                <Route Component={PublicRoutes}>
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/register" Component={RegistrationPage} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
