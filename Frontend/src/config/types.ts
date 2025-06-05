export enum UserType {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin",
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
};
