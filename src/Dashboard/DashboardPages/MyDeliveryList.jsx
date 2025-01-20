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
        <div className='w-10/12 mx-auto'>
           <h1 className="text-4xl text-center mb-12 mt-12">My Delivery List</h1>
           <div>
           <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Booked User’s Name</TableHead>
              <TableHead>Receivers Name</TableHead>
              <TableHead>Booked User’s Phone</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Receivers phone number</TableHead>
              <TableHead>Receivers Address</TableHead>
              <TableHead className="">Actions</TableHead>
              <TableHead className="">Actions</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryLists.map((deliveryList) => (
              <TableRow key={deliveryList._id}>
                <TableCell className="font-medium">{deliveryList.name}</TableCell>
                <TableCell>{deliveryList.receiversName}</TableCell>
                <TableCell>{deliveryList.phone}</TableCell>
                <TableCell>{deliveryList.deliveryDate}</TableCell>
                <TableCell>{deliveryList.approximateDeliveryDate}</TableCell>
                <TableCell>{deliveryList.receiversPhone}</TableCell>
                <TableCell>{deliveryList.deliveryAddress}</TableCell>
                <TableCell>
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
                    className={`px-2 py-2 rounded bg-orange-500`}
                  >
                    {deliveryList.bookingStatus ==="delivered" ? "Delivered" : "Deliver"}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleCancel(deliveryList)}
                    disabled={deliveryList.bookingStatus === "cancelled"}
                    className={`px-2 py-2 rounded bg-orange-500`}
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