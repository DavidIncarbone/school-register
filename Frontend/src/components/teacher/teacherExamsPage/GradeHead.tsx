export const GradeHead = ({ threeCols = false }: { threeCols: boolean }) => {
    return (
        <div
            className={`${
                threeCols && "!grid-cols-4"
            } grid grid-cols-5 capitalize [&>div]:p-2 border rounded-t-sm text-center font-semibold`}
        >
            <div className="col-span-1">ID number</div>
            <div className="border-x col-span-2">student</div>
            <div className="">grade</div>
            {!threeCols && <div className="border-l">actions</div>}
        </div>
    );
};
