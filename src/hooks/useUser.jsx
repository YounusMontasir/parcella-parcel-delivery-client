import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: deliveryData} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
       
    })
    return {deliveryData}
};

export default useUser;