import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { type Student, type Teacher, type User } from "../config/types";

type Data = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegistrationPage() {
    // global vars
    const authUser = useGlobalStore((state) => state.authUser);
    const setAuthUser = useGlobalStore((state) => state.setAuthUser);
    // vars
    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [profile, setProfile] = useState<Teacher | Student | null>(null);

    // actions
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData.entries()) as Data;

        if (!isEmailVerified) {
            try {
                const res = await api.post("/api/retrieve-teacher", data);
                setProfile(res.data as Teacher);
                setIsEmailVerified(true);
            } catch (err: unknown) {
                console.error(err);
            }
        } else {
            try {
                if (profile?.email && profile.first_name && profile.last_name) {
                    data = {
                        ...data,
                        email: profile.email,
                        name: `${profile.first_name} ${profile.last_name}`,
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
                    <h2 className="capitalize text-3xl text-center">
                        Register
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
                                        profile?.first_name &&
                                        profile?.last_name &&
                                        `${profile.first_name} ${profile.last_name}`
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
                                    profile?.email ? profile.email : ""
                                }
                                id="email"
                                name="email"
                                required
                            />
                        </div>

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
                                        Conferma password
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
                        {!isEmailVerified ? (
                            <button type="submit">Verifica email</button>
                        ) : (
                            <button className="" type="submit">
                                Abilita account
                            </button>
                        )}
                    </form>
                </div>
            </div>
        )
    );
}
