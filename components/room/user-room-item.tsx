"use client"
import { Room } from '@/types'
import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import ShowRoomModal from '../modal/ShowRoomModal'
import BookingRoomModal from '../modal/BookingRoomModal'

type Props = {
    room: Room
    token: string
}

const UserRoomItem = ({ room, token }: Props) => {
    return (
        <Card
            key={room.id}
            className="flex items-start justify-between border-none p-4"
        >
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <div>
                    <CardTitle className="text-lg text-gray-800">{room.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">{room.capacity} persons</p>
                    <BookingRoomModal roomId={room.id || ""} token={token} />
                </div>
            </CardHeader>
            <ShowRoomModal room={room} />
        </Card>
    )
}

export default UserRoomItem