import { Outlet, useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { useEffect } from "react";
import type { User } from "../config/types";
import { api } from "../services/api";
import Loader from "../components/ui/Loader";
// import { useQueryIndexPersonalProfile } from "@/hooks/personalProfileQueries";

export default function PrivateRoutes() {
  // * global store
  const { authUser, setAuthUser, setIsAuthLoading, setProfile } =
    useGlobalStore();

  // * vars
  const navigate = useNavigate();

  // * queries
  //   const { data: personalProfile } = useQueryIndexPersonalProfile(
  //     Boolean(authUser)
  //   );

  // * side effects
  useEffect(() => {
    const fetchAndSetAuthUser = async () => {
      try {
        const res = await api.get("/api/user");
        const user = res.data as User;
        setAuthUser(user);
      } catch {
        navigate("/login");
      } finally {
        setIsAuthLoading(false);
      }
    };

    if (!authUser) {
      fetchAndSetAuthUser();
    }
  }, []);

  //   useEffect(() => {
  //     if (personalProfile) {
  //       setProfile(personalProfile);
  //     }
  //   }, [personalProfile, setProfile]);

  // * views
  return authUser ? <Outlet /> : <Loader />;
}
