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

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
              {...register("file", { required: true })}
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
      </div>
    </div>
  );
};

export default Register;
