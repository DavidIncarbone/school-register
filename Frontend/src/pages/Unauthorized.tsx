import { Link } from "react-router";

export const Unauthorized = () => {
    return (
        <div className="flex flex-col items-start p-5 gap-2 ">
            <h1 className="text-4xl font-semibold">Unauthorized</h1>
            <Link to="/" className="btn-pretty">
                Go Back
            </Link>
        </div>
    );
};
