import { dashboardItems } from "@/config/globals";
import { Link } from "react-router";

export function AdminDashboard() {
  return (
    <div className="flex gap-3 h-100">
      {dashboardItems.map((item, i) => (
        <Link
          to={item.path}
          key={i}
          className="w-full md:w-1/3 lg:w-1/4 h-1/3 flex justify-center items-center dasboard-cards transition-transform duration-300 hover:scale-105 cursor-pointer bg-blue-300"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
