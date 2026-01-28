import React from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Login</h1>

        <form className="space-y-4">
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
