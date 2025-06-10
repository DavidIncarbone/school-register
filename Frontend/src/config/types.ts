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

export type Course = {
    id: number;
    name: string;
    description: string;
    students_count: number;
};

export type Presence = {
    id: number;
    student_id: number;
    is_present: boolean;
    date: string;
};

export type SearchStudentsParams = {
    course_id?: number;
    first_name?: string;
    last_name?: string;
    sort?: string;
    dir?: string;
};
