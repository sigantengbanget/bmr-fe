import AdminBookingList from '@/components/room/admin-booking-list'
import SidebarHeader from '@/components/sidebar-header'
import { CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { API_URL } from '@/lib/constant'
import { LucideDoorOpen } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'


const BookingListPage = async () => {
    const session = await getServerSession(authOptions as any)
    if (!session || (session as any).user?.role !== "ADMIN") {
        redirect('/dashboard')
    }
    const response = await fetch(`${API_URL}/api/booking/all`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`
        }
    })
    const data = await response.json()
    const bookings = data || []
    if (response.status === 200) {
        return (
            <>
                <SidebarHeader title="Booking List" />
                <AdminBookingList token={(session as any)?.accessToken || ""} bookings={bookings} />
            </>
        )
    } else {
        return (
            <>
                <SidebarHeader title="Room List" />
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        <div className="flex items-center justify-center border-none bg-white/5 backdrop-blur-lg text-white shadow-xl">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/20 text-primary">
                                    <LucideDoorOpen className="size-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Room List</CardTitle>
                                    <p className="text-sm text-muted-foreground">No Room</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BookingListPage