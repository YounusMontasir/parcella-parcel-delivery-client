import React from 'react';
import Navbar from '../componentsOfWeb/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../componentsOfWeb/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;