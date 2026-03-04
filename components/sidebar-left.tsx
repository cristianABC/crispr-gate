"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavFavorites } from "./nav-favorites"
import Image from "next/image"

// This is sample data.
const data = {
  favorites: [
    {
      name: "Aduana Medica",
      url: "aduana-medica",
      emoji: "🏥",
    },
    {
      name: "Biometria",
      url: "biometria",
      emoji: "👣",
    },
    {
      name: "Bioseguridad",
      url: "bioseguridad",
      emoji: "🚧",
    },
    {
      name: "Genoma",
      url: "genoma-id",
      emoji: "🧬",
    },
    {
      name: "Implantes",
      url: "implantes",
      emoji: "🧪",
    },
    {
      name: "Origen",
      url: "origen",
      emoji: "🛸",
    },
    {
      name: "Registro Neón",
      url: "registro-neon",
      emoji: "📓",
    },
    {
      name: "Vigilancia",
      url: "vigilancia",
      emoji: "🚨",
    },
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
           <Image height={100} width={250} alt="Cris PR logo" src='/logo.png' />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
