import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const axiosPublic = useAxiosPublic()
    const {data} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/users')
            console.log(res.data);
            
        }
    })
    return (
        <div>
            <h1 className='text-4xl text-center'>All Users</h1>
        </div>
    );
};

export default AllUsers;