import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaTruck, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Truck, User2, UserCircle } from "lucide-react";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const usersPerPage = 5;

  const { data = {}, refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${usersPerPage}`);
      return res.data;
    },
  });

  const { users = [], totalUsers = 0 } = data;

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          title: `${user.name} is an admin now`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeDeliveryMan = (user) => {
    axiosSecure.patch(`/users/deliveryman/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          title: `${user.name} is a Delivery Man now`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-4xl text-center mt-16 mb-12">All Users</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user?.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="px-1 py-1 bg-blue-500 text-white rounded"
                    >
                     <User2></User2>
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {user?.role === "deliveryman" ? (
                    "Delivery Man"
                  ) : (
                    <button
                      onClick={() => handleMakeDeliveryMan(user)}
                      className="px-2 py-1 bg-orange-500 text-white rounded"
                    >
                      <Truck></Truck>
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    <div className="mt-20  mx-auto">
    <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    </div>
  );
};

export default AllUsers;
