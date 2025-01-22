import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", fromDate, toDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      const res = await axiosSecure.get(`/parcels?${params.toString()}`);
      return res.data;
    },
  });

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto">
      <h2 className="mt-16 text-4xl mb-12 text-center">All Parcels</h2>

      {/* Date Range Filter */}
      <div className="flex gap-6 w-9/12 mb-16">
        <div>
          <Label htmlFor="fromDate">Enter Requested Date From</Label>
          <Input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="toDate">Enter Requested Date To</Label>
          <Input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
       
      </div>

      {/* Parcel Table */}
      <div className="rounded-lg">
        <Table className="overflow-hidden overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500 ">
            <TableRow>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Parcel Type</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Phone</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Booking Date</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Requested Delivery Date</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Cost</TableHead>
              <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium p-4">{parcel.parcelType}</TableCell>
                <TableCell className="p-4  ">{parcel.phone}</TableCell>
                <TableCell className="p-4  ">{parcel.bookingDate}</TableCell>
                <TableCell className="p-4  ">{parcel.deliveryDate}</TableCell>
                <TableCell className="p-4  ">${parcel.price}</TableCell>
                <TableCell className="p-4  ">{parcel.bookingStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllParcels;
