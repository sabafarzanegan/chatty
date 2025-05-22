import { MessageText1 } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { signUpFormValidation } from "../types";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
function Signup() {
  const { signUp } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpFormValidation>>({
    resolver: zodResolver(signUpFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (values: z.infer<typeof signUpFormValidation>) =>
      signUp(values),
    onSuccess: (data) => {
      console.log(data);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message, {});
      }
    },
  });
  const onSubmit = async (values: z.infer<typeof signUpFormValidation>) => {
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
          <h1 className="text-center font-bold text-3xl">Create Account</h1>
          <p className="text-center">Get started with your free account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="card-body space-y-3.5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend py-4 text-lg">fullName</legend>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="input w-full"
              placeholder=""
            />
            {errors.fullName?.message && (
              <span className="text-error mt-1 text-md">
                {errors.fullName.message}
              </span>
            )}
          </fieldset>
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
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
