export const SkeleAssignmentsList = () => {
    // * views
    return (
        <>
            {[1, 2, 3, 4].map((_, i) => (
                <div
                    key={i}
                    className={`flex  odd:bg-zinc-800 even:bg-zinc-950 3xl:h-40 text-transparent [&>*]:border-white animate-pulse`}
                >
                    <div className="border px-4 w-40 flex justify-center">
                        00/00/0000
                    </div>
                    <div className=" border px-4 w-40 flex justify-center items-center">
                        00/00/0000
                    </div>
                    <textarea
                        rows={3}
                        defaultValue="placeholder"
                        className="grow border min-w-92 p-3 tracking-wider leading-7 flex justify-center items-center"
                    />

                    <div className="border w-32 flex justify-center items-center gap-2 [&>*]:cursor-pointer [&>*]:scale-90 [&>*]:hover:scale-100 [&>*]:transition-transform"></div>
                </div>
            ))}
        </>
    );
};
