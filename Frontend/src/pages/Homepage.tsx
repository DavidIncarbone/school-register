import { useEffect } from "react";
import { api } from "../services/api";
import type { FormEvent } from "react";

export default function Homepage() {
    // vars, let const ... ...

    // actions
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: "admin@example.com",
            password: "11111111",
        };
        try {
            await api.post("/login", data);
            console.log("Login riuscito");
        } catch (err: unknown) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            console.log("Logout riuscito");
        } catch (err) {
            console.error(err);
        }
    };

    // collaterals effect
    useEffect(() => {
        const fetchCsrfCookie = async () => {
            await api.get("/sanctum/csrf-cookie");
        };

        // chiamato solo al primo render
        fetchCsrfCookie();
    }, []);

    const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deleniti sequi culpa id eveniet. Voluptate dolores esse officiis ab possimus exercitationem vero voluptatem eaque sed, vitae eum dolorum cupiditate, quo eveniet laborum eligendi quas quis corporis deserunt, molestias fugiat. Iusto recusandae asperiores molestias perferendis sit mollitia sapiente dicta nihil, officiis molestiae magni non velit quaerat odio repellat, ipsam corrupti totam corporis deleniti eos id enim sed. Esse optio ducimus aperiam quo eum nam ex illo porro error amet vero ";

    // view
    return (
        <div className="flex justify-center items-center h-full gap-8">
            <div className="flex flex-col justify-center items-center ">
                <h1 className="mb-2">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-center border p-6 rounded-3xl"
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            defaultValue="admin@example.com"
                            // name="email"
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            defaultValue="11111111"
                            // name="password"
                            required
                        />
                    </div>
                    <button
                        className="px-4 py-2 rounded-md border cursor-pointer"
                        type="submit"
                    >
                        Accedi
                    </button>
                </form>
            </div>

            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md border cursor-pointer"
            >
                Logout
            </button>
            {/* <div title={text} className="line-clamp-2">{text} </div> */}
        </div>
    );
}
