import { Info, Mail, Pencil, Phone, TableOfContents } from "lucide-react";
import type { Student } from "../../config/types";
import { useState } from "react";

export const StudentRecord = ({ student }: { student: Student }) => {
    const [openActions, toggleActions] = useState(false);

    return (
        <div
            key={student.id}
            className="grid grid-cols-4 md:grid-cols-9 max-w-full odd:bg-zinc-700 even:bg-zinc-800 last:rounded-b-sm"
        >
            <div className="px-2 py-1 md:col-span-1 flex items-center">
                {student.id}
            </div>
            <div className="px-2 py-1 md:col-span-2 flex items-center">
                {student.first_name}
            </div>
            <div className="px-2 py-1 md:col-span-2 flex items-center">
                {student.last_name}
            </div>
            <div
                title={student.email}
                className={`max-md:hidden px-2 py-1 md:col-span-2 translate-y-0.5 overflow-hidden text-ellipsis`}
            >
                {student.email}
            </div>
            <div className="px-2 py-1 md:col-span-2 flex items-center justify-center gap-2 relative">
                <div
                    onClick={() => toggleActions((prev) => !prev)}
                    title="info"
                    className="sm:hidden"
                >
                    <TableOfContents className=" cursor-pointer scale-90 transition-transform hover:scale-110" />
                </div>
                <Actions className="max-sm:hidden" />
                {/* mobile tooltip */}
                {openActions && (
                    <div className="sm:hidden absolute z-10 right-0 p-4 rounded-lg bg-slate-900 flex gap-4 top-full border">
                        <Actions />
                    </div>
                )}
            </div>
        </div>
    );
};

type ActionsProps = {
    className?: string;
    onInfoClick?: () => void;
    onModifyClick?: () => void;
    onEmailClick?: () => void;
    onPhoneClick?: () => void;
};

const Actions = ({
    className,
    onInfoClick,
    onModifyClick,
    onEmailClick,
    onPhoneClick,
}: ActionsProps) => {
    return (
        <>
            <div onClick={onInfoClick} className={className} title="info">
                <Info className="cursor-pointer scale-90 transition-transform hover:scale-110" />
            </div>
            <div onClick={onModifyClick} className={className} title="modify">
                <Pencil className="cursor-pointer scale-90 transition-transform hover:scale-110" />
            </div>
            <div
                onClick={onEmailClick}
                className={className}
                title="send email"
            >
                <Mail className="cursor-pointer scale-90 transition-transform hover:scale-110" />
            </div>
            <div
                onClick={onPhoneClick}
                className={className}
                title="phone number"
            >
                <Phone className="cursor-pointer scale-90 transition-transform hover:scale-110" />
            </div>
        </>
    );
};
