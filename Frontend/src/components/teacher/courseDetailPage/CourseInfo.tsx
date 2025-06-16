import type { Course } from "@/config/types";

export const CourseInfo = ({
    course,
    cachedCourse,
    isLoading,
}: {
    course: Course | undefined;
    cachedCourse: Course | undefined;
    isLoading: boolean;
}) => {
    return (
        <div className="flex gap-6 md:w-1/2">
            <img src="/logo.png" className="object-cover rounded-lg" />
            <div className="space-y-2">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl capitalize ">
                    {cachedCourse?.name ??
                        course?.name ??
                        (isLoading ? (
                            <div className="inline-block dots-loader"></div>
                        ) : (
                            "Il tuo corso"
                        ))}
                </h1>
                <div className="text-neutral-300 text-xs">
                    {cachedCourse?.id || course?.id ? (
                        <>ID: {cachedCourse?.id ?? course?.id}</>
                    ) : isLoading ? (
                        <div className="inline-block w-5 dots-loader"></div>
                    ) : (
                        "ID: "
                    )}
                </div>
                <div className="max-lg:line-clamp-4 max-md:text-sm">
                    {cachedCourse?.description ??
                        course?.description ??
                        (isLoading ? (
                            <div className="inline-block w-5 dots-loader"></div>
                        ) : null)}
                </div>
            </div>
        </div>
    );
};
