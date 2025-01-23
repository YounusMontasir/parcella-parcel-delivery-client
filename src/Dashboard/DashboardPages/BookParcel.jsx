import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import Swal from "sweetalert2"

const BookParcel = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const onSubmit = async (data) => {
    console.log(data)

    const date = new Date()
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
    }
    const res = await axiosPublic.post("/parcels", deliveryInfo)
    console.log(res.data)
    if (res.data.insertedId) {
      reset()
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Parcel is booked`,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const parcelWeight = watch("parcelWeight")

  const calculatePrice = () => {
    if (!parcelWeight) return ""
    const weight = Number.parseFloat(parcelWeight)
    if (weight <= 1) return 50
    if (weight <= 2) return 100
    return 150
  }

  const price = calculatePrice()

  React.useEffect(() => {
    setValue("price", price)
  }, [price, setValue])

  return (
    <Card className="w-full max-w-4xl mx-auto mt-12 mb-20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="text-3xl font-bold text-center">Book A Parcel</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user?.displayName}
                {...register("name", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                {...register("email", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="text"
                {...register("phone", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.phone && <span className="text-red-500 text-xs">Phone number is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="parcelType" className="text-sm font-medium text-gray-700">
                Parcel Type
              </Label>
              <Input
                id="parcelType"
                type="text"
                {...register("parcelType", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.parcelType && <span className="text-red-500 text-xs">Parcel type is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="parcelWeight" className="text-sm font-medium text-gray-700">
                Parcel Weight
              </Label>
              <Input
                id="parcelWeight"
                type="number"
                {...register("parcelWeight", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.parcelWeight && <span className="text-red-500 text-xs">Parcel weight is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiversName" className="text-sm font-medium text-gray-700">
                Receiver's Name
              </Label>
              <Input
                id="receiversName"
                type="text"
                {...register("receiversName", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.receiversName && <span className="text-red-500 text-xs">Receiver's name is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiversPhone" className="text-sm font-medium text-gray-700">
                Receiver's Phone Number
              </Label>
              <Input
                id="receiversPhone"
                type="text"
                {...register("receiversPhone", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.receiversPhone && (
                <span className="text-red-500 text-xs">Receiver's phone number is required</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700">
                Parcel Delivery Address
              </Label>
              <Input
                id="deliveryAddress"
                type="text"
                {...register("deliveryAddress", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.deliveryAddress && (
                <span className="text-red-500 text-xs">Parcel delivery address is required</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700">
                Requested Delivery Date
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                {...register("deliveryDate", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.deliveryDate && <span className="text-red-500 text-xs">Requested delivery date is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryLatitude" className="text-sm font-medium text-gray-700">
                Delivery Address Latitude
              </Label>
              <Input
                id="deliveryLatitude"
                type="text"
                {...register("deliveryLatitude", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.deliveryLatitude && (
                <span className="text-red-500 text-xs">Delivery address latitude is required</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryLongitude" className="text-sm font-medium text-gray-700">
                Delivery Address Longitude
              </Label>
              <Input
                id="deliveryLongitude"
                type="text"
                {...register("deliveryLongitude", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors.deliveryLongitude && (
                <span className="text-red-500 text-xs">Delivery address longitude is required</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price
              </Label>
              <Input
                id="price"
                type="text"
                {...register("price")}
                value={price ? `${price}` : ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-red-600 transition duration-300"
          >
            Book Parcel
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default BookParcel

