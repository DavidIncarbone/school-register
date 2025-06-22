import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { MouseEventHandler } from "react";

export const PaginationComp = ({
    currentPage,
    lastPage,
    fetchNextPage,
    fetchPrevPage,
    fetchSpecificPage,
    isPrevBtnDisabled = false,
    isNextBtnDisabled = false,
}: {
    currentPage: number | undefined;
    lastPage: number | undefined;
    fetchNextPage: () => void;
    fetchPrevPage: () => void;
    fetchSpecificPage: (page: number) => void;
    isPrevBtnDisabled?: boolean;
    isNextBtnDisabled?: boolean;
}) => {
    const handleFetchSpecificPage: MouseEventHandler<HTMLAnchorElement> = (
        e
    ) => {
        const page = e.currentTarget.textContent;
        fetchSpecificPage(Number(page));
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={fetchPrevPage}
                        className={`${
                            isPrevBtnDisabled &&
                            "!cursor-not-allowed opacity-30"
                        } cursor-pointer`}
                    />
                </PaginationItem>
                {currentPage && currentPage - 1 > 1 && (
                    <PaginationItem>
                        <PaginationLink onClick={handleFetchSpecificPage}>
                            {currentPage - 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {currentPage && currentPage > 1 && (
                    <PaginationItem>
                        <PaginationLink onClick={handleFetchSpecificPage}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink className="bg-primary">
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                {currentPage && lastPage && currentPage < lastPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handleFetchSpecificPage}>
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {currentPage && lastPage && currentPage + 1 < lastPage && (
                    <PaginationItem>
                        <PaginationLink onClick={handleFetchSpecificPage}>
                            {currentPage + 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        onClick={fetchNextPage}
                        className={`${
                            isNextBtnDisabled &&
                            "!cursor-not-allowed opacity-30"
                        } cursor-pointer`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
