export const SkeleAssignmentsList = () => {
    // * views
    return (
        <>
            {[1, 2, 3, 4].map((_, i) => (
                <div
                    key={i}
                    className={`grid grid-cols-7 even:bg-zinc-800 odd:bg-zinc-900 text-transparent animate-pulse`}
                >
                    <div className="m-2 w-40">00/00/000</div>
                    <div className="m-2">00/00/0000</div>
                    <textarea
                        rows={2}
                        defaultValue="placeholder"
                        className="m-2 p-3 col-span-4"
                    />
                    <div></div>
                </div>
            ))}
        </>
    );
};
