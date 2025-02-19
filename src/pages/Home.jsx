import React from 'react';
import Banner from '../componentsOfWeb/Banner';
import Features from '../componentsOfWeb/Features';
import Stats from '../componentsOfWeb/Stats';
import TopDeliveryMan from '@/componentsOfWeb/TopDeliveryMan';
import FAQ from '@/componentsOfWeb/FAQ';
import Brands from '@/componentsOfWeb/Brands';
import ParcelBooking from '@/componentsOfWeb/ParcelBooking';
import Review from '@/componentsOfWeb/Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Stats></Stats>
            <ParcelBooking></ParcelBooking>
            <TopDeliveryMan></TopDeliveryMan>
            <FAQ></FAQ>
            <Brands></Brands>
            <Review></Review>
        </div>
    );
};

export default Home;