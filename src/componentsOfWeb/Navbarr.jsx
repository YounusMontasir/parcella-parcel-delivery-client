import useAuth from '@/hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo2 from './../assets/asset/logo33.png'

const Navbarr = () => {
    const {user, logoutUser} = useAuth()
    const route = (
        <>
          <Link to="/" className="text-[#F06728] font-bold">Home</Link>
          <Link to="/aboutus" className="text-[#F06728] font-bold">About Us</Link>
          <Link to="/contact" className="text-[#F06728] font-bold">Contact</Link>
      
          {user && (
            <>
              <Link to="/dashboard" className="text-[#F06728] font-bold">Dashboard</Link>
              <Link to="/dashboard/myprofile" className="text-[#F06728] font-bold">My Profile</Link>
            </>
          )}
        </>
      );
 
  const handleLogout = () =>{
    logoutUser()
    .then(res=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your are successfully logged out",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }
    return (
        <div className='sticky top-0 bg-base-100 z-10'>
            <div class="navbar bg-base-100  w-11/12 lg:w-10/12 mx-auto">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost p-1 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {route}
      </ul>
    </div>
     <div className="flex items-center">
        <img src={logo2} className='h-12 w-16 lg:h-16 lg:w-20' alt="" />
        <Link to='/' className='text-2xl lg:text-3xl text-[#F06728] font-bold'>Par<span className='text-[#25224B]'>Cella</span></Link>
        
      </div>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1 gap-6">
      {route}
    </ul>
  </div>
  <div class="navbar-end">
    <div className="flex gap-4">
       <div className="dropdown dropdown-end">
         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
           <div className="w-10 rounded-full">
             <img
               alt="Tailwind CSS Navbar component"
               src={user ? user.photoURL : "https://i.ibb.co.com/XVTx2L7/icons8-avatar-50.png"} />
           </div>
         </div>
         <ul
           tabIndex={0}
           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
           <li>{user?.displayName ? user.displayName : "Profile"}</li>
          
          <Link to='/dashboard'><li>Dashboard</li></Link>
           {
             user ? <li onClick={handleLogout}>Logout</li> : <Link to='/auth/login'><li>Login</li></Link>
           }
         </ul>
       </div>
     </div>
  </div>
</div>
        </div>
    );
};

export default Navbarr;