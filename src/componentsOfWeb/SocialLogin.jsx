import React from 'react';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const { loginWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation()

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(res => {
                
                
                const date = new Date();
                const parcelDelivered = 0;
                const parcelBooked = 0;
                const averageReview = 0
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    role: 'user',
                    date: formatDate(date),
                    image: res.user?.photoURL,  // Use the formatted date here
                    parcelDelivered,
                    parcelBooked,
                    averageReview
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                       
                        navigate(location?.state ? location.state : "/");
                    })
                    .catch(err => {
                        console.error('Error saving user info:', err);
                    });
            })
            .catch(err => {
                console.error('Google login error:', err);
            });
    };

    return (
        <div>
            <Button onClick={handleGoogleLogin} className="btn w-full mx-auto">
                <FaGoogle /> Google
            </Button>
        </div>
    );
};

export default SocialLogin;
