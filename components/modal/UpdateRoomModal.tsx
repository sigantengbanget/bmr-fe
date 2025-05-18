"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon, Pencil } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { API_URL } from "@/lib/constant"

// Schema validasi
const formSchema = z.object({
    name: z.string().min(3, { message: "Nama ruangan minimal 3 karakter" }),
    capacity: z.coerce.number().min(1, { message: "Minimal kapasitas 1 orang" }),
})

type FormValues = z.infer<typeof formSchema>

type UpdateRoomModalProps = {
    room: {
        id: string
        name: string
        capacity: number
    },
    token: string
}

const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({ room, token }) => {
    const [open, setOpen] = React.useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: room.name,
            capacity: room.capacity,
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.patch(`${API_URL}/api/room/${room.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 200) {
                toast.success(response.data?.message || "Successfully updated room")
                reset()
                setOpen(false)
                window.location.reload()
            } else {
                toast.error(response.data?.message || "Failed to update room")
            }
        } catch (error: any) {
            toast.error(error?.response.data?.message || "Failed to update room")
        }
    }

    React.useEffect(() => {
        if (open) {
            reset({
                name: room.name,
                capacity: room.capacity,
            })
        }
    }, [open, room, reset])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-yellow-500 hover:bg-yellow-400/10"
                    size="icon"
                >
                    <Pencil size={24} className="text-yellow-400"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white/5 backdrop-blur-lg text-white border-white/10">
                <DialogHeader>
                    <DialogTitle>Update Room</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="name">Room Name</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            className="mt-1 text-white placeholder-white"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                            id="capacity"
                            type="number"
                            {...register("capacity")}
                            className="mt-1 text-white placeholder-white"
                        />
                        {errors.capacity && (
                            <p className="text-sm text-red-400 mt-1">{errors.capacity.message}</p>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="border-white/20 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2Icon className="animate-spin"/> : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateRoomModal
