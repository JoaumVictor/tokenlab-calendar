import { classNames } from "@/util/shared";
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputI {
  label: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  error: string | undefined;
  touched: boolean | undefined;
  handleBlur: (e: any) => void;
  placeholder: string;
  type?: "text" | "password";
  eyeInPassword?: boolean;
}

export default function Input({
  touched,
  handleBlur,
  name,
  label,
  value = "",
  onChange,
  error,
  placeholder,
  type = "text",
  eyeInPassword = true,
}: InputI) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center w-full my-4 flex-nowrap relative">
      <div className="flex items-center justify-between w-full">
        <label
          className="text-[12px] text-primary font-ubuntu-bold"
          htmlFor="email"
        >
          {label}
        </label>
        {error && touched && (
          <span className="font-bold text-red-500 text-[12px] w-2/3 text-end">
            {error}
          </span>
        )}
      </div>
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        className={classNames(
          "w-full h-12 border outline-none rounded-[8px] text-secondary px-4 focus:border-primary",
          error && touched ? "border-red-500" : "border-gray-300"
        )}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
      {eyeInPassword && type === "password" && (
        <div className="absolute bottom-0 right-0 h-12 w-12 flex items-center justify-center">
          {showPassword ? (
            <FaRegEyeSlash
              className="cursor-pointer text-[22px] my-auto"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEye
              className="cursor-pointer text-[22px] my-auto"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
