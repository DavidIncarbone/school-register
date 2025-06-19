import { UserType } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../components/ui/Loader";
import { TeacherDashboard } from "@/components/teacher/dashboardPage/TeacherDashboard";
import { StudentDashboard } from "@/components/student/dashboardPage/StudentDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

// todo: valutare poi di differenziare la logica in base a user.type
export default function DashboardPage() {
  // * global store
  const { authUser } = useGlobalStore();

  // * views
  if (!authUser) return <Loader />;

  return (
    <div className="flex flex-col min-h-full py-2">
      <h1 className="title_h1 px-5 py-1">
        {authUser.type === UserType.STUDENT ? "Student" : "Teacher"} Dashboard
      </h1>
      {authUser.type === UserType.STUDENT ? (
        <StudentDashboard />
      ) : authUser.type === UserType.TEACHER ? (
        <TeacherDashboard />
      ) : (
        authUser.type === UserType.ADMIN && <AdminDashboard />
      )}
    </div>
  );
}
