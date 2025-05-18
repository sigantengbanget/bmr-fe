import * as React from "react"
import {
  DoorOpen,
  LandmarkIcon,
  ListChecksIcon,
  PenSquare,
  UserCircle2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SidebarLogo } from "./sidebar-logo"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    redirect('/login')
  }

  const data = {
    navMain: (session as any)?.user?.role === "ADMIN" ? [
      {
        title: "Room",
        url: "/dashboard/room",
        icon: DoorOpen,
        isActive: true,
        items: [
          {
            title: "Room List",
            url: "/dashboard/room",
          },
        ],
      },
      {
        title: "Booking",
        url: "/dashboard/booking",
        icon: ListChecksIcon,
        isActive: false,
        items: [
          {
            title: "Booking Room",
            url: "/dashboard/booking",
          },
        ],
      },
    ] : [
      {
        title: "Booking",
        url: "/dashboard/booking",
        icon: PenSquare,
        isActive: true,
        items: [
          {
            title: "My Booking Room",
            url: "/dashboard/my-booking",
          },
        ],
      }
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ email: (session as any)?.user?.email || "", role: (session as any)?.user?.role || '' }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}