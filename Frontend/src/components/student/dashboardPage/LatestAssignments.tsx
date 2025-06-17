import { TitleAndNavigation } from "@/components/TitleAndNavigation";
import type { Assignment, IndexAssignmentsParams } from "@/config/types";
import { useQueryIndexAssignment } from "@/hooks/assignmentsQueries";
import { useGlobalStore } from "@/store/useGlobalStore";
import type { UseQueryResult } from "@tanstack/react-query";

export const LatestAssignments = () => {
    // * global store
    const { profile } = useGlobalStore();

    const assignmentsParams: IndexAssignmentsParams = {
        course_id: profile?.course_id,
    };

    const { data: assignments } = useQueryIndexAssignment(
        assignmentsParams,
        Boolean(profile)
    ) as UseQueryResult<{ data: Assignment[]; total: number }, Error>;
    return (
        <>
            <TitleAndNavigation
                title="Latest Assignments"
                path="/assignments"
            />
            <div className="grid grid-cols-3 border rounded-t-sm text-center !bg-fuchsia-900">
                <div className="border-r p-1">Subject</div>
                <div className="col-span-2">Body</div>
            </div>
            {!assignments
                ? [1, 2, 3, 4].map((_, i) => (
                      <div
                          key={i}
                          className="grid grid-cols-3 border border-white last:rounded-b-sm text-transparent animate-pulse bg-fuchsia-700
                          "
                      >
                          <div className="flex justify-center items-center border-r">
                              name
                          </div>
                          <div className="line-clamp-2 col-span-2 p-1">
                              body <br /> boody
                          </div>
                      </div>
                  ))
                : assignments?.data.map((as) => (
                      <div
                          key={as.id}
                          className="grid grid-cols-3 border last:rounded-b-sm !bg-fuchsia-900"
                      >
                          <div className="flex justify-center items-center border-r capitalize">
                              {as.subject.name}
                          </div>
                          <div className="line-clamp-2 col-span-2 p-1">
                              {as.body}
                          </div>
                      </div>
                  ))}
        </>
    );
};
