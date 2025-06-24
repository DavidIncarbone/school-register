import { dashboardItems } from "@/config/globals";
import { Link } from "react-router";
import { Debug } from "../Debug";

export function AdminDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 my-5 h-100">
        {dashboardItems.map((item, i) => (
          <Link
            to={item.path}
            key={i}
            className=" dasboard-cards transition-transform duration-300 hover:scale-105 cursor-pointer bg-black drop-shadow-[0_0_10px_white] flex justify-center"
          >
            <div className="transition-transform duration-300 hover:scale-110 self-center">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <Debug />
    </>
  );
}

// w-full md:w-1/3 lg:w-1/4 h-1/3 flex justify-center items-center
