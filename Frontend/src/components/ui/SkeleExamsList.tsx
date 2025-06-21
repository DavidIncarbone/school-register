export const SkeleExamsList = () => {
    return (
        <div className=" bg-zinc-900 border-white md:w-11/12 lg:w-3/5 mx-auto rounded-sm border animate-pulse text-transparent">
            {/* head */}
            <div className="grid grid-cols-5 capitalize [&>div]:p-2 text-center font-semibold [&>div]:border-white">
                <div className="border-b col-span-2">date</div>
                <div className="border-x border-b col-span-2">topic</div>
                <div className="border-b col-span-1">results</div>
            </div>
            {/* exams */}
            {[1, 2, 3, 4].map((_, i) => (
                <div
                    key={i}
                    className="grid grid-cols-5 [&>div]:p-2 [&>div]:border-white"
                >
                    <div className="border-b col-span-2">date</div>
                    <div className="border-x border-b col-span-2">topic</div>
                    <div className="border-b col-span-1 flex justify-center items-center">
                        link
                    </div>
                </div>
            ))}
        </div>
    );
};
