import Footer from '@/componentsOfWeb/Footer';
import Navbarr from '@/componentsOfWeb/Navbarr';

import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
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

export default AuthLayout;