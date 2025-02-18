import React, { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAdmin from "./../../hooks/useAdmin";
import useDeliveryMan from "@/hooks/useDeliveryMan";
import { FaBookmark } from "react-icons/fa";
import { BookAIcon, ChartNoAxesCombined, Home, Package, PersonStanding, Truck, User, User2Icon, Users } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();

  const activeClassName = "bg-[#F06728] text-white"; // Active button class
  const inactiveClassName = " hover:bg-[#25224B] hover:text-white";

  return (
    <SidebarProvider className="bg-[#F06728]">
      <Sidebar className="w-64 ">
        <SidebarHeader className='text-xl'>Welcome to ParCella</SidebarHeader>
        <Separator orientation="horizontal" className="h-[1px] mt-6 w-10/12 mx-auto" />
        <SidebarContent>
          <SidebarGroup className="space-y-2 mt-6">
            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                 <div className="flex items-center gap-2"><Users></Users> All Users </div>
                </NavLink>
                <NavLink
                  to="/dashboard/allparcels"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                 <div className="flex items-center gap-2"><Package></Package> All Parcels </div>
                </NavLink>
                <NavLink
                  to="/dashboard/alldeliveryman"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                  <div className="flex items-center gap-2"><Truck></Truck> All Delivery Man </div>
                </NavLink>
                <NavLink
                  to="/dashboard/statistics"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                   <div className="flex items-center gap-2"><ChartNoAxesCombined></ChartNoAxesCombined> Statistics </div>
                </NavLink>
              </>
            )}
            {isDeliveryMan && (
              <>
                <NavLink
                  to="/dashboard/mydeliverylist"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                  My Delivery List
                </NavLink>
                <NavLink
                  to="/dashboard/myreviews"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                  My Reviews
                </NavLink>
              </>
            )}
            {!isAdmin && !isDeliveryMan && (
              <>
                <NavLink
                  to="/dashboard/bookaparcel"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                 <div className="flex items-center gap-2"><BookAIcon></BookAIcon> Book a Parcel </div>
                </NavLink>
                <NavLink
                  to="/dashboard/myparcels"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                   <div className="flex items-center gap-2"><Package></Package>My Parcel </div>
                </NavLink>
                
              </>
            )}
            <NavLink
                  to="/dashboard/myprofile"
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
                  }
                >
                  <div className="flex items-center gap-2"><User></User> My Profile </div>
                </NavLink>
          </SidebarGroup>
          <Separator orientation="horizontal" className="bg-gray-400 my-6 mx-auto h-[1px] w-10/12" />
          <SidebarGroup>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full text-left px-4 py-2 rounded-lg ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <div className="flex items-center gap-2"><Home></Home>Home </div>
            </NavLink>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
