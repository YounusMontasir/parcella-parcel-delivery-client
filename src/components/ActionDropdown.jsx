import React from "react"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HamIcon, Menu, MoreHorizontal } from "lucide-react"

const ActionDropdown = ({ parcel, onCancel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-3 bg-gray-200">
          <span className="sr-only">Open menu</span>
          <Menu></Menu>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/updatebooking/${parcel._id}`}
            className={`${parcel.bookingStatus !== "pending" ? "pointer-events-none opacity-50" : ""}`}
          >
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCancel(parcel)} disabled={parcel.bookingStatus !== "pending"}>
          Cancel
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/dashboard/payment/${parcel._id}`}>Pay</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionDropdown

