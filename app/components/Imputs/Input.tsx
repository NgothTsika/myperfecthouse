"use client";

import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrince?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrince,
  required,
  register,
  errors,
}) => {
  return (
    <div className=" w-full  relative ">
      {formatPrince && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrince ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "border-rose-500" : "focus:border-black"
        }`}
      />
      <label
        className={`absolute text-base duration-150 transform transfrom -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrince ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
