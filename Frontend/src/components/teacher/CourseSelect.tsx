import type { Course } from "@/config/types";
import type { ChangeEvent } from "react";

export const CourseSelect = ({
  courses,
  queryParams,
  onChange,
}: {
  courses: Course[] | undefined;
  queryParams: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-2 font-bold">
      <p>Selected course:</p>
      <select
        onChange={onChange}
        name="course_id"
        className="no-default w-fit capitalize italic cursor-pointer"
      >
        <option selected disabled hidden>
          Select course
        </option>
        {courses &&
          courses.map((course) => (
            <option
              selected={Number(queryParams?.course_id) === course.id}
              key={course.id}
              value={course.id}
              className="text-base not-italic"
            >
              {course.name}
            </option>
          ))}
      </select>
    </div>
  );
};
