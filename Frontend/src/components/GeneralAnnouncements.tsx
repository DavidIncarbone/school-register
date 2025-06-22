import { useQueryIndexAnnouncements } from "@/hooks/announcementsQueries";
import { TitleAndNavigation } from "./TitleAndNavigation";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Announcement } from "@/config/types";

export const GeneralAnnouncements = () => {
    const { data: announcements, isLoading: isAnnouncementsLoading } =
        useQueryIndexAnnouncements() as UseQueryResult<
            { data: Announcement[] },
            Error
        >;

    return (
        <>
            <TitleAndNavigation title="General announcements" />
            <div id="announcements-table" className="flex flex-col border rounded-sm overflow-hidden text-sm bg-yellow-700">
                {isAnnouncementsLoading || !announcements
                    ? [1, 2, 3, 4, 5, 6].map((_, i) => (
                          <div
                              key={i}
                              className="bg-yellow-800 text-transparent border-b border-white p-2 line-clamp-2 animate-pulse"
                          >
                              placeholder
                          </div>
                      ))
                    : announcements?.data.map((announcement) => (
                          <div className="border px-5 py-2">
                              <span
                                  key={announcement.id}
                                  className="line-clamp-2"
                              >
                                  {announcement.body}
                              </span>
                          </div>
                      ))}
            </div>
        </>
    );
};
