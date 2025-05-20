"use client";

import { useState } from "react";
import Label from "./label";
import { z } from "zod";
import { signUpSchema } from "@/lib/signupSchema";
import { ValidateField } from "@/lib/validateField";
import { LoaderIcon } from "lucide-react";

export function Form() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  type SignUPForm = z.infer<typeof signUpSchema>;
  const [errors, setErrors] = useState<z.ZodFormattedError<SignUPForm> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [passwordConditions, setPasswordConditions] = useState({
    minLength: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setPasswordConditions({
      minLength: newPassword.length >= 10,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFieldErrors = (
    fieldName: keyof SignUPForm,
    result: z.SafeParseReturnType<string, string>
  ) => {
    setErrors((prev) => {
      const newErrors = prev ?? {
        fullName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        _errors: [],
      };

      let fieldErrors = result.success
        ? undefined
        : { _errors: result.error.errors.map((e) => e.message) };

      if (fieldName === "confirmPassword") {
        if (password !== confirmPassword) {
          fieldErrors = { _errors: ["Passwords do not match"] };
        }
      }

      return {
        ...newErrors,
        [fieldName]: fieldErrors,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = signUpSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setErrors(result.error.format());
      console.log(result.error.format());
    } else {
      setErrors(null);
      console.log("Form submitted", result.data);
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        setPasswordConditions({
          minLength: false,
          specialChar: false,
          uppercase: false,
          lowercase: false,
          number: false,
        });
        setLoading(false);
      }, 3000);
      // submit to API or further logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {/* Full name */}
      <div className="flex flex-col">
        <label htmlFor="Full name" className="text-[#1A202C] mb-1">
          Full name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => {
            const result = ValidateField("fullName", fullName);
            updateFieldErrors("fullName", result);
          }}
          className={`w-full border px-3 py-2.5 rounded-[4px] placeholder-[#9d9fa4] placeholder:text-[14px] text-[#1A202C] focus:outline-none focus:ring-1 ${
            errors?.fullName
              ? "border-red-500 focus:ring-red-500"
              : "border-[#CBD5E0] focus:ring-[#194BFB]"
          }`}
          required
        />
        {errors?.fullName && (
          <span className="text-red-500 text-sm">
            {errors.fullName._errors[0]}
          </span>
        )}
      </div>
      {/* Email name */}
      <div className="flex flex-col">
        <label htmlFor="Email" className="text-[#1A202C] mb-1">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onBlur={() => {
            const result = ValidateField("email", email);
            updateFieldErrors("email", result);
          }}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border px-3 py-2.5 rounded-[4px] placeholder-[#9d9fa4] placeholder:text-[14px] text-[#1A202C] focus:outline-none focus:ring-1 ${
            errors?.email
              ? "border-red-500 focus:ring-red-500"
              : "border-[#CBD5E0] focus:ring-[#194BFB]"
          }`}
          required
        />
        {errors?.email && (
          <span className="text-red-500 text-sm">
            {errors.email._errors[0]}
          </span>
        )}
      </div>

      {/* password */}
      <div className="flex flex-col relative">
        <label htmlFor="New password" className="text-[#1A202C] mb-1">
          New Password<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="New Password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full border px-3 py-2.5 rounded-[4px] placeholder-[#9d9fa4] placeholder:text-[14px] text-[#1A202C] focus:outline-none focus:ring-1 ${
              errors?.password
                ? "border-red-500 focus:ring-red-500"
                : "border-[#CBD5E0] focus:ring-[#194BFB]"
            }`}
            required
          />

          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-[#9d9fa4] text-[12px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </div>
        </div>
        {errors?.password && (
          <span className="text-red-500 text-sm">
            {errors.password._errors[0]}
          </span>
        )}
      </div>

      {/* confirm password */}
      <div className="flex flex-col">
        <label htmlFor="Confirm password" className="text-[#1A202C] mb-1">
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword2 ? "text" : "password"}
            id="confirmpassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onBlur={() => {
              const result = ValidateField("confirmPassword", confirmPassword);
              updateFieldErrors("confirmPassword", result);
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border px-3 py-2.5 rounded-[4px] placeholder-[#9d9fa4] placeholder:text-[14px] text-[#1A202C] focus:outline-none focus:ring-1 ${
              errors?.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-[#CBD5E0] focus:ring-[#194BFB]"
            }`}
            required
          />

          <div
            className="absolute  right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-[#9d9fa4] text-[12px]"
            onClick={() => setShowPassword2(!showPassword2)}
          >
            {showPassword2 ? "Hide" : "Show"}
          </div>
        </div>
        {errors?.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword._errors[0]}
          </span>
        )}
      </div>

      {/* label */}
      <div className="flex flex-wrap gap-3">
        <Label
          text="Min 10 Characters"
          isFulfilled={passwordConditions.minLength}
        />
        <Label
          text="1 Special Character"
          isFulfilled={passwordConditions.specialChar}
        />
        <Label text="1 Uppercase" isFulfilled={passwordConditions.uppercase} />
        <Label text="1 Lowercase" isFulfilled={passwordConditions.lowercase} />
        <Label text="1 Number" isFulfilled={passwordConditions.number} />
      </div>

      <button
        type="submit"
        className="bg-[#194BFB] py-2 px-4 mt-2 rounded-[6px] flex items-center justify-center"
      >
        {loading ? <LoaderIcon className="animate-spin" /> : "Sign up"}
      </button>
    </form>
  );
}
