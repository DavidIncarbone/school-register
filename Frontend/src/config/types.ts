export enum UserType {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin",
}

export enum SortOption {
    BY_ID = "by_id",
    BY_FIRST_NAME = "by_first_name",
    BY_LAST_NAME = "by_last_name",
    BY_EMAIL = "by_email",
    BY_CREATED_AT = "by_created_at",
    BY_UPDATED_AT = "by_updated_at",
}

export type User = {
    id: number;
    name: string;
    email: string;
    type: UserType;
};

export type Teacher = {
    id: number;
    subject_id: number;
    first_name: string;
    last_name: string;
    email: string;
};

export type Student = {
    id: number;
    course_id: number;
    first_name: string;
    last_name: string;
    email: string;
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
    course_name: string;
    subject_id: number;
    course_id: number;
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
    lesson_time: number;
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
export type IndexLessonAssignmentsParams =
    | {
          course_id?: number;
          sort?: "by_assignment_date" | "by_deadline";
          dir?: "asc" | "desc";
      }
    | {
          subject_id?: number;
          sort?: "by_assignment_date" | "by_deadline";
          dir?: "asc" | "desc";
      };
