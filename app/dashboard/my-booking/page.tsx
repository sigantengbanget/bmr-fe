import MyBookingList from '@/components/room/my-booking-list'
import SidebarHeader from '@/components/sidebar-header'
import { authOptions } from '@/lib/auth'
import { API_URL } from '@/lib/constant'
import { getServerSession } from 'next-auth'
import React from 'react'

const MyBookingRoom = async () => {
  const session = await getServerSession(authOptions as any)
  const response = await fetch(`${API_URL}/api/booking/my`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${(session as any)?.accessToken}`
    }
  })
  const data = await response.json()
  const bookings = data || []
  return (
    <>
    <SidebarHeader title='My Booking' />
    <MyBookingList bookings={bookings} />
    </>
  )
}

export default MyBookingRoom