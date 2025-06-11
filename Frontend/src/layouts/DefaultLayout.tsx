import { Outlet } from "react-router";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function DefaultLayout() {
    const [mainHeight, setMainHeight] = useState(window.innerHeight - 64);

    useEffect(() => {
        // let rafId: number | null = null;
        const handleWindowResize = throttle(() => {
            setMainHeight(window.innerHeight - 64);
        }, 500);
        // const handleWindowResize = () => {
        //     if (rafId === null) {
        //         rafId = requestAnimationFrame(() => {
        //             setMainHeight(window.innerHeight - 64);
        //             rafId = null;
        //         });
        //     }
        // };
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
            handleWindowResize.cancel();
            // if (rafId !== null) {
            //     cancelAnimationFrame(rafId);
            // }
        };
    }, []);

    return (
        <>
            <Sidebar />
            <div className="grow lg:ml-[14.3%] h-full">
                <Header />
                <main
                    style={{ minHeight: mainHeight, height: mainHeight }}
                    className="[&>*]:bg-[#2a2d33] bg-[#2a2d33]"
                >
                    <Outlet />
                </main>
            </div>
        </>
    );
}
