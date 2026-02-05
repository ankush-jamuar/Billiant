import React from "react";

const Button = ({
  children,
  type = "button",
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
      className="
        w-full rounded-xl bg-indigo-600 py-3 font-medium text-white
        hover:bg-indigo-700 active:scale-[0.99]
        transition-all duration-200
        shadow-lg shadow-indigo-600/20
      "
    >
      {children}
    </button>
  );
};

export default Button;
