import CreateRoomModal from '@/components/modal/CreateRoomModal'
import RoomList from '@/components/room/room-list'
import SidebarHeader from '@/components/sidebar-header'
import { CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { API_URL } from '@/lib/constant'
import { LucideDoorOpen } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const RoomListPage = async () => {
    const session = await getServerSession(authOptions as any)
    if(!session || (session as any).user?.role !== "ADMIN") {
        redirect('/dashboard')
    }
    const response = await fetch(`${API_URL}/api/room`, {
        cache: "no-store",
      })
      const data = await response.json()
      const rooms = data.data || []
    if (response.status === 200) {
        return (
            <>
                <SidebarHeader title="Room List" />
                <div className="p-6 flex items-center justify-between gap-x-4">
                    <CreateRoomModal token={(session as any)?.accessToken || ""} />
                </div>
                <RoomList token={(session as any)?.accessToken || ""} rooms={rooms} />
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
export default RoomListPage