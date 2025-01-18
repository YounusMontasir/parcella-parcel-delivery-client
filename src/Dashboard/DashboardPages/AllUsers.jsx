import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
  import { useQuery } from "@tanstack/react-query";
  import React from "react";
import { FaTruck, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
  
  const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
  
    const { data: users = [], refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });
  
    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
          console.log(res.data);
          
          if(res.data.modifiedCount>0){
            refetch()
            Swal.fire({
              position: "center",
              title:`${user.name} is a admin now`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
      const handleMakeDeliveryMan = user =>{
        axiosSecure.patch(`/users/deliveryman/${user._id}`)
        .then(res=>{
          console.log(res.data);
          
          if(res.data.modifiedCount>0){
            refetch()
            Swal.fire({
              position: "center",
              title:`${user.name} is a Delivery Man now`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
  
    return (
      <div className="w-10/12 mx-auto">
        <h1 className="text-4xl text-center">All Users</h1>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="">Actions</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                 {user?.role === 'admin' ? "Admin" :  
                 <button onClick={()=>handleMakeAdmin(user)} className="px-3 py-2 bg-blue-500 text-white rounded">
                      <FaUsers></FaUsers>
                    </button>}
                  </TableCell>
                  <TableCell className=" ">
                    {/* Add any action buttons here */}
                    {user?.role === 'deliveryman' ? "Delivery Man" : <button onClick={()=>handleMakeDeliveryMan(user)} className="px-3 py-2 bg-orange-500 text-white rounded">
                     <FaTruck></FaTruck>
                    </button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };
  
  export default AllUsers;
  