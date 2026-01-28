import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
