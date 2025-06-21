import type { IndexAssignmentsParams, Subject } from "@/config/types";
import type { ChangeEvent } from "react";

export const SubjectSelect = ({
    subjects,
    queryParams,
    cb,
    updateSearchParams,
}: {
    subjects: Subject[] | undefined;
    queryParams: IndexAssignmentsParams;
    cb?: () => void;
    updateSearchParams: (params: { key: string; value: string }[]) => void;
}) => {
    const handleCourseSelected = async (e: ChangeEvent<HTMLSelectElement>) => {
        const key = "subject_id";
        const selectedSubjectId = e.target.value;
        updateSearchParams([{ key, value: selectedSubjectId }]);
        if (cb) cb();
    };

    return (
        <>
            <select
                onChange={handleCourseSelected}
                name="subject_id"
                className="no-default w-fit capitalize italic cursor-pointer"
            >
                <option selected disabled hidden>
                    Select subject
                </option>
                {subjects &&
                    subjects.map((subject, i) => (
                        <option
                            selected={
                                Number(queryParams?.subject_id) === subject.id
                            }
                            key={i}
                            value={subject.id}
                            className="text-base not-italic"
                        >
                            {subject.name}
                        </option>
                    ))}
            </select>
        </>
    );
};
