"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2Icon, Trash2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { API_URL } from "@/lib/constant"

type Props = {
    roomName: string
    bookingId: string
    token: string
}

const CancelBookingModal = ({ bookingId, roomName, token }: Props) => {
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${API_URL}/api/booking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success(response.data?.message || `Cancel booking successfully`)
                setOpen(false)
                window.location?.reload()
            }else{
                toast.error(response.data?.message || `Cancel booking failed`)
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message || `Cancel booking failed`)
        }
        setIsLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] bg-background text-gray-800">
                <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                    {`Are you sure you want to cancel this booking (${roomName})? This action cannot be undone.`}
                </div>
                <DialogFooter>
                    <Button variant="outline" className="text-gray-800" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        {
                            isLoading ? <Loader2Icon className="animate-spin" /> : "Cancel Booking"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CancelBookingModal
