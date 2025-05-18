import UserRoomList from '@/components/room/user-room-list'
import SidebarHeader from '@/components/sidebar-header'
import { authOptions } from '@/lib/auth'
import { API_URL } from '@/lib/constant'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {}

const DashboardPage = async (props: Props) => {
  const session = await getServerSession(authOptions as any);
  const response = await fetch(`${API_URL}/api/room`, {
    cache: "no-store",
  })
  const data = await response.json()
  const rooms = data.data || []
  return (
    <>
      <SidebarHeader title="" />
      {
        (session as any)?.user?.role === "ADMIN" ? (
          <div className='p-6'>
            <div className="text-2xl font-bold">Helo, Admin</div>
            <div className="text-xl">Wellcome to MBR APP</div>
          </div>
        ) : (
          <div>
            <UserRoomList rooms={rooms} token={(session as any)?.accessToken || ""} />
          </div>
        )
      }
    </>
  )
}

export default DashboardPage