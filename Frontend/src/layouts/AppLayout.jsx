import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import VerifyEmailBanner from "../components/common/EmailVerificationBanner";
import { useAuth } from "../context/AuthContext";

const AppLayout = () => {
  const { user } = useAuth()
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Email Verification Banner*/}
        <VerifyEmailBanner user={ user }/>

        {/* Scroll area */}
        <main className="flex-1 overflow-y-auto">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
