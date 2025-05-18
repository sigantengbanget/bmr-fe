"use client"
import { Room } from '@/types'
import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisIcon, EyeIcon, PencilIcon, Plus, Trash2Icon } from 'lucide-react'
import UpdateRoomModal from '../modal/UpdateRoomModal'
import DeleteRoomModal from '../modal/DeleteRoomModal'
import ShowRoomModal from '../modal/ShowRoomModal'

type Props = {
    room: Room
    token: string
}

const RoomItem = ({ room, token }: Props) => {
    return (
        <Card
            key={room.id}
            className="flex items-start justify-between border-none p-4"
        >
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <div>
                    <CardTitle className="text-lg text-gray-800">{room.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{room.capacity} persons</p>
                </div>
            </CardHeader>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-x-3 flex items-center justify-center py-4 px-2 gap-x-4">
                    <ShowRoomModal room={room} />
                    <UpdateRoomModal token={token} room={room} />
                    <DeleteRoomModal token={token} roomId={room.id} roomName={room.name} />
                </DropdownMenuContent>
            </DropdownMenu>
        </Card>
    )
}

export default RoomItem