import React from "react";
import { Route, Routes } from "react-router-dom";

const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/register" element={<h1>Register Page</h1>} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
    </Routes>
  );
};

export default routes;
