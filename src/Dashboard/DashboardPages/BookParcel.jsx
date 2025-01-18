import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";

const BookParcel = () => {
    const { user } = useAuth();
    const {
      register,
      handleSubmit,
      watch,
      setValue, // Allows programmatically setting values in the form
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data); // Form data will include the price
    };
  
    const parcelWeight = watch("parcelWeight");
  
    // Calculate the price based on parcel weight
    const calculatePrice = () => {
      if (!parcelWeight) return "";
      const weight = parseFloat(parcelWeight);
      if (weight <= 1) return 50;
      if (weight <= 2) return 100;
      return 150;
    };
  
    const price = calculatePrice();
  
    // Update the `price` in the form data whenever it changes
    React.useEffect(() => {
      setValue("price", price);
    }, [price, setValue]);

  return (
    <div className="w-10/12 mx-auto mt-12">
      <h1 className="text-4xl text-center mb-10">Book A Parcel</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue={user?.displayName}
                id="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input defaultValue={user?.email}
                id="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                {...register("phone", { required: true })}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <span className="text-red-500">Phone number is required</span>
              )}
            </div>

            {/* Parcel Type */}
            <div className="mb-4">
              <Label htmlFor="parcelType">Parcel Type</Label>
              <Input
                id="parcelType"
                type="text"
                {...register("parcelType", { required: true })}
                placeholder="Enter your parcel type"
              />
              {errors.parcelType && (
                <span className="text-red-500">Parcel type is required</span>
              )}
            </div>

            {/* Parcel Weight */}
            <div className="mb-4">
              <Label htmlFor="parcelWeight">Parcel Weight</Label>
              <Input
                id="parcelWeight"
                type="number"
                {...register("parcelWeight", { required: true })}
                placeholder="Enter the parcel weight"
              />
              {errors.parcelWeight && (
                <span className="text-red-500">Parcel weight is required</span>
              )}
            </div>

            {/* Receiver's Name Input */}
            <div className="mb-4">
              <Label htmlFor="receiversName">Receiver's Name</Label>
              <Input
                id="receiversName"
                type="text"
                {...register("receiversName", { required: true })}
                placeholder="Enter receiver's name"
              />
              {errors.receiversName && (
                <span className="text-red-500">Receiver's name is required</span>
              )}
            </div>

            {/* Receiver's Phone Input */}
            <div className="mb-4">
              <Label htmlFor="receiversPhone">Receiver's Phone Number</Label>
              <Input
                id="receiversPhone"
                type="text"
                {...register("receiversPhone", { required: true })}
                placeholder="Enter receiver's phone number"
              />
              {errors.receiversPhone && (
                <span className="text-red-500">
                  Receiver's phone number is required
                </span>
              )}
            </div>

            {/* Parcel Delivery Address */}
            <div className="mb-4">
              <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
              <Input
                id="deliveryAddress"
                type="text"
                {...register("deliveryAddress", { required: true })}
                placeholder="Enter the delivery address"
              />
              {errors.deliveryAddress && (
                <span className="text-red-500">
                  Parcel delivery address is required
                </span>
              )}
            </div>

            {/* Requested Delivery Date Input */}
            <div className="mb-4">
              <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                {...register("deliveryDate", { required: true })}
              />
              {errors.deliveryDate && (
                <span className="text-red-500">
                  Requested delivery date is required
                </span>
              )}
            </div>

            {/* Delivery Address Latitude */}
            <div className="mb-4">
              <Label htmlFor="deliveryLatitude">Delivery Address Latitude</Label>
              <Input
                id="deliveryLatitude"
                type="text"
                {...register("deliveryLatitude", { required: true })}
                placeholder="Enter delivery address latitude"
              />
              {errors.deliveryLatitude && (
                <span className="text-red-500">
                  Delivery address latitude is required
                </span>
              )}
            </div>

            {/* Delivery Address Longitude */}
            <div className="mb-4">
              <Label htmlFor="deliveryLongitude">
                Delivery Address Longitude
              </Label>
              <Input
                id="deliveryLongitude"
                type="text"
                {...register("deliveryLongitude", { required: true })}
                placeholder="Enter delivery address longitude"
              />
              {errors.deliveryLongitude && (
                <span className="text-red-500">
                  Delivery address longitude is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                {...register("price")}
                value={price ? `${price}` : ""}
                readOnly
                placeholder="Calculated price will appear here"
              />
            </div>
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

export default BookParcel;
