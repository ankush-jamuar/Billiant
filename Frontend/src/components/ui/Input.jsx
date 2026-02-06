import { useState } from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "        // ✅ ALWAYS invisible placeholder
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
        className={`
          peer w-full rounded-xl border bg-white px-4 pb-3 pt-6 text-sm
          text-slate-900 outline-none transition-all
          ${focused
            ? "border-indigo-600 ring-4 ring-indigo-600/10"
            : "border-slate-300"}
        `}
      />

      {/* Floating label */}
      <label
        className={`
          absolute left-4 top-2 text-xs transition-all
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:text-slate-400
          peer-focus:top-2
          peer-focus:text-xs
          peer-focus:text-indigo-600
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
