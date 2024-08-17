import { Link, NavLink } from "react-router-dom";

import Logo from "../../ui/logo";
import { cn } from "../../../utils";
import dashboardLinks from "../../../configs/dashboard-links";

const MobilDashboardSidebar = () => {
  return (
    <div className="md:hidden">
      <Link to="/">
        <Logo className="text-white" />
      </Link>

      <div className="flex items-center justify-center flex-col mt-8 space-y-6">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "text-white hover:text-gray-300 transition p-2 rounded-md",
                isActive && "text-primary bg-white hover:text-primary"
              )
            }
          >
            <link.icon className="size-6" />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobilDashboardSidebar;
