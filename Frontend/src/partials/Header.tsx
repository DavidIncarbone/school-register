import { FaAddressCard, FaArrowCircleDown } from "react-icons/fa";
import { api } from "../services/api";
import { useGlobalStore } from "../store/useGlobalStore";
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const { setAuthUser } = useGlobalStore((state) => state);

    const handleLogout = async () => {
        setAuthUser(null);
        navigate("/login");
        try {
            await api.post("/logout");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="h-[10%] bg-fuchsia-500 flex">
            <div className="flex items-center grow bg-red-700 px-4">
                <input type="text" className="w-full xl:w-1/2" />
            </div>

            <div className="flex items-center gap-10 px-4 bg-sky-950">
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
            </div>

            <div className="flex items-center gap-2 px-4 bg-blue-300">
                <div
                    onClick={() => navigate("/")}
                    className="w-16 aspect-square bg-green-300 rounded-full"
                ></div>
                <div className="flex items-center gap-2">
                    <span>David Martini</span>
                    <FaArrowCircleDown
                        onClick={handleLogout}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </header>
    );
}
