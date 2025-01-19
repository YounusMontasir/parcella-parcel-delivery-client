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

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  const { data: deliveryMans = [], isLoading, error } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "deliveryman");
    },
  });
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] =
    useState("");
  // Function to handle assigning a delivery man and date
  const assignDeliveryMan =async (parcelId, deliveryManId, approximateDate) => {
   const assignInfo ={
    deliveryManId,
    approximateDeliveryDate: approximateDate,
    bookingStatus: 'ontheway'
   }
   console.log(assignInfo);
   
   
    const res = axiosSecure.patch(`/parcels/update/${parcelId}`, assignInfo);
    if((await res).data.modifiedCount>0){
       Swal.fire({
                  title: "Assign Delivery Man",
                  text: "Delivery Man has been assigned",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500
                });
                refetch()
    }
  };
 
  return (
    <div className="w-10/12 mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User's Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.map((parcel) => {

            return (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                <TableCell>{parcel.phone}</TableCell>
                <TableCell>{parcel.bookingDate}</TableCell>
                <TableCell>{parcel.deliveryDate}</TableCell>
                <TableCell>${parcel.price}</TableCell>
                <TableCell>{parcel.bookingStatus}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="w-6/12">
                      <DialogHeader>
                        <DialogTitle>Edit Parcel</DialogTitle>
                        <DialogDescription>
                          Update parcel details and click save to confirm
                          changes.
                        </DialogDescription>
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
                          className="w-full"
                          type="submit"
                        >
                          Assign
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllParcels;
