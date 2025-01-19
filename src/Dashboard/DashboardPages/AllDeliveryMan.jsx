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
            const res = await axiosSecure.get("/users");
            
            return res.data.filter(user => user.role === 'deliveryman');
        },
    });

   

    return (
        <div className='w-10/12 mx-auto'>
            <h2 className='mt-16 text-4xl mb-12 text-center'>All Delivery Men</h2>
            {deliveryMans.length > 0 ? (
               <Table>
                           <TableHeader>
                             <TableRow>
                               <TableHead className="">Delivery Man's Name</TableHead>
                               <TableHead>Phone Number
                               </TableHead>
                               <TableHead>Number of parcels delivered</TableHead>
                               <TableHead className="">Average review</TableHead>
                             </TableRow>
                           </TableHeader>
                           <TableBody>
                             {deliveryMans.map((deliveryMan) => (
                               <TableRow key={deliveryMan._id}>
                                 <TableCell className="font-medium">{deliveryMan.name}</TableCell>
                                 <TableCell>{deliveryMan.phone ? deliveryMan.phone : "N/A"}</TableCell>
                                 <TableCell>{deliveryMan.parcelDelivered}</TableCell>
                                 
                               </TableRow>
                             ))}
                           </TableBody>
                         </Table>
            ) : (
                <p>No delivery men found.</p>
            )}
        </div>
    );
};

export default AllDeliveryMan;
