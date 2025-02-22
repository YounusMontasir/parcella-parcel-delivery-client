import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'https://parcella-parcel-delivery-server.vercel.app',
  });
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logoutUser} = useAuth()

  axiosSecure.interceptors.request.use(function (config){
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function(error){
    return Promise.reject(error);
  })

  // intercepts 401 or 403  status
  axiosSecure.interceptors.response.use(function (response){
    return response;
  },async (error)=>{
    const status = error.response.status;
    if(status === 401 || status === 403){
      logoutUser()
      navigate('/auth/login')
    }
    return Promise.reject(error);
  })
    return axiosSecure;
};

export default useAxiosSecure;