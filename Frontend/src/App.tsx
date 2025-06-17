import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { api } from "./services/api";
import PrivateRoutes from "./layouts/PrivateRoutes";
import RegistrationPage from "./pages/RegistrationPage";
import PublicRoutes from "./layouts/PublicRoutes";
import DashboardPage from "./pages/DashboardPage";
import SearchStudentsPage from "./pages/teacher/SearchStudentsPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { AttendanceFormPage } from "./pages/teacher/AttendanceFormPage";
import { WeeklySchedulePage } from "./pages/WeeklySchedulePage";
import { Debug } from "./components/Debug";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import { Toaster } from "react-hot-toast";
import { SubjectsPage } from "./pages/student/SubjectsPage";
import { Unauthorized } from "./pages/Unauthorized";
import { RequireRole } from "./components/RequireRole";
import { UserType } from "./config/types";

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

    // return <Debug />;

    return (
        <>
            <Routes>
                <Route path="/" Component={DefaultLayout}>
                    {/* pagine con auth */}
                    <Route Component={PrivateRoutes}>
                        <Route index Component={DashboardPage} />
                        <Route
                            path="/courses/:id"
                            Component={CourseDetailPage}
                        />
                        <Route
                            path="/students/:id"
                            Component={StudentDetailPage}
                        />
                        <Route
                            path="/weekly-schedule"
                            Component={WeeklySchedulePage}
                        />
                        <Route
                            path="/assignments"
                            Component={AssignmentsPage}
                        />
                        <Route
                            path="/search-students"
                            element={
                                <RequireRole role={UserType.TEACHER}>
                                    <SearchStudentsPage />
                                </RequireRole>
                            }
                        />
                        <Route
                            path="/attendance-form"
                            element={
                                <RequireRole role={UserType.TEACHER}>
                                    <AttendanceFormPage />
                                </RequireRole>
                            }
                        />
                        <Route
                            path="/subjects"
                            element={
                                <RequireRole role={UserType.STUDENT}>
                                    <SubjectsPage />
                                </RequireRole>
                            }
                        />
                    </Route>

                    {/* pagine senza auth */}
                    <Route Component={PublicRoutes}>
                        <Route path="/login" Component={LoginPage} />
                        <Route path="/register" Component={RegistrationPage} />
                        <Route path="/unauthorized" Component={Unauthorized} />
                    </Route>
                </Route>
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default App;
