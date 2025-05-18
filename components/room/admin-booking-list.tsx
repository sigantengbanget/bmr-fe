"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminBooking, MyBooking } from "@/types"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import React from "react"
import CancelBookingModal from "../modal/CancelBookingModal"


const AdminBookingList = ({ bookings, token }: { bookings: AdminBooking[], token : string }) => {
    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="border-none text-white shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-800">{booking.Room.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{booking.User.email}</p>
                            <p className="text-xs text-muted-foreground">{booking.User.role}</p>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-800">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="size-4 text-primary" />
                                {format(new Date(booking.date), "dd MMM yyyy")}
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="size-4 text-primary" />
                                {format(new Date(booking.startTime), "HH:mm")} - {format(new Date(booking.endTime), "HH:mm")}
                            </div>
                            <p className="text-xs text-muted-foreground">Capacity: {booking.Room.capacity} persons</p>
                            <CancelBookingModal token={token} roomName={booking.Room.name} bookingId={booking.id} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AdminBookingList
