"use client"
import Image from "next/image";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { Sidebar, SidebarBody,  SidebarLink, SidebarProvider} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SideBarWidget } from "@/components/common/sideBar";


import { 
  IconDashboard, 
  IconUserShield, 
  IconUsers, 
  IconDevices, 
  IconFileText, 
  IconSettings 
} from "@tabler/icons-react"; // Import the icons

const links = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Anomaly Management",
    href: "#",
    icon: (
      <IconUserShield className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Users",
    href: "#",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Devices",
    href: "#",
    icon: (
      <IconDevices className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Reports",
    href: "#",
    icon: (
      <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
        <main>
        <SideBarWidget  links={links}>{children} </SideBarWidget>          
        </main>      
    </ProtectedRoute>
  );
}


