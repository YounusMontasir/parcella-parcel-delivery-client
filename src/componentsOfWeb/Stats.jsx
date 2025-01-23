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
      console.log(res.data);
      return res.data;
    },
  });
  const { data: parcels = [] } = useQuery({
    queryKey: ['Parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get('/parcels');
      console.log(res.data);
      return res.data;
    },
  });

  // Calculate total parcels delivered
  const totalParcelDelivered = users.reduce(
    (total, user) => total + (user.parcelDelivered || 0),
    0
  );

  return (
    <div className='w-10/12 mx-auto my-24 gap-6'>
      <div className='stats shadow w-full'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Downloads</div>
          <div className='stat-value'>
            <CountUp end={users.length} duration={5}>
              {users.length}
            </CountUp>
          </div>
          <div className='stat-desc'>From January 1st to February 1st</div>
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Total Parcels Delivered</div>
          <div className='stat-value'>
            <CountUp end={totalParcelDelivered} duration={5}>
              {totalParcelDelivered}
            </CountUp>
          </div>
         
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>New Registers</div>
          <div className='stat-value'>
            <CountUp end={parcels.length} duration={5}>
             {parcels.length}
            </CountUp>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Stats;
