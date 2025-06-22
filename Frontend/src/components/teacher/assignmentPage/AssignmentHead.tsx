import { type SortingCols } from "@/config/types";
import { TriangleRight } from "lucide-react";
import type { MouseEvent } from "react";

export const AssignmentHead = ({
    sortingCols,
    activeDir,
    activeSort,
    onClick,
}: {
    sortingCols: SortingCols[];
    activeDir: string;
    activeSort: string;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
    return (
        <div className="grid grid-cols-7 w-full text-center  border-b-2 rounded-t-sm overflow-hidden font-semibold bg-zinc-900 [&>div]:hover:bg-zinc-950">
            {sortingCols.map((col, i, ar) => (
                <div
                    key={i}
                    id={col.sort}
                    className={`${col.className} cursor-pointer`}
                    onClick={onClick}
                >
                    <span>{col.label}</span>
                    {i < ar.length - 2 && (
                        <TriangleRight
                            className={`${
                                (col.dir === "desc" || activeDir === "desc") &&
                                "!rotate-0"
                            } ${
                                activeSort === col.sort && "!opacity-100"
                            } opacity-0 scale-70 transition-transform rotate-180`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
