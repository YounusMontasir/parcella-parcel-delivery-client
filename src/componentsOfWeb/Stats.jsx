import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CountUp from 'react-countup';

const Stats = () => {
  const axiosPublic = useAxiosPublic();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users/stats/stat');
      return res.data;
    },
  });

  const { data: parcels = [] } = useQuery({
    queryKey: ['Parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get('/parcels');
      return res.data;
    },
  });

  // Calculate total parcels delivered
  const totalParcelDelivered = users.reduce(
    (total, user) => total + (user.parcelDelivered || 0),
    0
  );

  return (
    <div className='w-11/12 lg:w-10/12 mx-auto my-24'>
      <h2 className='text-4xl font-bold text-center mb-12'>
        Platform Statistics
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Downloads */}
        <div className='bg-white shadow-lg rounded-lg p-8 text-center'>
          <h3 className='text-xl font-semibold text-gray-600'>Downloads</h3>
          <div className='text-5xl font-bold text-blue-600 my-4'>
            <CountUp end={users.length} duration={5} />
          </div>
          <p className='text-gray-500'>From January 1st to February 1st</p>
        </div>

        {/* Total Parcels Delivered */}
        <div className='bg-white shadow-lg rounded-lg p-8 text-center'>
          <h3 className='text-xl font-semibold text-gray-600'>
            Total Parcels Delivered
          </h3>
          <div className='text-5xl font-bold text-green-600 my-4'>
            <CountUp end={totalParcelDelivered} duration={5} />
          </div>
          <p className='text-gray-500'>Across all regions</p>
        </div>

        {/* New Registers */}
        <div className='bg-white shadow-lg rounded-lg p-8 text-center'>
          <h3 className='text-xl font-semibold text-gray-600'>
            New Registers
          </h3>
          <div className='text-5xl font-bold text-purple-600 my-4'>
            <CountUp end={parcels.length} duration={5} />
          </div>
          <p className='text-gray-500'>This month</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
