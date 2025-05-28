import { MessageText1 } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { LoginFormValidation } from "../types";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "saba.far.99@gmail.com",
      password: "123456",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (values: z.infer<typeof LoginFormValidation>) => login(values),
  });
  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    console.log(values);
    mutate(values);
  };
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-[500px] shadow-md ">
        <div className="grid place-content-center space-y-4">
          <div>
            <MessageText1 size="36" className="mx-auto text-base" />
          </div>
          <h1 className="text-center font-bold text-3xl">Welcome Back</h1>
          <p className="text-center">Sign in to your account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="card-body space-y-3.5">
          <fieldset className=" w-full">
            <legend className="fieldset-legend py-4 text-lg">email</legend>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full"
              placeholder=""
            />
            {errors.email?.message && (
              <span className="text-error mt-1 text-md">
                {errors.email.message}
              </span>
            )}
          </fieldset>
          <fieldset className=" w-full">
            <legend className="fieldset-legend py-4 text-lg">password</legend>
            <input
              {...register("password", { required: true })}
              type="password"
              className="input w-full"
              placeholder=""
            />
            {errors.password?.message && (
              <span className="text-error mt-2 text-md">
                {errors.password.message}
              </span>
            )}
          </fieldset>
          <button
            disabled={isPending}
            className="btn  btn-primary mt-4 text-lg">
            {isPending ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "signup"
            )}
          </button>
          <div className="mx-auto text-[19px]">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
