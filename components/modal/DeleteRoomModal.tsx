"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2Icon, Trash } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { API_URL } from "@/lib/constant"

type DeleteRoomModalProps = {
    roomId: string
    roomName: string
    token: string
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
    roomId,
    roomName,
    token
}) => {
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${API_URL}/api/room/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                toast.success(response.data?.message || "Room deleted successfully")
                setOpen(false)
                window.location.reload()
            } else {
                toast.error(response.data?.message || "Failed to delete room")
            }
        } catch (error: any) {
            toast.error(error?.response.data?.message || "Failed to delete room")
        }
        setIsLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-red-400 hover:bg-red-400/10"
                    size="icon"
                >
                    <Trash className="text-red-400" size={24} />
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white/5 backdrop-blur-lg text-white border-white/10">
                <DialogHeader>
                    <DialogTitle>Delete Room</DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-white/70 text-sm">
                    Are you sure you want to delete <span className="font-semibold">{roomName}</span>? This action cannot be undone.
                </DialogDescription>

                <DialogFooter className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="ghost"
                        onClick={() => setOpen(false)}
                        className="border-white/20 text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    >
                        {
                            isLoading ?
                                <Loader2Icon className="animate-spin" /> :
                                "Delete"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteRoomModal
