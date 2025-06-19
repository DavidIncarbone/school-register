import { useState, type FormEvent } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router";
import type { LoginUser, User } from "../config/types";
import Loader from "../components/ui/Loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import toast from "react-hot-toast";

export default function LoginPage() {
  // * vars
  const navigate = useNavigate();
  const { authUser, setAuthUser, profile } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);

  // * actions

  const {
    register,
    handleSubmit: loginSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const fetchAndSetUser = async () => {
    try {
      const res = await api.get("/api/user");
      const user = res.data as User;
      setAuthUser(user);
      navigate("/");
      toast.success(`Welcome ${user?.name}`);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: LoginUser) => {
    try {
      setIsLoading(true);
      await api.post("/login", formData);
      fetchAndSetUser();
    } catch (err: any) {
      console.error(err);
      console.error(err.status);
      setIsLoading(false);
      if (err.status === 422) {
        toast.error("Unregistered User", {
          position: "top-center",
        });
      }
    }
  };

  // * views
  return (
    !authUser && (
      <div className="h-full flex justify-center items-center">
        <div className="auth-form">
          <h2 className="capitalize text-3xl  text-center">login</h2>
          <form onSubmit={loginSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-0.5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="mario@example.com"
                defaultValue="mosca@example.com"
                id="email"
                {...register("email")}
                autoFocus
              />
              <span className="text-red-500">{errors?.email?.message}</span>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                defaultValue="ciaociao"
                {...register("password")}
              />
              <span className="text-red-500">{errors?.password?.message}</span>
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
