import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { UserType, type User } from "../config/types";

type Data = {
    name: string;
    email: string;
    type: UserType;
    password: string;
    password_confirmation: string;
};

type TempUser = {
    first_name: string;
    last_name: string;
    email: string;
    type: UserType;
};

export default function RegistrationPage() {
    // global vars
    const { authUser, setAuthUser } = useGlobalStore();
    // vars
    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [tempUser, setTempUser] = useState<TempUser | null>(null);

    // actions
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData.entries()) as Data;

        if (!isEmailVerified) {
            try {
                const res = await api.post("/api/retrieve-temp-user", data);
                let tempUser: TempUser = res.data;
                tempUser = { ...tempUser, type: data.type };
                setTempUser(tempUser);
                setIsEmailVerified(true);
            } catch (err: unknown) {
                console.error(err);
            }
        } else {
            try {
                if (tempUser) {
                    data = {
                        ...data,
                        email: tempUser.email,
                        name: `${tempUser.first_name} ${tempUser.last_name}`,
                        type: tempUser.type,
                    };
                }
                console.log(data);
                await api.post("/register", data);
                const res = await api.get("/api/user");
                setAuthUser(res.data as User);
                navigate("/");
            } catch (err: unknown) {
                console.error(err);
            }
        }
    };

    return (
        !authUser && (
            <div className="h-full flex justify-center items-center">
                <div className="auth-form">
                    <h2 className="text-3xl text-center capitalize">
                        <span>{tempUser?.type}</span> <span>registration</span>
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {isEmailVerified && (
                            <div className="flex flex-col space-y-0.5">
                                <label htmlFor="name">Name</label>
                                <input
                                    disabled={isEmailVerified}
                                    className={`${
                                        isEmailVerified && "cursor-not-allowed"
                                    }`}
                                    type="name"
                                    defaultValue={
                                        tempUser?.first_name &&
                                        tempUser?.last_name &&
                                        `${tempUser.first_name} ${tempUser.last_name}`
                                    }
                                    id="name"
                                    name="name"
                                    required
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className="flex flex-col space-y-0.5">
                            <label htmlFor="email">Email</label>
                            <input
                                disabled={isEmailVerified}
                                className={`${
                                    isEmailVerified && "cursor-not-allowed"
                                }`}
                                type="email"
                                placeholder="example@example.com"
                                defaultValue={
                                    tempUser?.email ? tempUser.email : ""
                                }
                                id="email"
                                name="email"
                                required
                            />
                        </div>

                        {!isEmailVerified && (
                            <div className="flex flex-col space-y-0.5">
                                <label htmlFor="type">Role</label>
                                <select id="type" name="type" required>
                                    <option value="" selected disabled hidden>
                                        Select your role
                                    </option>
                                    <option value={UserType.STUDENT}>
                                        Student
                                    </option>
                                    <option value={UserType.TEACHER}>
                                        Teacher
                                    </option>
                                </select>
                            </div>
                        )}

                        {isEmailVerified && (
                            <>
                                <div className="flex flex-col space-y-0.5">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        // defaultValue="ciaociao"
                                        name="password"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-0.5">
                                    <label htmlFor="password_confirmation">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="password_confirmation"
                                        // defaultValue="ciaociao"
                                        name="password_confirmation"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {/* {isEmailVerified && (
                            <>
                                <input type="checkbox" />
                            </>
                        )} */}
                        {!isEmailVerified ? (
                            <button type="submit">Verify email</button>
                        ) : (
                            <>
                                <div className="flex items-center space-x-1">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        required
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-xs italic"
                                    >
                                        <span>Accept</span>{" "}
                                        <a
                                            href="https://google.com"
                                            target="_blank"
                                            className="  underline underline-offset-2 hover:text-blue-400"
                                        >
                                            Terms and Condition
                                        </a>
                                    </label>
                                </div>
                                <button className="" type="submit">
                                    Enable account
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        )
    );
}
