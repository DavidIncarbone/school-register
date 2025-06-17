import { Navigation } from "lucide-react";
import { Link } from "react-router";

export const TitleAndNavigation = ({
    title,
    path,
}: {
    title: string;
    path?: string;
}) => {
    return (
        <div className="flex justify-between">
            <h3 className="dashboard_h3 capitalize">{title}</h3>
            {path && (
                <Link to={path}>
                    <Navigation className="scale-80 hover:scale-100 cursor-pointer transition-transform" />
                </Link>
            )}
        </div>
    );
};
