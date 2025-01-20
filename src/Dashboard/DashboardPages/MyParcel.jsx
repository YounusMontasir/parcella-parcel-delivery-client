import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPublic from "@/hooks/useAxiosPublic";


const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {  register,
    handleSubmit,
    control, } = useForm()
  const onSubmit =async (data) => {
    console.log(data)
    const reviewInfo = {
      userName: data.name,
      usersImage: data.photo,
      review: data.review,
      feedback: data.feedback,
      deliveryManId: data.deliveryManId
    }
    const res =await axiosPublic.post('/reviews', reviewInfo)
    console.log(res.data);
    
    if(res.data.insertedId){
      Swal.fire({
                position: "center",
                icon: "success",
                title: "Thanks For Your Review",
                showConfirmButton: false,
                timer: 1500
          });
    }
  }

  

  const [statusFilter, setStatusFilter] = useState("all");

  const { data: myParcels = [], refetch } = useQuery({
    queryKey: [user?.email, "parcels", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user.email}`);
      if (statusFilter === "all") {
        return res.data;
      }
      return res.data.filter(parcel => parcel.bookingStatus === statusFilter);
    },
  });

  const handleCancel = async (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/parcels/cancel/${parcel._id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Cancelled!",
            text: "Your file has been cancelled.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-4xl text-center mb-12 mt-12">My Parcels</h1>
      {/* Filter booking status */}
      <div className="mb-4">
        <Label htmlFor="statusFilter">Booking Status</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Booking Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="ontheway">On the Way</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Parcel Type</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Delivery Man Id</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead className="">Actions</TableHead>
              <TableHead className="">Actions</TableHead>
              <TableHead>Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myParcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                <TableCell>{parcel.deliveryDate}</TableCell>
                <TableCell>{parcel.approximateDeliveryDate}</TableCell>
                <TableCell>{parcel.bookingDate}</TableCell>
                <TableCell>{parcel.deliveryManId}</TableCell>
                <TableCell>{parcel.bookingStatus}</TableCell>
                <TableCell>
                  <Link to={`/dashboard/updatebooking/${parcel._id}`}>
                    <button
                      disabled={parcel.bookingStatus !== "pending"}
                      className={`px-2 py-2 rounded text-white ${
                        parcel.bookingStatus === "pending"
                          ? "bg-orange-500"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Update
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleCancel(parcel)}
                    disabled={parcel.bookingStatus !== "pending"}
                    className={`px-2 py-2 rounded text-white ${
                      parcel.bookingStatus === "pending"
                        ? "bg-blue-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Cancel
                  </button>
                </TableCell>
                {/* give review */}
                <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                      <Button disabled={parcel.bookingStatus !== "delivered"}
                       variant="outline">Review</Button>
                    </DialogTrigger>
                    <DialogContent className="w-6/12">
                      <DialogHeader>
                        <DialogTitle>Riview</DialogTitle>
                      </DialogHeader>
                     <div>
                     <form className=" grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-4">
            <Label htmlFor="name">User's Name</Label>
            <Input
            defaultValue={user?.displayName}
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your Name"
            />
            
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <Label htmlFor="phone">Photo URL</Label>
            <Input
            defaultValue={user.photoURL}
              id="photo"
              type="text"
              {...register("photo", { required: true })}
              placeholder="Enter Your Phone Number"
            />
           
          </div>

          {/* Delivery Man Id Input */}
          <div className="mb-4">
            <Label htmlFor="deliveryManId">Delivery Man Id</Label>
            <Input
            defaultValue={parcel.deliveryManId}
              id="deliveryManId"
              type="text"
              {...register("deliveryManId", { required: true })}
              placeholder="Delivery Man Id"
            />
          
          </div>

          

         

          {/* Role Select */}
          <div className="mb-4">
            <Label htmlFor="review">Review</Label>
            <Controller
              name="review"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="review">
                    <SelectValue placeholder="Select Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
           
          </div>
          <div className="mb-4 col-span-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea 
              id=""
              type="text"
              {...register("feedback", { required: true })}
              placeholder="Enter your feedback"
            />
          
          </div>
          

          {/* Submit Button */}
         <DialogFooter className='col-span-2'>
         <Input 
            className="bg-blue-600  text-white cursor-pointer"
            type="submit"
          />
         </DialogFooter>
        </form>
                     </div>
                      
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyParcel;
