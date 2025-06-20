export const SkeleGradesList = () => {
    return (
        <>
            <div className=" bg-zinc-900 animate-pulse border-white rounded-sm border text-transparent">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold [&>div]:border-white"
                    >
                        <div className="border-b col-span-1">ID number</div>
                        <div className="border-x border-b col-span-2">
                            student
                        </div>
                        <div className="border-b col-span-2">grade</div>
                    </div>
                ))}
            </div>
        </>
    );
};
