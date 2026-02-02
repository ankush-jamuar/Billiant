import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Dashboard from "../pages/dashboard/Dashboard";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import Clients from "../pages/clients/Clients";
import Invoices from "../pages/invoices/Invoices";
import NewInvoice from "../pages/invoices/NewInvoice";
import InvoiceDetails from "../pages/invoices/InvoiceDetails";
import EditInvoice from "../pages/invoices/EditInvoice";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Settings from "../pages/settings/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/new/" element={<NewInvoice />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
        <Route path="/invoices/:id/edit" element={<EditInvoice />} />
        <Route path="/profile" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
