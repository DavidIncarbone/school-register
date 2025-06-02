import { FaAddressCard, FaArrowCircleDown } from "react-icons/fa";

export default function Header() {
    return (
        <header className="h-[10%] bg-fuchsia-500 flex">
            <div className="flex items-center grow bg-red-700 px-4">
                <input type="text" className="w-full xl:w-1/2" value="jnvaofa" />
            </div>

            <div className="flex items-center gap-10 px-4 bg-sky-950">
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
                <FaAddressCard className="size-8" />
            </div>

            <div className="flex items-center gap-2 px-4 bg-blue-300">
                <div className="w-16 aspect-square bg-green-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                    <span>David Martini</span>
                    <FaArrowCircleDown />
                </div>
            </div>
        </header>
    );
}
