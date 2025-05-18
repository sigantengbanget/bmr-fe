"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

type ShowRoomModalProps = {
    room: {
        id: string
        name: string
        capacity: number
    }
}

const ShowRoomModal: React.FC<ShowRoomModalProps> = ({ room }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-blue-500/10">
                    <Eye className="text-blue-500" size={24} />
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white/5 backdrop-blur-lg text-white border-white/10">
                <DialogHeader>
                    <DialogTitle>Room Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <div>
                        <span className="font-semibold">Name:</span> {room.name}
                    </div>
                    <div>
                        <span className="font-semibold">Capacity:</span> {room.capacity}
                    </div>
                </div>

                <DialogDescription className="text-xs text-white/60 mt-4">
                    This is detailed information about the selected room.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ShowRoomModal
