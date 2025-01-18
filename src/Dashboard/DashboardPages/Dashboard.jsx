import React, { useContext } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAdmin from './../../hooks/useAdmin';
import useDeliveryMan from "@/hooks/useDeliveryMan";
import { AuthContext } from "@/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";





const Dashboard = () => {
  const {user} = useAuth()
  // console.log(user.email);
  
  
  const [isAdmin] = useAdmin()
  const [isDeliveryMan] = useDeliveryMan()
  // const axiosSecure = useAxiosSecure()
  // const { data: userRole={}, refetch, isLoading } = useQuery({
  //   queryKey: [user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users?email=${user.email}`);
  //     console.log(res.data);
      
  //     return res.data;
  //   },
  // });

  
  

  

  return (
    <SidebarProvider >
       <Sidebar className="w-64">
      <SidebarHeader>
       Welcome to Younus Montasir
      </SidebarHeader>
      <Separator orientation="horizontal" className=" h-1" />
      <SidebarContent>
       
        {/* for deliveryman */}
        {/* My Delivery List, and My Reviews */}
       {/* {userRole.role === 'admin' && 
        <SidebarGroup>
          
        </SidebarGroup>
       } */}
        {/* {userRole.role === 'deliveryman' && 
        <SidebarGroup className="space-y-2 mt-6">
          
           </SidebarGroup>
        } */}
          
          <SidebarGroup className="space-y-2 mt-6">
            
          { isAdmin &&
            <>
            <Button className="bg-blue-600"><NavLink to='/dashboard/allusers'>All Users</NavLink></Button>
      <Button className="bg-blue-600"><NavLink to='/dashboard/allparcels'>All Parcels</NavLink></Button>
      <Button className="bg-blue-600"><NavLink to='/dashboard/allusers'>All Delivery Man</NavLink></Button>
      <Button className="bg-blue-600"><NavLink to='/dashboard/statistics'>Statistics</NavLink></Button>
            </>
          }
           {
            isDeliveryMan && <>
            <Button className="bg-blue-600"><NavLink to='/dashboard/mydeliverylist'>My Delivery List</NavLink></Button>
            <Button className="bg-blue-600"><NavLink to='/dashboard/myreviews'>My Reviews</NavLink></Button>
            </>
           }
           {(!isAdmin && !isDeliveryMan) && <>
           
            <Button className="bg-blue-600"><NavLink to='/dashboard/bookaparcel'>Book a Parcel</NavLink></Button>
          <Button className="bg-blue-600"><NavLink to='/dashboard/myparcels'>My Parcels</NavLink></Button>
          <Button className="bg-blue-600"><NavLink to='/dashboard/myprofile'>My Profile</NavLink></Button>
           </>}
           </SidebarGroup>
  
        <Separator orientation="horizontal" className="bg-black ml-3 mr-3 h-1 w-10/12"></Separator>
        <SidebarGroup>
        <Button className=""><NavLink to='/'>Home</NavLink></Button>
        </SidebarGroup>
       
       
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
      <SidebarInset >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
        </header>
       <div className="flex-1">
        <Outlet></Outlet>
       </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
