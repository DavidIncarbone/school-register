import { useState, type FormEvent } from "react";
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

type Data = {
  name: string;
  email: string;
  type: UserType;
  password: string;
  password_confirmation: string;
};

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
      console.log("Sono nel retrieve temp user");
      const res = await api.post("/api/retrieve-temp-user", formData);
      //   let tempUser: TempUser = res.data;
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
    } catch (err: unknown) {
      console.error(err);
    }
  };
  const enableUser = async (formData: EnableUserFormData) => {
    try {
      console.log("sono nell'enable user");
      const data = {
        ...formData,
        type: tempUser?.type as string,
      };

      await api.post("/register", data);
      const res = await api.get("/api/user");
      console.log(res.data, "user");
      setAuthUser(res.data as User);
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  //   try {
  //     if (tempUser) {
  //       formData = {
  //         ...formData,
  //         email: tempUser.email,
  //         name: `${tempUser.first_name} ${tempUser.last_name}`,
  //         type: tempUser.type,
  //       };
  //     }
  //     console.log(formData);
  //     await api.post("/register", formData);
  //     const res = await api.get("/api/user");
  //     setAuthUser(res.data as User);
  //     navigate("/");
  //   } catch (err: unknown) {
  //     console.error(err);
  //   }
  console.log(tempUser);
  return (
    !authUser && (
      <div className="h-full flex justify-center items-center">
        <div className="auth-form">
          <h2 className="text-3xl text-center capitalize">
            <span>{tempUser?.type}</span> <span>registration</span>
          </h2>

          {!isEmailVerified ? (
            <form onSubmit={handleTempUserSubmit(retrieveTempUser)}>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="email">Email</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="email"
                  placeholder="example@example.com"
                  defaultValue={tempUser?.email ? tempUser.email : ""}
                  id="email"
                  // name="email"

                  {...registerTempUser("email")}
                />
                {tempUserErrors.email?.message}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="type">Role</label>
                <select
                  id="type"
                  /*name="type"*/

                  {...registerTempUser("type")}
                >
                  <option value="" selected disabled hidden>
                    Select your role
                  </option>
                  <option value={UserType.STUDENT}>Student</option>
                  <option value={UserType.TEACHER}>Teacher</option>
                </select>
                {tempUserErrors.type?.message}
              </div>
              <button type="submit">Verify</button>
            </form>
          ) : (
            <form onSubmit={handleEnableUserSubmit(enableUser)}>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="email">Email</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="email"
                  placeholder="example@example.com"
                  value={tempUser?.email ? tempUser.email : ""}
                  id="email"
                  // name="email"

                  {...registerEnableUser("email")}
                />
                {enableUserErrors.email?.message}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="name">Name</label>
                <input
                  disabled={isEmailVerified}
                  className={`${isEmailVerified && "cursor-not-allowed"}`}
                  type="name"
                  {...registerEnableUser("name")}
                  value={
                    tempUser?.first_name &&
                    tempUser?.last_name &&
                    `${tempUser.first_name} ${tempUser.last_name}`
                  }
                  id="name"
                  //   name="name"

                  autoFocus
                />
                {enableUserErrors.name?.message}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  // defaultValue="ciaociao"
                  // name="password"
                  {...registerEnableUser("password")}
                />
                {enableUserErrors.password?.message}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="password_confirmation">Confirm password</label>
                <input
                  type="password"
                  placeholder="password_confirmation"
                  // defaultValue="ciaociao"
                  // name="password_confirmation"
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
              <button type="submit">Enable</button>
            </form>
          )}
        </div>
      </div>
    )
  );
}
