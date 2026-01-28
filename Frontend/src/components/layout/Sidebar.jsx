import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">
      <h2 className="text-xl font-bold mb-6">Billiant</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block text-gray-700">
          Dashboard
        </Link>
        <Link to="/clients" className="block text-gray-700">
          Clients
        </Link>
        <Link to="/invoices" className="block text-gray-700">
          Invoices
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
