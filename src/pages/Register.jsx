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
import { Link } from "react-router-dom";
import SocialLogin from "@/componentsOfWeb/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
  const {createUser, updateUserProfile} = useAuth()
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then((result) => {
      const loggedUser = result.user;
      // updateUserProfile(data.name, data.photo).then(() => {
      //   const userInfo = {
      //     name: data.name,
      //     email: data.email,
      //   };
       console.log(loggedUser);
       
      });
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
        const userInfo = {
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          role: data.role,
          image: res.data.data.display_url,
          parcelDelivered,
          parcelBooked
        }
        const usersResponse = axiosPublic.post('/users', userInfo)
      }
      
      

  };
  
  

  return (
    <div className="flex w-10/12 mx-auto">
      <div>
        <img
          src="https://i.ibb.co/Dk1CvPm/Sign-up-rafiki-1.png"
          alt="Sign Up Illustration"
        />
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your Name"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              {...register("phone", { required: true })}
              placeholder="Enter Your Phone Number"
            />
            {errors.phone && (
              <span className="text-red-500">Phone number is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-red-500">Date is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your Password"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>

          {/* Role Select */}
          <div className="mb-4">
            <Label htmlFor="role">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
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
              <span className="text-red-500">Role is required</span>
            )}
          </div>

          {/* File Input */}
          <div className="mb-4">
            <Label htmlFor="file">Upload File</Label>
            <Input
              id="file"
              type="file"
              {...register("image", { required: true })}
            />
            {errors.file && (
              <span className="text-red-500">File upload is required</span>
            )}
          </div>

          {/* Submit Button */}
          <Input
            className="bg-blue-600 text-white cursor-pointer"
            type="submit"
          />
        </form>
        <p>Already have an Account? <Link to='/auth/login' className='text-blue-700 underline'>Signin</Link></p>
        <Separator orientation = "horizontal" className="my-10 bg-gray-400"></Separator>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
