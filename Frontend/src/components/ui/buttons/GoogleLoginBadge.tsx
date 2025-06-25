import React, { type Dispatch, type SetStateAction } from "react";
import style from "./GoogleLoginBadge.module.css";
import Loader from "../Loader";

function GoogleLoginBadge({
  isLoadingGoogle,
  setIsLoadingGoogle,
  isLoading,
}: {
  isLoadingGoogle: boolean;
  setIsLoadingGoogle: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  const handleLogin = () => {
    setIsLoadingGoogle(true);
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };

  return (
    <button
      className={`${
        isLoadingGoogle || isLoading
          ? style.googleLoginDeniedBadge
          : style.googleLoginBadge
      }`}
      onClick={handleLogin}
      disabled={isLoadingGoogle || isLoading}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className={style.googleLogo}
      />
      {isLoadingGoogle ? <Loader isContained={true} /> : "Sign in with google"}
    </button>
  );
}

export default GoogleLoginBadge;
