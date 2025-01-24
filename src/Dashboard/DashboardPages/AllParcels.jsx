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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { Edit } from "lucide-react";
const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: { from: fromDate, to: toDate },
      });
      return res.data;
    },
  });

  const { data: deliveryMans = [], isLoading, error } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliverymans");
      return res.data.filter((user) => user.role === "deliveryman");
    },
  });

  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");

  const assignDeliveryMan = async (parcelId, deliveryManId, approximateDate) => {
    const assignInfo = {
      deliveryManId,
      approximateDeliveryDate: approximateDate,
      bookingStatus: "ontheway",
    };

    const res = axiosSecure.patch(`/parcels/update/${parcelId}`, assignInfo);
    if ((await res).data.modifiedCount > 0) {
      Swal.fire({
        title: "Assign Delivery Man",
        text: "Delivery Man has been assigned",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  return (
    <div className="w-full lg:w-10/12 mx-auto mb-20">
      <h1 className="text-4xl text-center text-[#25224B] mb-12 mt-8 font-bold">
        All <span className="text-[#F06728]">Parcels</span>
      </h1>
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
        <Button
          className="bg-[#F06728] mt-auto"
          onClick={() => refetch()}
        >
          Search
        </Button>
      </div>
      <div className="rounded-lg">
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
          <Table className="w-full">
            <TableHeader className="bg-gradient-to-r from-orange-500 to-red-500">
              <TableRow>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  User's Name
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Phone
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Booking Date
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Requested Delivery Date
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Cost
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Status
                </TableHead>
                <TableHead className="p-4 text-left border-r border-gray-300 text-white font-semibold">
                  Assign Delivery Man
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell className="font-medium p-4">
                    {parcel.name}
                  </TableCell>
                  <TableCell className="p-4">{parcel.phone}</TableCell>
                  <TableCell className="p-4">{parcel.bookingDate}</TableCell>
                  <TableCell className="p-4">{parcel.deliveryDate}</TableCell>
                  <TableCell className="p-4">${parcel.price}</TableCell>
                  <TableCell className="p-4">{parcel.bookingStatus}</TableCell>
                  <TableCell className="p-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#F06728]">
                          <Edit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-6/12">
                        <DialogHeader>
                          <DialogTitle className="text-[#F06728] text-3xl text-center">
                            <span className="text-[#25224B]">Assign</span>{" "}
                            Delivery Man
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`date-${parcel._id}`}
                              className="text-left"
                            >
                              Approximate Delivery Date
                            </Label>
                            <Input
                              id={`date-${parcel._id}`}
                              type="date"
                              name="approximateDeliveryDate"
                              value={approximateDeliveryDate}
                              onChange={(e) =>
                                setApproximateDeliveryDate(e.target.value)
                              }
                              className="col-span-3 w-full"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`deliveryman-${parcel._id}`}
                              className="text-left"
                            >
                              Delivery Man
                            </Label>
                            {isLoading ? (
                              <span>Loading...</span>
                            ) : error ? (
                              <span>Error loading delivery men</span>
                            ) : (
                              <Select
                                value={selectedDeliveryMan}
                                onValueChange={setSelectedDeliveryMan}
                                id={`deliveryman-${parcel._id}`}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Delivery Man" />
                                </SelectTrigger>
                                <SelectContent>
                                  {deliveryMans.map((deliveryMan) => (
                                    <SelectItem
                                      key={deliveryMan._id}
                                      value={deliveryMan._id}
                                    >
                                      {deliveryMan.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() =>
                              assignDeliveryMan(
                                parcel._id,
                                selectedDeliveryMan,
                                approximateDeliveryDate
                              )
                            }
                            className="w-full bg-[#F06728]"
                            type="submit"
                          >
                            Assign
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
