import React from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Register</h1>

        <form className="space-y-4">
          <Input label="Name" />
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />

          <Button type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  )
}

export default Register
