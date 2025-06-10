import type { Presence } from "@/config/types";
import { api, presencesEndpoint } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const StudentDetailPage = () => {
    const { id } = useParams();

    const [presences, setPresences] = useState<Presence[] | null>(null);

    const params = { student_id: id };

    useEffect(() => {
        const fetchPresences = async () => {
            try {
                const res = await api.get(`${presencesEndpoint}`, { params });
                console.log(res.data);
                setPresences(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPresences();
    }, []);

    return (
        <div className="bg-zinc-900 overflow-auto h-full p-8">
            {presences &&
                presences.map((presence) => (
                    <div key={presence.id} className="border p-4">
                        <p>{presence.student_id}</p>
                        <p>{presence.is_present}</p>
                        <p>{presence.date}</p>
                    </div>
                ))}
        </div>
    );
};
