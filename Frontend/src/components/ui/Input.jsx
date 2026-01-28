import React from 'react'

const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Input
