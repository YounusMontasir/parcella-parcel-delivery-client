import React from "react";
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





const Dashboard = () => {
  return (
    <SidebarProvider>
       <Sidebar >
      <SidebarHeader>
       Welcome to Younus Montasir
      </SidebarHeader>
      <Separator orientation="horizontal" className=" h-1" />
      <SidebarContent>
        <SidebarGroup className="space-y-2 mt-6">
        <Button className=""><NavLink to='/dashboard/allusers'>All Users</NavLink></Button>
        <Button className=""><NavLink to='/dashboard/allparcels'>All Parcels</NavLink></Button>
        <Button className=""><NavLink to='/dashboard/allusers'>All Delivery Man</NavLink></Button>
        <Button className=""><NavLink to='/dashboard/allusers'>Stattistics</NavLink></Button>
        </SidebarGroup>
       <ul className="mt-6 ">
        
        
       </ul>
       
       
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
        </header>
       <div className=" ">
        <Outlet></Outlet>
       </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
