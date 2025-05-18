export interface Room {
    id: string
    name: string
    capacity: number
    createdAt: Date
    updatedAt: Date
}

export interface MyBooking {
    id: string
    date: string
    startTime: string
    endTime: string
    Room: {
      id: string
      name: string
      capacity: number
    }
}

export interface AdminBooking {
    id: string
    date: string
    startTime: string
    endTime: string
    Room: {
      id: string
      name: string
      capacity: number
    }
    User: {
      id: string
      email: string
      role : string
    }
}