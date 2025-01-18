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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  // Create state for selected filter
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: myParcels = [], refetch } = useQuery({
    queryKey: [user?.email, "parcels", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user.email}`);
      // If 'all' is selected, no filter applied, else filter based on booking status
      if (statusFilter === "all") {
        return res.data;
      }
      return res.data.filter(parcel => parcel.bookingStatus === statusFilter);
    },
  });

  // Cancel Booking function
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyParcel;
