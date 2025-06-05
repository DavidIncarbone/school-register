import { type FormEvent } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router";
import type { User } from "../config/types";

export default function LoginPage() {
    const navigate = useNavigate();
    // const authUser = useGlobalStore((state) => state.authUser);
    const authUser = useGlobalStore((state) => state.authUser);
    const setAuthUser = useGlobalStore((state) => state.setAuthUser);

    const fetchAndSetUser = async () => {
        const res = await api.get("/api/user");
        setAuthUser(res.data as User);
        navigate("/");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await api.post("/login", data);
            fetchAndSetUser();
        } catch (err: unknown) {
            console.error(err);
        }
    };

    return (
        !authUser && (
            <div className="h-full flex justify-center items-center">
                <div className="auth-form">
                    <h2 className="capitalize text-3xl  text-center">login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-0.5">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="mario@example.com"
                                defaultValue="admin@example.com"
                                id="email"
                                name="email"
                                required
                                autoFocus
                            />
                        </div>
                        <div className="flex flex-col space-y-0.5">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                defaultValue="ciaociao"
                                name="password"
                                required
                            />
                        </div>
                        <button type="submit">Accedi</button>
                    </form>

                    <div className="text-sm space-x-1">
                        <span>Don't have an account?</span>
                        <Link
                            to="/register"
                            className=" text-blue-400 underline-offset-2 hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                    {/* <Link to="" className="block hover:text-blue-400">
                        <small>Sei un insegnante? Clicca qui</small>
                    </Link>
                    <Link to="" className="block hover:text-blue-400">
                        <small>Sei un studente? Clicca qui</small>
                    </Link> */}
                </div>
            </div>
        )
    );
}
