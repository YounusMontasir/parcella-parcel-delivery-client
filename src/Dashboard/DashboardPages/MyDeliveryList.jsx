import React from 'react';
import useUser from './../../hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Link } from 'react-router-dom';

const MyDeliveryList = () => {
    const {deliveryData} = useUser()
    const axiosSecure = useAxiosSecure()
  
   
   
    const {data: deliveryLists=[], refetch} = useQuery({
        queryKey: ['parcels', deliveryData?._id],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/parcels/deliverylist/${deliveryData._id}`)
            console.log(res.data);
            return res.data;
            
        
        }    
    })
     const handleCancel = async (deliveryList) => {
       
        
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Cancel it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.patch(`/parcels/cancel/${deliveryList._id}`);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your file has been cancelled.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              refetch();
            }
          }
        });
      };
      const handleDeliver = async (deliveryList) => {
       
        
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Deliver it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.patch(`/parcels/deliver/${deliveryList._id}`);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Delivered!",
                text: "Your Product has been delivered.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              refetch();
            }
          }
        });
      };
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto'>
           <h1 className="text-4xl text-center mb-12 mt-12">My Delivery List</h1>
           <div className="rounded-lg">
           <Table className="overflow-hidden overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500 ">
            <TableRow>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Booked User’s Name</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Receivers Name</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Booked User’s Phone</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Requested Delivery Date</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Approximate Delivery Date</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Receivers phone number</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Receivers Address</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Actions</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Actions</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryLists.map((deliveryList) => (
              <TableRow key={deliveryList._id}>
                <TableCell className="font-medium p-4" >{deliveryList.name}</TableCell>
                <TableCell className="p-4  ">{deliveryList.receiversName}</TableCell>
                <TableCell className="p-4  ">{deliveryList.phone}</TableCell>
                <TableCell className="p-4  ">{deliveryList.deliveryDate}</TableCell>
                <TableCell className="p-4  ">{deliveryList.approximateDeliveryDate}</TableCell>
                <TableCell className="p-4  ">{deliveryList.receiversPhone}</TableCell>
                <TableCell className="p-4  ">{deliveryList.deliveryAddress}</TableCell>
                <TableCell className="p-4  ">
                  <Link >
                    <button className='px-2 py-2 rounded bg-orange-500'
                    >
                      Location
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeliver(deliveryList)}
                    disabled={deliveryList.bookingStatus === "delivered"}
                    className={`px-2 py-2 rounded bg-orange-500 ${
                      deliveryList.bookingStatus === "cancelled" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {deliveryList.bookingStatus ==="delivered" ? "Delivered" : "Deliver"}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleCancel(deliveryList)}
                    disabled={deliveryList.bookingStatus === "cancelled"}
                    className={`px-2 py-2 rounded bg-orange-500 ${
                      deliveryList.bookingStatus === "delivered" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {deliveryList.bookingStatus ==="cancelled" ? "Cancelled" : "Cancel"}
                  </button>
                </TableCell>
                {/* give review */}
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
           </div>
        </div>
    );
};

export default MyDeliveryList;