export enum UserType {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin",
}

export type SortingCols = {
    label: string;
    sort: string;
    dir: string;
    className?: string;
};

export enum SortOption {
    BY_ID = "by_id",
    BY_FIRST_NAME = "by_first_name",
    BY_LAST_NAME = "by_last_name",
    BY_EMAIL = "by_email",
    BY_CREATED_AT = "by_created_at",
    BY_UPDATED_AT = "by_updated_at",
}

export enum SortOptionAssignment {
    BY_ASSIGNMENT_DATE = "by_assignment_date",
    BY_DEADLINE = "by_deadline",
}

export type User = {
    id: number;
    name: string;
    email: string;
    type: UserType;
};

export type LoginUser = {
    email: string;
    password: string;
};

export type Teacher = {
    id?: number;
    subject_id: string;
    courses_ids: string[];
    first_name: string;
    last_name: string;
    email: string;
    courses?: Course[];
};

export type Student = {
    id: number;
    course_id: number;
    first_name: string;
    last_name: string;
    email: string;
};

export type Profile = (Student & Teacher) & {
    subject_name?: string;
    subject_description?: string;
    course_name?: string;
    course_description?: string;
};

export type Subject = {
    id: number;
    name: string;
    description: string;
};

export type Course = {
    id: number;
    name: string;
    description: string;
    credits: number;
    total_presence: number;
    presences_percentage: string;
    students_count?: number;
    teachers_count?: number;
    subjects_count?: number;
    students?: Student[];
    teachers?: Teacher[];
    subjects?: Subject[];
};

export type Presence = {
    id: number;
    student_id: number;
    is_present: boolean;
    date: string;
    student_first_name: string;
    student_last_name: string;
    student_email: string;
};

export type LessonSchedule = {
    subject_name: string;
    course_name: string;
    subject_id: number;
    course_id: number;
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
    lesson_time: number;
};

export type Assignment = {
    id?: number;
    course_id: number;
    subject_id?: number;
    body: string;
    assignment_date: string;
    deadline: string;
    subject: Subject;
    course: Course;
};

export type Exam = {
    id: number;
    course_id: number;
    subject_id: number;
    topic: string;
    date: string;
};

export type Grade = {
    id: number;
    exam_id: number;
    student_id: number;
    grade: string;
    exam: Exam;
    student?: Student;
};

export type GradesAvg = {
    subject_name: string;
    average_grade: number;
};

export type IndexStudentParams = {
    course_id?: number;
    first_name?: string;
    last_name?: string;
    sort?: string;
    dir?: string;
};

export type IndexPresenceParams = {
    student_id?: number;
    course_id?: number;
    date?: string;
};

export type IndexLessonScheduleParams = {
    show_week?: number;
};

export type IndexAssignmentsParams = {
    course_id?: number;
    subject_id?: number;
    sort?: "by_assignment_date" | "by_deadline";
    dir?: "asc" | "desc";
};

export type ExamsParams = {
    course_id?: number;
    topic?: string;
    date?: string;
    dir?: "asc" | "desc";
};

export type GradesParams = {
    exam_id?: number;
    subject_id?: number;
};

// ***** ADMIN *****

export type IndexTeachersParams = {
    course_id?: number;
    subject_id?: number;
    sort?: "by_assignment_date" | "by_deadline";
    dir?: "asc" | "desc";
};

export enum SortOptionAdminTeacher {
    BY_FIRST_NAME = "by_first_name",
    BY_LAST_NAME = "by_last_name",
    BY_EMAIL = "by_email",
}
