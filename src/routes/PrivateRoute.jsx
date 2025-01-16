
import useAuth from '@/hooks/useAuth';
import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loading, user} = useAuth();
    const location = useLocation()
    if(loading){
        return <p>Loading...</p>
    }
    if(user){
        return children
    }
    return <Navigate to='/auth/login' state={location.pathname} ></Navigate>

};

export default PrivateRoute;
