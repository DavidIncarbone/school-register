import { api } from "@/services/api";

export const Debug = () => {
    const sendAnnouncement = async () => {
        const body = "Nuova comunicazione del preside";
        await api.post("/api/announcements", { body });
    };

    return (
        <div>
            <button onClick={sendAnnouncement} className="btn-pretty">
                Manda una comunicazione
            </button>
        </div>
    );
};
