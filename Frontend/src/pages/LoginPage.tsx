import { useState, type FormEvent } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router";
import type { User } from "../config/types";
import Loader from "../components/ui/Loader";

export default function LoginPage() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSetUser = async () => {
    try {
      const res = await api.get("/api/user");
      setAuthUser(res.data as User);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setIsLoading(true);
    try {
      await api.post("/login", data);
      fetchAndSetUser();
    } catch (err: unknown) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    !authUser && (
      <div className="h-full flex justify-center items-center">
        <div className="auth-form">
          <h2 className="capitalize text-3xl  text-center">login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-0.5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="mario@example.com"
                defaultValue="mosca@example.com"
                id="email"
                name="email"
                required
                autoFocus
              />
            </div>
            <div className="flex flex-col space-y-0.5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                defaultValue="ciaociao"
                name="password"
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={`${isLoading && "cursor-not-allowed"} capitalize`}
            >
              {isLoading ? <Loader isContained={true} /> : "Sign in"}
            </button>
          </form>

          <div className="text-sm space-x-1">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className=" text-blue-400 underline-offset-2 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
