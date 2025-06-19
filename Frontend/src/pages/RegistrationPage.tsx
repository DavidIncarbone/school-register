import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalStore } from "../store/useGlobalStore";
import { api } from "../services/api";
import { UserType, type User } from "../config/types";
import { useForm } from "react-hook-form";
import {
  enableUserSchema,
  retrieveTempUserSchema,
  type EnableUserFormData,
  type RetrieveTempUserFormData,
} from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";

type TempUser = {
  first_name: string;
  last_name: string;
  email: string;
  type: UserType;
};

export default function RegistrationPage() {
  // * global store
  const { authUser, setAuthUser } = useGlobalStore();

  // * vars
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [tempUser, setTempUser] = useState<TempUser | null>(null);
  const [isTempUserPending, setIsTempUserPending] = useState(false);
  const [isEnableUserPending, setIsenableUserPending] = useState(false);

  const {
    register: registerTempUser,
    handleSubmit: handleTempUserSubmit,
    formState: { errors: tempUserErrors },
  } = useForm({
    resolver: zodResolver(retrieveTempUserSchema),
  });
  const {
    register: registerEnableUser,
    handleSubmit: handleEnableUserSubmit,
    formState: { errors: enableUserErrors },
  } = useForm({
    resolver: zodResolver(enableUserSchema),
  });

  // * actions
  const retrieveTempUser = async (formData: RetrieveTempUserFormData) => {
    try {
      setIsTempUserPending(true);
      console.log("Sono nel retrieve temp user");
      const res = await api.post("/api/retrieve-temp-user", formData);
      console.log(res.data);
      const tempUser: TempUser = {
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: formData.email,
        type: formData.type as UserType,
      };
      setTempUser(tempUser);
      setIsEmailVerified(true);
      console.log(formData);
      toast.success("User successfully verified", {
        position: "top-center",
      });
      setIsTempUserPending(false);
    } catch (err: any) {
      console.error(err);
      if (err.status === 404) {
        toast.error("Invalid credentials", {
          position: "top-center",
        });
      } else if (err.status === 401) {
        toast.error("User already enabled", {
          position: "top-center",
        });
      }
    } finally {
      setIsTempUserPending(false);
    }
  };
  const enableUser = async (formData: EnableUserFormData) => {
    try {
      setIsenableUserPending(true);
      console.log("sono nell'enable user");
      const data = {
        ...formData,
        type: tempUser?.type as string,
      };

      await api.post("/register", data);
      const res = await api.get("/api/user");
      console.log(res.data, "user");
      const user = res.data as User;
      setAuthUser(res.data as User);
      navigate("/");
      toast.success(`Welcome ${user.name}`);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsenableUserPending(false);
    }
  };

  console.log(tempUser);
  return (
    !authUser && (
      <div className="h-full flex justify-center items-center">
        <div className="auth-form">
          <h2 className="text-3xl text-center capitalize">
            <span>{tempUser?.type}</span> <span>Check-In</span>
          </h2>

          {!isEmailVerified ? (
            <form onSubmit={handleTempUserSubmit(retrieveTempUser)}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="email"
                  placeholder="example@example.com"
                  defaultValue={tempUser?.email ? tempUser.email : ""}
                  id="email"
                  {...registerTempUser("email")}
                />
                <span className="text-red-500">
                  {tempUserErrors.email?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="type">Role</label>
                <select id="type" {...registerTempUser("type")}>
                  <option value="" selected disabled hidden>
                    Select your role
                  </option>
                  <option value={UserType.STUDENT}>Student</option>
                  <option value={UserType.TEACHER}>Teacher</option>
                </select>
                <span className="text-red-500">
                  {tempUserErrors.type?.message}
                </span>
              </div>
              <button
                type="submit"
                className={`flex justify-center
                `}
              >
                {isTempUserPending ? (
                  <Loader isContained={true} />
                ) : (
                  <div>Verify</div>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleEnableUserSubmit(enableUser)}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="email"
                  placeholder="example@example.com"
                  defaultValue={tempUser?.email ? tempUser.email : ""}
                  id="email"
                  {...registerEnableUser("email")}
                />
                <span className="text-red">
                  {enableUserErrors.email?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="name"
                  {...registerEnableUser("name")}
                  defaultValue={
                    tempUser?.first_name &&
                    tempUser?.last_name &&
                    `${tempUser.first_name} ${tempUser.last_name}`
                  }
                  id="name"
                  autoFocus
                />
                <span className="text-red">
                  {enableUserErrors.name?.message}
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  defaultValue="ciaociao"
                  {...registerEnableUser("password")}
                />
                {enableUserErrors.password?.message}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="password_confirmation">Confirm password</label>
                <input
                  type="password"
                  placeholder="password_confirmation"
                  defaultValue="ciaociao"
                  {...registerEnableUser("password_confirmation")}
                />
                {enableUserErrors.password_confirmation?.message}
              </div>
              <div className="flex items-center space-x-1">
                <input id="terms" type="checkbox" />
                <label htmlFor="terms" className="text-xs italic">
                  <span>Accept</span>{" "}
                  <a
                    href="https://google.com"
                    target="_blank"
                    className="  underline underline-offset-2 hover:text-blue-400"
                  >
                    Terms and Condition
                  </a>
                </label>
              </div>
              <button type="submit">
                {isEnableUserPending ? (
                  <Loader isContained={true} />
                ) : (
                  <div>Enable</div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    )
  );
}
