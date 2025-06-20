import type { Grade } from "@/config/types";

export const GradesList = ({ grades }: { grades: Grade[] }) => {
    return (
        <div className=" bg-zinc-800 rounded-sm border">
            {/* head */}
            <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold">
                <div className="border-b col-span-1">ID number</div>
                <div className="border-x border-b col-span-2">student</div>
                <div className="border-b col-span-2">grade</div>
            </div>
            {/* exams */}
            {grades && !grades.length ? (
                <div className="text-center p-2">No results yet</div>
            ) : (
                grades?.map((grade) => (
                    <div
                        key={grade.id}
                        className="grid grid-cols-5 [&>div]:p-2 text-center"
                    >
                        <div className="border-b col-span-1">
                            {grade.student_id}
                        </div>
                        <div className="border-x border-b col-span-2">
                            {grade.student.last_name} {grade.student.first_name}
                        </div>
                        <div className="border-b col-span-2 text-center">
                            {grade.grade}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
