import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

//! fare controllo per id/matricola in backend
// fixme: ricerca funzionante al 95%
export const SearchStudentInput = ({
    onChange,
    queryParams,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    queryParams: Record<string, string>;
}) => {
    return (
        <div className="relative w-full sm:max-w-96">
            <input
                onChange={onChange}
                type="text"
                name="name"
                placeholder="Search student / ID number"
                className="w-full"
                defaultValue={queryParams?.name}
            />
            <Search className="absolute h-full top-0 right-2" />
        </div>
    );
};
