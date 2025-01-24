import useAuth from '@/hooks/useAuth';
import useDeliveryMan from '@/hooks/useDeliveryMan';
import React from 'react';
import { useLocation } from 'react-router-dom';

const DeliveryManRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isDeliveryMan, isDeliveryManLoading]= useDeliveryMan()
    const location = useLocation()
    // console.log({loading}, {isDeliveryManLoading});
    
       if(loading || isDeliveryManLoading){
        return <p>Loading...</p>
       }
       if(user && isDeliveryMan){
           return children
       }
       return <Navigate to='/auth/login' state={location.pathname}></Navigate>
};

export default DeliveryManRoute;