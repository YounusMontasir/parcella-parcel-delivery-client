import useAuth from '@/hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {user, logoutUser} = useAuth()
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
        <div>
            <div className="navbar bg-base-100 w-10/12 mx-auto">
  <div className="flex-1">
    <img src="https://i.ibb.co.com/dD9GjDq/freepik-parcella-logo.png" className='h-10 w-10' alt="" />
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
    );
};

export default Navbar;