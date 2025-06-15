import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";

export const TeacherAssignmentsPage = () => {
    const {
        data: assignments,
        isLoading: isAssigmentsLoading,
        isError: isAssigmentsError,
    } = useQueryIndexAssignment({ course_id: 1 });

    // ! pagina solo per teacher => creare teacher route wrapper !

    console.log(assignments);

    return <div>TeacherHomeworksPage</div>;
};
