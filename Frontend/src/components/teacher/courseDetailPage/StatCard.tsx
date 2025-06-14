export const StatCard = ({
    value,
    label,
    color,
}: {
    value: string | number | undefined | null;
    label: string;
    color: string;
}) => {
    const isLoading = value === null || value === undefined;
    return (
        <div
            className={`w-24 aspect-square flex flex-col justify-center items-center ${color} ${
                isLoading ? "animate-pulse text-transparent" : ""
            }`}
        >
            <span className="text-4xl font-semibold">
                {isLoading ? "0" : value}
            </span>
            <span className="text-sm text-center">{label}</span>
        </div>
    );
};