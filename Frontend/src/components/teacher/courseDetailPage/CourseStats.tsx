import type { Course } from "@/config/types";
import { StatCard } from "./StatCard";

export const CourseStats = ({
    course,
    cachedCourse,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
}) => {
    return (
        <div className="grid grid-cols-3 h-fit gap-4 lg:gap-8 [&>div]:rounded-md">
            <StatCard
                value={course?.subjects_count}
                label="Total subjects"
                color="bg-blue-700"
            />

            <StatCard
                value={course?.teachers_count}
                label="Total teachers"
                color="bg-emerald-700"
            />

            <StatCard
                value={cachedCourse?.students_count ?? course?.students_count}
                label="Total students"
                color="bg-amber-700"
            />

            <StatCard
                value={course?.total_presence}
                label="Total attendance"
                color="bg-slate-700"
            />

            <StatCard
                value={course?.presences_percentage}
                label="Attendance Rate"
                color="bg-fuchsia-700"
            />
        </div>
    );
};