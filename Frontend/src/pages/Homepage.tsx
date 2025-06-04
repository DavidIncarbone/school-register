export default function Homepage() {
    // vars, let const ... ...

    // actions

    // const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     const data = Object.fromEntries(formData.entries());
    //     await api.post("/register", data);
    //     setIsAuth(true);
    // };
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     const data = Object.fromEntries(formData.entries());
    //     try {
    //         const res = await api.post("/login", data);
    //         setIsAuth(true);
    //         console.log("Login riuscito");
    //         console.log(res.data);
    //     } catch (err: unknown) {
    //         console.error(err);
    //     }
    // };

    // const handleLogout = async () => {
    //     try {
    //         await api.post("/logout");
    //         console.log("Logout riuscito");
    //         setIsAuth(false);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // // collaterals effect
    // useEffect(() => {
    //     const fetchCsrfCookie = async () => {
    //         await api.get("/sanctum/csrf-cookie");
    //     };

    //     // chiamato solo al primo render
    //     fetchCsrfCookie();
    // }, []);

    // useEffect(() => {
    //     const fetchStudents = async () => {
    //         const res = await api.get("/api/students?course_id=7", {
    //             withCredentials: true,
    //             withXSRFToken: true,
    //         });

    //         console.log(res.data);
    //     };

    //     // const fetchTax = async () => {
    //     //   const res = await api.get("/api/teachers");
    //     // };
    //     if (isAuth) {
    //         console.log("test");
    //         //   fetchTax();

    //         fetchStudents();
    //     }
    // }, [isAuth]);ù

    // view
    return (
        <div className="flex justify-center items-center h-full gap-8">
            homepage
            {/* <div className="flex flex-col justify-center items-center ">
                <h1 className="mb-2">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 items-center border p-6 rounded-3xl"
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            defaultValue="admin@example.com"
                            name="email"
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            defaultValue="ciaociao"
                            name="password"
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
            {/* 
            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-4 items-center border p-6 rounded-3xl"
            >
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        defaultValue="admin@example.com"
                        // name="email"
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Tax Id"
                        id="tax_code"
                        name="tax_code"
                        defaultValue="laboriosam"
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name"
                        defaultValue="pippo"
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Type"
                        id="type"
                        name="type"
                        defaultValue="student"
                        required
                        autoFocus
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password Confirmation"
                        id="password_confirmation"
                        name="password_confirmation"
                        required
                    />
                </div>
                <button
                    className="px-4 py-2 rounded-md border cursor-pointer"
                    type="submit"
                >
                    Registrati
                </button>
            </form>  */}
        </div>
    );
}
