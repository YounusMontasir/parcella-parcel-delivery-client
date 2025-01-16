import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
       if(loading || isAdminLoading){
           return <span class="loading loading-spinner loading-lg"></span>
       }
       if(user && isAdmin){
           return children
       }
       return <Navigate to='/auth/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;