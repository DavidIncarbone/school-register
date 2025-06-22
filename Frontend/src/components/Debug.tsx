import { api } from "@/services/api";

export const Debug = () => {
    const sendAnnouncement = async () => {
        const body =
            "Dear Students and Staff, I hope this message finds you well. I’m excited to announce that starting next week, we will be launching a school-wide reading challenge aimed at promoting literacy and a love for books. Prizes will be awarded to the top readers in each grade, and there will be a special assembly at the end of the month to celebrate everyone’s achievements. Let’s make this a fun and enriching experience for all. More details will be shared by your teachers during homeroom. Keep up the great work, and let’s keep learning together! Warm regards, Principal Anderson";
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
