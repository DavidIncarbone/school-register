import { Outlet } from "react-router";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useGlobalStore } from "../store/useGlobalStore";

export default function DefaultLayout() {
    const isAuthLoading = useGlobalStore((state) => state.isAuthLoading);

    return (
        <>
            <Sidebar />
            <div className="grow flex flex-col">
                <Header />
                <main className="grow bg-[#2a2d33] ">
                    {isAuthLoading ? <pre>loading</pre> : <Outlet />}
                </main>
            </div>
        </>
    );
}
