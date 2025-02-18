import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate()
    const handleNavigate =() =>{
        navigate("/")
    }
    return (
        <div>
            <div className='flex justify-center items-center'>
                <img src="https://i.ibb.co.com/Cs25kks/error-404.png" alt="" />
            </div>
            <div className='flex justify-center mt-6'>
            <Link onClick={handleNavigate} className ="btn text-white bg-red-600 ">Go Back</Link>
            </div>
        </div>
    );
};

export default ErrorPage;