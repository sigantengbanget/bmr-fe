"use client"
import React from "react"
import { Room } from "@/types"
import RoomItem from "./room-item"

const RoomList = ({ rooms, token }: { rooms: Room[], token : string }) => {
    return (
        <>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {rooms.map((room, index) => (
                        <RoomItem token={token} room={room} key={index}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RoomList
