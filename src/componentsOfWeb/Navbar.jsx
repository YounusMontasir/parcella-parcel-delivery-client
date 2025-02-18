import useAdmin from '@/hooks/useAdmin';
import useAuth from '@/hooks/useAuth';
import useDeliveryMan from '@/hooks/useDeliveryMan';
import { BellRing } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from './../assets/asset/parcella-high-resolution-logo.png'
import logo2 from './../assets/asset/logo33.png'

const Navbar = () => {
  const {user, logoutUser} = useAuth()
  // const [isAdmin] = useAdmin()
  // const [isDeliveryMan] = useDeliveryMan()
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
            <div className="navbar  w-11/12 lg:w-10/12 mx-auto ">
  <div className="flex-1">
    <img src={logo2} className='h-12 w-16 lg:h-16 lg:w-20' alt="" />
    <Link to='/' className='text-2xl lg:text-3xl text-[#F06728] font-bold'>Par<span className='text-[#25224B]'>Cella</span></Link>
    
  </div>
  <div className="flex gap-4">
   <Link to='/' className='text-[#F06728] font-bold'>Home</Link>
   <Link to='/aboutus' className='text-[#F06728] font-bold'>About Us</Link>
   <Link to='/contact' className='text-[#F06728] font-bold'>Contact</Link>
     

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
        {/* {
          isAdmin && <> <Link to='/dashboard/statistics'><li>Dashboard</li></Link></>
        }
        {
          isDeliveryMan && <> <Link to='/dashboard/mydeliverylist'><li>Dashboard</li></Link></>
        }
        {
          (!isAdmin && !isDeliveryMan) && <> <Link to='/dashboard/myprofile'><li>Dashboard</li></Link></>
        } */}
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