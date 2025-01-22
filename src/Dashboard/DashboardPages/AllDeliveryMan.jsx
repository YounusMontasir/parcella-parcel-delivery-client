import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryMans = [], isLoading, error } = useQuery({
        queryKey: ["deliveryman"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/deliverymans");
            
            return res.data.filter(user => user.role === 'deliveryman');
        },
    });

   

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto'>
            <h2 className='mt-16 text-4xl mb-12 text-center'>All Delivery Men</h2>
            <div className="rounded-lg">
            <Table className="overflow-hidden overflow-x-auto rounded-lg shadow-lg border border-gray-300">
                           <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500 ">
                             <TableRow>
                               <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Delivery Man's Name</TableHead>
                               <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Phone Number</TableHead>
                               <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Number of parcels delivered</TableHead>
                               <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Average review</TableHead>
                             </TableRow>
                           </TableHeader >
                           <TableBody>
                             {deliveryMans.map((deliveryMan) => (
                               <TableRow key={deliveryMan._id} className="hover:bg-gray-50 transition duration-200 ">
                                 <TableCell className="font-medium p-4">{deliveryMan.name}</TableCell>
                                 <TableCell className="p-4  ">{deliveryMan.phone ? deliveryMan.phone : "N/A"}</TableCell>
                                 <TableCell className="p-4  ">{deliveryMan.parcelDelivered}</TableCell>
                                 <TableCell className="p-4  ">{deliveryMan.review}</TableCell>
                                 
                               </TableRow>
                             ))}
                           </TableBody>
                         </Table>
            </div>
          
        </div>
    );
};

export default AllDeliveryMan;
