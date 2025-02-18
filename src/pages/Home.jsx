import React from 'react';
import Banner from '../componentsOfWeb/Banner';
import Features from '../componentsOfWeb/Features';
import Stats from '../componentsOfWeb/Stats';
import TopDeliveryMan from '@/componentsOfWeb/TopDeliveryMan';
import FAQ from '@/componentsOfWeb/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Stats></Stats>
            <TopDeliveryMan></TopDeliveryMan>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;