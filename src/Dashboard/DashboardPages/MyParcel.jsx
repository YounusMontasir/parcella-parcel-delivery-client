import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { useForm, Controller } from "react-hook-form"
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ActionDropdown from "@/components/ActionDropdown"

const MyParcel = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, control } = useForm()
  const [statusFilter, setStatusFilter] = useState("all")

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const onSubmit = async (data) => {
    const date = new Date()
    const reviewInfo = {
      userName: data.name,
      usersImage: data.photo,
      review: data.review,
      feedback: data.feedback,
      deliveryManId: data.deliveryManId,
      reviewDate: formatDate(date),
    }
    const res = await axiosPublic.post("/reviews", reviewInfo)
    console.log(res.data)

    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks For Your Review",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const { data: myParcels = [], refetch } = useQuery({
    queryKey: [user?.email, "parcels", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user.email}`)
      if (statusFilter === "all") {
        return res.data
      }
      return res.data.filter((parcel) => parcel.bookingStatus === statusFilter)
    },
  })

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
        const res = await axiosSecure.patch(`/parcels/cancel/${parcel._id}`)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Cancelled!",
            text: "Your file has been cancelled.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          })
          refetch()
        }
      }
    })
  }

  return (
    <div className="w-11/12 lg:w-10/12  mx-auto">
      <h1 className="text-4xl text-center text-[#25224B] mb-12 mt-8 font-bold">My <span className="text-[#F06728]">Parcels</span></h1>
      <div className="mb-10 w-[200px]">
        <Label htmlFor="statusFilter">Booking Status</Label>
        <Select className="" value={statusFilter} onValueChange={setStatusFilter}>
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

      <div className="rounded-lg">
  <Table className="overflow-hidden overflow-x-auto rounded-lg shadow-lg border border-gray-300">
    <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500 ">
      <TableRow className=''>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Parcel Type</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Requested Delivery Date</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Approximate Delivery Date</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Booking Date</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Delivery Man Id</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Booking Status</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Actions</TableHead>
        <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Review</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {myParcels.map((parcel) => (
        <TableRow
          key={parcel._id}
          className="hover:bg-gray-50 transition duration-200 "
        >
          <TableCell className="p-4  ">{parcel.parcelType}</TableCell>
          <TableCell className="p-4  ">{parcel.deliveryDate}</TableCell>
          <TableCell className="p-4 ">{parcel.approximateDeliveryDate}</TableCell>
          <TableCell className="p-4 ">{parcel.bookingDate}</TableCell>
          <TableCell className="p-4 ">{parcel.deliveryManId}</TableCell>
          <TableCell className="p-4 ">{parcel.bookingStatus}</TableCell>
          <TableCell className="p-4 ">
            <ActionDropdown parcel={parcel} onCancel={handleCancel} />
          </TableCell>
          <TableCell className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#F06728] text-white hover:bg-[#d0561f] transition"
                  disabled={parcel.bookingStatus !== "delivered"}
                  variant="outline"
                >
                  Review
                </Button>
              </DialogTrigger>
              <DialogContent className="w-6/12">
                <DialogHeader>
                  <DialogTitle>Review</DialogTitle>
                </DialogHeader>
                <div>
                  <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="mb-4">
                      <Label htmlFor="photo">Photo URL</Label>
                      <Input
                        defaultValue={user.photoURL}
                        id="photo"
                        type="text"
                        {...register("photo", { required: true })}
                        placeholder="Enter Your Photo URL"
                      />
                    </div>
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
                        id="feedback"
                        {...register("feedback", { required: true })}
                        placeholder="Enter your feedback"
                      />
                    </div>
                    <DialogFooter className="col-span-2">
                      <Input
                        className="bg-blue-600 text-white cursor-pointer"
                        type="submit"
                        value="Submit Review"
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
  )
}

export default MyParcel

