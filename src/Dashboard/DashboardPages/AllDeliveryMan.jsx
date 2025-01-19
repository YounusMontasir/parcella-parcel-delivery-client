import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';

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
        <div>
            <h2>All Delivery Men</h2>
            {deliveryMans.length > 0 ? (
               <p>{deliveryMans.length}</p>
            ) : (
                <p>No delivery men found.</p>
            )}
        </div>
    );
};

export default AllDeliveryMan;
