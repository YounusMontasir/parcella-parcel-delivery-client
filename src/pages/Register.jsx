import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "@/componentsOfWeb/SocialLogin";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
  const {createUser, updateUserProfile, setUser} = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    // console.log(data);
      // send to imgbb imagebb
      const imageFile = {image: data.image[0]}
      const res  = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
              'Content-type': 'multipart/form-data'
          }
      })
      // console.log(res.data);
      if(res.data.success){
        const parcelDelivered = 0;
        const parcelBooked = 0;
        const averageReview =parseFloat(0)
        const userInfo = {
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          role: data.role,
          image: res.data.data.display_url,
          parcelDelivered,
          parcelBooked,
          averageReview

        }
        createUser(data.email, data.password)
    .then((result) => {
      const loggedUser = result.user;
      setUser(loggedUser)
      //  console.log(loggedUser);
       updateUserProfile(data.name, res.data.data.display_url)
       Swal.fire({
                         position: "center",
                         icon: "success",
                         title: "Your are successfully logged in",
                         showConfirmButton: false,
                         timer: 1500
                       });
      });
        
        
        const usersResponse = axiosPublic.post('/users', userInfo)
        // navigate("/")
      }
      
      

  };
  
  

  return (
    <div>
    <h1 className="text-3xl lg:text-4xl text-center text-[#25224B]  mt-8 font-bold">
      Sign up to <span className="text-[#F06728]">ParCella</span>
    </h1>
    <div className="flex flex-col lg:flex-row w-11/12 lg:w-10/12 mx-auto p-6 lg:p-10">
      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <img
          className="h-auto"
          src="https://i.ibb.co/Dk1CvPm/Sign-up-rafiki-1.png"
          alt="Sign Up Illustration"
        />
      </div>
  
      {/* Form Section */}
      <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-6 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("name", { required: true })}
              placeholder="Enter your Name"
            />
            {errors.name && (
              <span className="text-sm text-red-500">Name is required</span>
            )}
          </div>
  
          {/* Phone Input */}
          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="text"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("phone", { required: true })}
              placeholder="Enter Your Phone Number"
            />
            {errors.phone && (
              <span className="text-sm text-red-500">
                Phone number is required
              </span>
            )}
          </div>
  
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>
  
          {/* Date Input */}
          <div>
            <Label htmlFor="date" className="text-gray-700 font-medium">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-sm text-red-500">Date is required</span>
            )}
          </div>
  
          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("password", { required: true })}
              placeholder="Enter your Password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                Password is required
              </span>
            )}
          </div>
  
          {/* Role Select */}
          <div>
            <Label htmlFor="role" className="text-gray-700 font-medium">
              Role
            </Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deliveryman">Deliveryman</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <span className="text-sm text-red-500">Role is required</span>
            )}
          </div>
  
          {/* File Input */}
          <div>
            <Label htmlFor="file" className="text-gray-700 font-medium">
              Upload File
            </Label>
            <Input
              id="file"
              type="file"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("image", { required: true })}
            />
            {errors.file && (
              <span className="text-sm text-red-500">
                File upload is required
              </span>
            )}
          </div>
  
          {/* Submit Button */}
          <Input
            className="w-full bg-[#F06728] text-white font-bold rounded-lg py-2 cursor-pointer hover:bg-[#25224B]"
            type="submit"
            value="Sign Up"
          />
        </form>
  
        <p className="mt-4 text-center text-gray-700">
          Already have an Account?{" "}
          <Link to="/auth/login" className="text-blue-700 underline">
            Sign in
          </Link>
        </p>
        <Separator orientation="horizontal" className="my-10 bg-gray-400"></Separator>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  </div>
  
  );
};

export default Register;
