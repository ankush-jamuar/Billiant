import React from "react";

const Button = ({ children, type = "button", disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;
