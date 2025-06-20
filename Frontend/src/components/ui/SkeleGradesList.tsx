export const SkeleGradesList = ({
    threeCols = false,
}: {
    threeCols?: boolean;
}) => {
    return (
        <>
            <div className=" bg-zinc-900 animate-pulse border-white rounded-sm border text-transparent">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={i}
                        className={`${
                            threeCols && "!grid-cols-4"
                        } grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold [&>div]:border-white`}
                    >
                        <div className="border-b">ID number</div>
                        <div className="border-x border-b col-span-2">
                            student
                        </div>
                        <div className="border-b">grade</div>
                        {!threeCols && (
                            <div className="border-b border-l">actions</div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};
