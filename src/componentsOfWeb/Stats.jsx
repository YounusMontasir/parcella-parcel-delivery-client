import React from 'react';
import CountUp from 'react-countup';

const Stats = () => {
    return (
        <div className='w-10/12 mx-auto my-24 gap-6'> 
            <div class="stats shadow w-full">
  <div class="stat place-items-center">
    <div class="stat-title">Downloads</div>
    <div class="stat-value">
    <CountUp end={80} duration={5}>
        80
        </CountUp>
    </div>
    <div class="stat-desc">From January 1st to February 1st</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Users</div>
    <div class="stat-value">
        <CountUp end={4200} duration={5}>
        4,200
        </CountUp>
        </div>
    <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">New Registers</div>
    <div class="stat-value">
    <CountUp end={100} duration={5}>
        100
        </CountUp>
    </div>
    <div class="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
        </div>
    );
};

export default Stats;