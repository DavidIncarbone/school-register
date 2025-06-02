import { Outlet } from "react-router";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

export default function DefaultLayout() {
    return (
        <>
            <Sidebar />
            <div className="grow bg-amber-300 flex flex-col">
                <Header />
                <main className="grow ">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
