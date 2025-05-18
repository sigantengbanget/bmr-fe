"use client"
import React from "react"
import { Room } from "@/types"
import RoomItem from "./room-item"
import UserRoomItem from "./user-room-item"

const UserRoomList = ({ rooms, token }: { rooms: Room[], token : string }) => {
    return (
        <>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rooms.map((room, index) => (
                        <UserRoomItem token={token} room={room} key={index}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserRoomList
