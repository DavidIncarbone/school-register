import { Link } from "react-router";
import { UserType } from "../config/types";
import { useGlobalStore } from "../store/useGlobalStore";

export default function Homepage() {
    // console.log("render homepage");
    const { authUser } = useGlobalStore((state) => state);
    console.log(authUser);

    // view
    if (!authUser) return <pre>auth user loading</pre>;
    return (
        <>
            {authUser.type === UserType.STUDENT ? (
                <div className="h-full flex flex-col">
                    <h1 className="text-2xl px-5 py-5">Student Dashboard</h1>
                    <div className="h-6/12 flex gap-5 p-5 pt-0">
                        <div className="w-3/5 flex flex-col gap-5">
                            <div className="bg-red-300 h-2/5"></div>
                            <div className="h-3/5 flex gap-5">
                                <div className="bg-blue-300 w-2/5"></div>
                                <div className="bg-blue-800 grow"></div>
                            </div>
                        </div>
                        <div className="bg-red-700 grow p-5"></div>
                    </div>
                    <div className="grow flex pt-0 p-5 gap-5">
                        <div className="border bg-green-500 border-black h-full grow-3"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                        <div className="border bg-green-500 border-black h-full grow-2"></div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col">
                    <h1 className="text-2xl px-5 py-5">Teacher Dashboard</h1>
                    <div className="flex h-full p-5 pt-0 gap-5">
                        <div className="h-full w-3/5 flex flex-col gap-5">
                            <div className="h-1/5 bg-blue-950">
                                <Link
                                    to="/teacher/search-students"
                                    role="button"
                                    className="btn"
                                >
                                    Cerca i tuoi pezzenti
                                </Link>
                            </div>

                            <div className="grow bg-green-800">1</div>
                        </div>
                        <div className=" h-full grow flex flex-col gap-5">
                            <div className="h-3/5 bg-green-800">1</div>
                            <div className="grow bg-green-300">1</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
