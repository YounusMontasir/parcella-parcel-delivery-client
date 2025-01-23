import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const UpdateBookingParcel = () => {
  const { user } = useAuth();
  const myParcels = useLoaderData();
  const {
    deliveryAddress,
    deliveryDate,
    deliveryLatitude,
    deliveryLongitude,
    email,
    name,
    parcelType,
    phone,
    receiversName,
    receiversPhone,
    parcelWeight,
    price,
  } = myParcels;

  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, // Allows programmatically setting values in the form
    formState: { errors },
  } = useForm();

  const { id } = useParams(); // Assuming `id` is passed in the route

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    const date = new Date();
    const deliveryInfo = {
      deliveryAddress: data.deliveryAddress,
      deliveryDate: data.deliveryDate,
      deliveryLatitude: data.deliveryLatitude,
      deliveryLongitude: data.deliveryLongitude,
      email: data.email,
      name: data.name,
      parcelType: data.parcelType,
      parcelWeight: data.parcelWeight,
      phone: data.phone,
      price: data.price,
      receiversName: data.receiversName,
      receiversPhone: data.receiversPhone,
      bookingStatus: "pending",
      bookingDate: formatDate(date),
    };

    try {
      const res = await axiosPublic.patch(`/parcels/update/${id}`, deliveryInfo);
      if (res.data.modifiedCount) {
        reset()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Parcel is Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update the parcel",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const watchedParcelWeight = watch("parcelWeight");

  // Calculate the price based on parcel weight
  const calculatePrice = () => {
    if (!watchedParcelWeight) return "";
    const weight = parseFloat(watchedParcelWeight);
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const calculatedPrice = calculatePrice();

  // Update the `price` in the form data whenever it changes
  useEffect(() => {
    setValue("price", calculatedPrice);
  }, [calculatedPrice, setValue]);

  return (
   <Card className="w-full max-w-4xl mx-auto mt-8 shadow-lg">
         <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
           <CardTitle className="text-3xl font-bold text-center">Update A Parcel</CardTitle>
         </CardHeader>
         <CardContent className="p-6">
         <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                defaultValue={name || user?.displayName}
                id="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={email || user?.email}
                id="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                defaultValue={phone}
                id="phone"
                type="text"
                {...register("phone", { required: true })}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Parcel Type */}
            <div className="mb-4">
              <Label htmlFor="parcelType">Parcel Type</Label>
              <Input
                defaultValue={parcelType}
                id="parcelType"
                type="text"
                {...register("parcelType", { required: true })}
                placeholder="Enter your parcel type"
              />
            </div>

            {/* Parcel Weight */}
            <div className="mb-4">
              <Label htmlFor="parcelWeight">Parcel Weight</Label>
              <Input
                defaultValue={parcelWeight}
                id="parcelWeight"
                type="number"
                {...register("parcelWeight", { required: true })}
                placeholder="Enter the parcel weight"
              />
            </div>

            {/* Receiver's Name Input */}
            <div className="mb-4">
              <Label htmlFor="receiversName">Receiver's Name</Label>
              <Input
                defaultValue={receiversName}
                id="receiversName"
                type="text"
                {...register("receiversName", { required: true })}
                placeholder="Enter receiver's name"
              />
            </div>

            {/* Receiver's Phone Input */}
            <div className="mb-4">
              <Label htmlFor="receiversPhone">Receiver's Phone Number</Label>
              <Input
                defaultValue={receiversPhone}
                id="receiversPhone"
                type="text"
                {...register("receiversPhone", { required: true })}
                placeholder="Enter receiver's phone number"
              />
            </div>

            {/* Parcel Delivery Address */}
            <div className="mb-4">
              <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
              <Input
                defaultValue={deliveryAddress}
                id="deliveryAddress"
                type="text"
                {...register("deliveryAddress", { required: true })}
                placeholder="Enter the delivery address"
              />
            </div>

            {/* Requested Delivery Date Input */}
            <div className="mb-4">
              <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
              <Input
                defaultValue={deliveryDate}
                id="deliveryDate"
                type="date"
                {...register("deliveryDate", { required: true })}
              />
            </div>

            {/* Delivery Address Latitude */}
            <div className="mb-4">
              <Label htmlFor="deliveryLatitude">Delivery Address Latitude</Label>
              <Input
                defaultValue={deliveryLatitude}
                id="deliveryLatitude"
                type="text"
                {...register("deliveryLatitude", { required: true })}
                placeholder="Enter delivery address latitude"
              />
            </div>

            {/* Delivery Address Longitude */}
            <div className="mb-4">
              <Label htmlFor="deliveryLongitude">Delivery Address Longitude</Label>
              <Input
                defaultValue={deliveryLongitude}
                id="deliveryLongitude"
                type="text"
                {...register("deliveryLongitude", { required: true })}
                placeholder="Enter delivery address longitude"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                {...register("price")}
                value={calculatedPrice ? `${calculatedPrice}` : ""}
                readOnly
                placeholder="Calculated price will appear here"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Input
            className="bg-blue-600 text-white cursor-pointer"
            type="submit"
            value="Update Parcel"
          />
        </form>
         </CardContent>
       </Card>
  );
};

export default UpdateBookingParcel;
