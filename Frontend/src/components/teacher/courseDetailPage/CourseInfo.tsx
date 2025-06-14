import type { Course } from "@/config/types";

export const CourseInfo = ({
    course,
    cachedCourse,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
}) => {
    return (
        <div className="md:w-1/2 space-y-2">
            <div className="flex gap-6">
                <img src="/logo.png" className="w-36 rounded-lg" />
                <div className="space-y-2">
                    <h1 className="font-bold text-5xl lg:text-6xl capitalize ">
                        {cachedCourse?.name ?? course?.name ?? "Il tuo corso"}
                    </h1>
                    <span className="text-neutral-300">
                        ID: {cachedCourse?.id ?? course?.id ?? " "}
                    </span>
                </div>
            </div>
            <p className="font-semibold">
                {cachedCourse?.description ?? course?.description}
            </p>
        </div>
    );
};