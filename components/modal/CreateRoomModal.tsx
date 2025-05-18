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
import { Loader2Icon, Plus } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { API_URL } from "@/lib/constant"

const formSchema = z.object({
  name: z.string().min(3, { message: "Room name at lease have 3 characters" }),
  capacity: z.coerce.number().min(1, { message: "Room capacity at lease have 1 person" }),
})

type FormValues = z.infer<typeof formSchema>

const CreateRoomModal = ({token}: {token: string}) => {
  const [open, setOpen] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(`${API_URL}/api/room`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 201) {
        toast.success("Room created successfully")
        setOpen(false)
        reset()
        window.location.reload()
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:brightness-110 transition"
        >
          <Plus className="size-4" /> Add Room
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white/5 backdrop-blur-lg text-white border-white/10">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Room Name</Label>
            <Input
              id="name"
              placeholder="Meeting Alpha"
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
              placeholder="10"
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
              {isSubmitting ? <Loader2Icon className="animate-spin"/> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRoomModal
