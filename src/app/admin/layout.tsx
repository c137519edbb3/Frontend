"use client"
import Image from "next/image";
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
  IconSettings, 
  IconDimensions,
  IconBandage,
  IconCamera,
  IconReportAnalytics
} from "@tabler/icons-react"; // Import the icons
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Anomaly Management",
    href: "/admin/anomalies",
    icon: (
      <IconBandage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Camera Management",
    href: "/admin/camera",
    icon: (
      <IconCamera className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Reports",
    href: "/admin/report",
    icon: (
      <IconFileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Billing",
    href: "/admin/billing",
    icon: (
      <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Demo",
    href: "/demo",
    icon: (
      <IconDimensions className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SessionProvider>
        <main>
        <SideBarWidget  links={links}>{children} </SideBarWidget>          
        </main>      
    </SessionProvider>
  );
}


