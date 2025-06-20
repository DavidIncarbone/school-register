import type { Course, IndexAssignmentsParams } from "@/config/types";
import type { ChangeEvent } from "react";

export const CourseSelect = ({
    courses,
    queryParams,
    cb,
    // onChange,
    updateSearchParams,
}: {
    courses: Course[] | undefined;
    queryParams: IndexAssignmentsParams;
    cb?: () => void;
    // onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    updateSearchParams: (params: { key: string; value: string }[]) => void;
}) => {

    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const key = "course_id";
        const selectedCourseId = e.target.value;
        updateSearchParams([{ key, value: selectedCourseId }]);
        if (cb) cb();
    };
    
    return (
        <>
            <select
                onChange={handleCourseSelected}
                name="course_id"
                className="no-default w-fit capitalize italic cursor-pointer"
            >
                <option selected disabled hidden>
                    Select course
                </option>
                {courses &&
                    courses.map((course) => (
                        <option
                            selected={
                                Number(queryParams?.course_id) === course.id
                            }
                            key={course.id}
                            value={course.id}
                            className="text-base not-italic"
                        >
                            {course.name}
                        </option>
                    ))}
            </select>
        </>
    );
};
