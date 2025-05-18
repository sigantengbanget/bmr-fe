"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/constant"

const bookingSchema = z.object({
    date: z.date({ required_error: "Tanggal booking wajib diisi" }),
    startTime: z.string().nonempty("Jam mulai wajib diisi"),
    endTime: z.string().nonempty("Jam selesai wajib diisi"),
})

type BookingFormValues = z.infer<typeof bookingSchema>

export default function BookingRoomModal({roomId, token}: {roomId: string, token: string}) {
    const [open, setOpen] = React.useState(false)
    const [popOverOpen, setPopoverOpen] = React.useState(false)

    const {
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
    })
    const selectedDate = watch("date")

    const router = useRouter()

    const onSubmit = async (data: BookingFormValues) => {
        try {
            if (!data.date) return
            const [startHour, startMinute] = data.startTime.split(":")
            const startDateTime = new Date(data.date)
            startDateTime.setHours(Number(startHour))
            startDateTime.setMinutes(Number(startMinute))
            startDateTime.setSeconds(0)
            startDateTime.setMilliseconds(0)
          
            const [endHour, endMinute] = data.endTime.split(":")
            const endDateTime = new Date(data.date)
            endDateTime.setHours(Number(endHour))
            endDateTime.setMinutes(Number(endMinute))
            endDateTime.setSeconds(0)
            endDateTime.setMilliseconds(0)

            if (endDateTime <= startDateTime) {
                toast.error("End time must be after start time")
                return
              }
          
            const payload = {
              roomId: roomId,
              date: format(data.date, "yyyy-MM-dd"),
              startTime: startDateTime.toISOString(),
              endTime: endDateTime.toISOString(),
            }
          
            const response = await axios.post(`${API_URL}/api/booking`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                toast.success(response.data?.message || "Booking created successfully")
                setOpen(false)
                reset()
                router.push(`/dashboard/my-booking`)
            }else{
                toast.error(response.data?.message || "Something went wrong")
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:brightness-110 transition">
                    <PlusIcon /> Book Room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Booking Room</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Booking Date</Label>
                        <Popover open={popOverOpen} onOpenChange={setPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !selectedDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 size-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        if (date) {
                                            setValue("date", date)
                                            setPopoverOpen(false)
                                        }
                                    }}
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
                    </div>

                    {/* Start Time */}
                    <div>
                        <Label>Start Time</Label>
                        <Select onValueChange={(value) => setValue("startTime", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Start Time" />
                            </SelectTrigger>
                            <SelectContent>
                                {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time, index) => (
                                    <SelectItem key={index} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.startTime && (
                            <p className="text-sm text-red-400">{errors.startTime.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>End Time</Label>
                        <Select onValueChange={(value) => setValue("endTime", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select End Time" />
                            </SelectTrigger>
                            <SelectContent>
                                {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time, index) => (
                                    <SelectItem key={index} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.endTime && (
                            <p className="text-sm text-red-400">{errors.endTime.message}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? <Loader2Icon className="animate-spin"/> : "Book Room"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
