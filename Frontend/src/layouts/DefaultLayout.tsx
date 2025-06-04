import { Outlet } from "react-router";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

export default function DefaultLayout() {
    return (
        <>
            <Sidebar />
            <div className="grow flex flex-col">
                <Header />
                <main className="grow bg-[#2a2d33] ">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
