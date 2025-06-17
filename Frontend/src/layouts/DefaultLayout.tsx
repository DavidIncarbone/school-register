import { Outlet } from "react-router";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function DefaultLayout() {
    const [mainHeight, setMainHeight] = useState(window.innerHeight - 64);

    useEffect(() => {
        // al resize della window, fai il calcolo della height del main (100vh - headerHeight(64px))
        // throttle per 500ms
        const handleWindowResize = throttle(() => {
            setMainHeight(window.innerHeight - 64);
        }, 500);
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
            handleWindowResize.cancel();
        };
    }, []);

    return (
        <>
            <Sidebar />
            <div className="grow h-full">
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

// =============================================================================
//
// =============================================================================

// implementazione con raf

// useEffect(() => {
// let rafId: number | null = null;
// const handleWindowResize = () => {
//     if (rafId === null) {
//         rafId = requestAnimationFrame(() => {
//             setMainHeight(window.innerHeight - 64);
//             rafId = null;
//         });
//     }
// };
// window.addEventListener("resize", handleWindowResize);

// return () => {
//     window.removeEventListener("resize", handleWindowResize);
// if (rafId !== null) {
//     cancelAnimationFrame(rafId);
// }
//     };
// }, []);
