import { PaginationComp } from "@/components/PaginationComp";
import { SubjectSelect } from "@/components/student/SubjectSelect";
import { AddAssignment } from "@/components/teacher/assignmentPage/AddAssignment";
import { AssignmentHead } from "@/components/teacher/assignmentPage/AssignmentHead";
import { AssignmentRecord } from "@/components/teacher/assignmentPage/AssignmentRecord";
import { CourseSelect } from "@/components/teacher/CourseSelect";
import DeleteModalAssignment from "@/components/ui/modal";
import { SkeleAssignmentsList } from "@/components/ui/SkeleAssignmentsList";
import {
    SortOptionAssignment,
    UserType,
    type Assignment,
    type Course,
    type Subject,
} from "@/config/types";
import {
    useMutationDestroyAssignment,
    useQueryIndexAssignment,
} from "@/hooks/assignmentsQueries";
import { useQueryIndexCourse } from "@/hooks/coursesQueries";
import { useQueryIndexSubjects } from "@/hooks/subjectsQueries";
import { useDynamicSearchParams } from "@/hooks/useDynamicSearchParams";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";
import { SquareMinus, SquarePlus } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import toast from "react-hot-toast";

export const AssignmentsPage = () => {
    // * global store
    const { authUser } = useGlobalStore();
    // * custom hooks
    const { queryParams, updateSearchParams } = useDynamicSearchParams();
    // vars
    const [isFormShowing, setIsFormShowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [assignmentId, setAssignmentId] = useState(0);
    const [assignmentBody, setAssignmentBody] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [sortingCols, setSortingCols] = useState(initialSortingCols);
    const activeSort =
        queryParams.sort ?? SortOptionAssignment.BY_ASSIGNMENT_DATE;
    const activeDir = queryParams.dir ?? "desc";

    // * queries
    const { data: courses } = useQueryIndexCourse(
        {},
        Boolean(authUser && authUser.type === UserType.TEACHER)
    ) as UseQueryResult<Course[], Error>;

    const { data: subjects } = useQueryIndexSubjects(
        Boolean(authUser && authUser.type === UserType.STUDENT)
    ) as UseQueryResult<Subject[], Error>;

    const {
        data: assignments,
        isLoading: isAssigmentsLoading,
        isError: isAssigmentsError,
    } = useQueryIndexAssignment(
        queryParams,
        "course_id" in queryParams || "subject_id" in queryParams
    ) as UseQueryResult<
        {
            data: Assignment[];
            current_page: number;
            last_page: number;
        },
        Error
    >;

    const {
        mutate: destroyMutate,
        isSuccess: isDestroySuccess,
        isPending: isDestroyPending,
    } = useMutationDestroyAssignment(queryParams);

    // * hardcoded vars
    const isPrevBtnDisabled = Boolean(
        assignments && assignments.current_page <= 1
    );
    const isNextBtnDisabled = Boolean(
        assignments && assignments.current_page >= assignments.last_page
    );

    // * actions
    const handleForm = () => setIsFormShowing(!isFormShowing);

    const destroyAssignment = async (assignmentId: number) => {
        console.log("destroy");
        destroyMutate(assignmentId);
    };

    const handleSortingColClick = (e: MouseEvent<HTMLDivElement>): void => {
        const key = "sort";
        const col = sortingCols.find((col) => col.sort === e.currentTarget.id);
        if (!col) return;
        updateSearchParams([
            { key, value: col.sort },
            { key: "dir", value: col.dir === "desc" ? "asc" : "desc" },
        ]);
        setSortingCols((curr) =>
            curr.map((c) =>
                c.sort === col.sort
                    ? { ...c, dir: c.dir === "desc" ? "asc" : "desc" }
                    : c
            )
        );
    };

    const fetchPrevPage = () => {
        if (assignments) {
            if (assignments.current_page > 1) {
                updateSearchParams([
                    {
                        key: "page",
                        value: String(assignments?.current_page - 1),
                    },
                ]);
            }
        }
    };

    const fetchNextPage = () => {
        if (assignments) {
            if (assignments.current_page < assignments.last_page) {
                updateSearchParams([
                    {
                        key: "page",
                        value: String(assignments?.current_page + 1),
                    },
                ]);
            }
        }
    };

    const fetchSpecificPage = (page: number) => {
        if (assignments) {
            updateSearchParams([
                {
                    key: "page",
                    value: String(page),
                },
            ]);
        }
    };

    // * side effects
    useEffect(() => {
        if (
            authUser &&
            authUser.type === UserType.TEACHER &&
            courses &&
            !("course_id" in queryParams)
        ) {
            updateSearchParams([
                { key: "course_id", value: String(courses[0].id) },
            ]);
        } else if (
            authUser &&
            authUser.type === UserType.STUDENT &&
            subjects &&
            !("subject_id" in queryParams)
        ) {
            updateSearchParams([
                { key: "subject_id", value: String(subjects[0].id) },
            ]);
        }
    }, [authUser, courses, subjects, queryParams, updateSearchParams]);

    useEffect(() => {
        if (isFormShowing) {
            const form = document.getElementById("formSection");
            form?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [isFormShowing]);

    useEffect(() => {
        if (isDestroySuccess) {
            toast.success("Assignment deleted succesfully");
            setIsOpen(false);
        }
    }, [isDestroySuccess]);

    // * views
    if (isAssigmentsError) return <pre>assignment error - da gestire</pre>;
    return (
        <>
            <div className="px-5 py-2 lg:w-4/5 mx-auto">
                {/* headings */}
                <h1 className="title_h1 text-center">assignments</h1>
                <div className="flex justify-between items-center w-full mb-1">
                    {authUser?.type === UserType.TEACHER ? (
                        <div className="space-x-1 font-semibold">
                            <span>Select course:</span>
                            <CourseSelect
                                courses={courses}
                                queryParams={queryParams}
                                updateSearchParams={updateSearchParams}
                            />
                        </div>
                    ) : authUser?.type === UserType.STUDENT ? (
                        <div className="space-x-1 font-semibold">
                            <span>Select subject:</span>
                            <SubjectSelect
                                subjects={subjects}
                                queryParams={queryParams}
                                updateSearchParams={updateSearchParams}
                            />
                        </div>
                    ) : null}

                    {authUser?.type === UserType.TEACHER && (
                        <button title="Add an assignment">
                            {isFormShowing ? (
                                <SquareMinus
                                    onClick={handleForm}
                                    className="size-8 scale-90 hover:scale-100 transition-transform cursor-pointer"
                                />
                            ) : (
                                <SquarePlus
                                    onClick={handleForm}
                                    className="size-8 scale-90 hover:scale-100 transition-transform cursor-pointer"
                                />
                            )}
                        </button>
                    )}
                </div>

                {/* add assignment form */}
                {isFormShowing && (
                    <section id="formSection" className="mb-5">
                        <AddAssignment
                            courses={courses}
                            queryParams={queryParams}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setIsFormShowing={setIsFormShowing}
                        />
                    </section>
                )}

                {/* assignments list (per corso) */}
                <div className="max-lg:w-[92dvw] mx-auto overflow-auto">
                    <div className="min-w-[1000px]">
                        <AssignmentHead
                            sortingCols={sortingCols}
                            activeDir={activeDir}
                            activeSort={activeSort}
                            onClick={handleSortingColClick}
                        />
                        {!assignments || isAssigmentsLoading ? (
                            <SkeleAssignmentsList />
                        ) : (
                            <div className="rounded-b-sm overflow-hidden">
                                {assignments.data.map((as) => (
                                    <AssignmentRecord
                                        key={as.id}
                                        assignment={as}
                                        // destroyAssignment={destroyAssignment}
                                        // isDestroyPending={isDestroyPending}
                                        setIsOpen={setIsOpen}
                                        setAssignmentId={setAssignmentId}
                                        setAssignmentBody={setAssignmentBody}
                                        queryParams={queryParams}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* pagination */}
                <div className="mt-4">
                    <PaginationComp
                        currentPage={assignments?.current_page}
                        lastPage={assignments?.last_page}
                        fetchPrevPage={fetchPrevPage}
                        fetchNextPage={fetchNextPage}
                        fetchSpecificPage={fetchSpecificPage}
                        isPrevBtnDisabled={isPrevBtnDisabled}
                        isNextBtnDisabled={isNextBtnDisabled}
                    />
                </div>

                {/* ux mobile */}
                <p className="mt-6 text-xs landscape:hidden">
                    Rotate the device for better visualization
                </p>
            </div>
            <DeleteModalAssignment
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                destroyAssignment={destroyAssignment}
                assignmentId={assignmentId}
                assignmentBody={assignmentBody}
                isDestroyPending={isDestroyPending}
            />
        </>
    );
};

const initialSortingCols = [
    {
        label: "Start",
        sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
        dir: "desc",
        className: "w-40 flex justify-center items-center p-2",
    },
    {
        label: "Deadline",
        sort: SortOptionAssignment.BY_DEADLINE,
        dir: "desc",
        className: "flex justify-center items-center p-2",
    },
    {
        label: "Body",
        sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
        dir: "asc",
        className: "col-span-4 flex justify-center items-center p-2",
    },
    {
        label: "Actions",
        sort: SortOptionAssignment.BY_ASSIGNMENT_DATE,
        dir: "asc",
        className: "flex justify-center items-center p-2",
    },
];
