import { FaAddressCard, FaArrowCircleDown } from "react-icons/fa";
import { api } from "../services/api";
import { useGlobalStore } from "../store/useGlobalStore";
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useGlobalStore((state) => state);

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
        <header className="h-16 bg-[#1e2125] flex flex-wrap">
            <div className="max-sm:hidden flex items-center grow px-4">
                <input
                    type="text"
                    className="w-full xl:w-1/2"
                    placeholder="Cosa stai cercando?"
                />
            </div>

            <div className="flex items-center gap-10 px-4">
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
            </div>

            <div className="flex items-center gap-2 px-4">
                <div
                    onClick={() => navigate("/")}
                    className="w-12 aspect-square border rounded-full"
                ></div>
                <div className="flex items-center gap-2">
                    <span>{authUser ? authUser.name : "Utente"}</span>
                    <FaArrowCircleDown
                        onClick={handleLogout}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </header>
    );
}
