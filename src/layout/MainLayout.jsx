import React from 'react';
import Navbar from '../componentsOfWeb/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../componentsOfWeb/Footer';
import Navbarr from '@/componentsOfWeb/Navbarr';

const MainLayout = () => {
    return (
        <div>
           <Navbarr></Navbarr>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;