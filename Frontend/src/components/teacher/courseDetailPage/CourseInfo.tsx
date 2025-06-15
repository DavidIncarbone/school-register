import type { Course } from "@/config/types";
import { useGlobalStore } from "@/store/useGlobalStore";

export const CourseInfo = ({
    course,
    cachedCourse,
    isLoading,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
    isLoading: boolean;
}) => {
    const { profile } = useGlobalStore();

    return (
        <div className="flex gap-6 md:w-1/2">
            <img src="/logo.png" className="w-40 object-cover rounded-lg" />
            <div className="space-y-1.5">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl capitalize ">
                    {isLoading ? (
                        <div className="inline-block dots-loader"></div>
                    ) : (
                        cachedCourse?.name ?? course?.name ?? "Il tuo corso"
                    )}
                </h1>
                <div className="text-neutral-300 text-xs">
                    {isLoading ? (
                        <div className="inline-block w-5 dots-loader"></div>
                    ) : (
                        "ID:" + (cachedCourse?.id ?? course?.id ?? " ")
                    )}
                </div>
                <div className="max-lg:line-clamp-4 max-md:text-sm">
                    {isLoading ? (
                        <div className="inline-block w-5 dots-loader"></div>
                    ) : (
                        cachedCourse?.description ?? course?.description
                    )}
                </div>
            </div>
        </div>
    );
};
