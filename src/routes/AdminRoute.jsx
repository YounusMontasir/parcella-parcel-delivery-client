import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';
import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
       if(loading || isAdminLoading){
        return <p>Loading...</p>
       }
       if(user && isAdmin){
           return children
       }
       return <Navigate to='/auth/login' state={location.pathname}></Navigate>
};

export default AdminRoute;