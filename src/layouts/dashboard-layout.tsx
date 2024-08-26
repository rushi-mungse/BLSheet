import { Navigate, Outlet } from "react-router-dom";
import { Avatar } from "antd";

import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar";
import useUserInfo from "../hooks/useUserInfo";
import { URLS } from "../constants";

const DashboardLayout = () => {
  const { isAuth, user } = useUserInfo();
  if (!isAuth) return <Navigate to={URLS.signInPageUrl} />;

  return (
    <div className="min-h-screen flex flex-row">
      <DashboardSidebar />
      <div className="flex flex-col py-3 px-6 w-[calc(100vw_-100px)] lg:w-[calc(100vw_-300px)]">
        <div className="h-12 flex items-center justify-end space-x-6">
          <div className="flex items-center justify-center space-x-1">
            <Avatar className="bg-primary">
              {user?.fullName[0].toUpperCase()}
            </Avatar>
            <span className="text-primary text-sm font-medium">
              {user?.fullName}
            </span>
          </div>
        </div>
        <div className="h-[calc(100vh_-100px)] bg-white border rounded-lg overflow-auto p-5 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
