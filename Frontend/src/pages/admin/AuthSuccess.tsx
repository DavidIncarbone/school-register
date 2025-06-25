import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/");
    }
  }, []);

  return <p>Google login...</p>;
};
