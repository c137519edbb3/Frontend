"use client";
import { Home, Inbox, Settings } from "lucide-react";
import Link from "next/link"; // Import Link from next/link
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarButton } from "./ui/sidebar_button";
import { useAuth } from "@/context/authContext";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin", // Update URLs to actual routes
    icon: Home,
  },
  {
    title: "Anomalies",
    url: "/admin/anomalies", // Update URLs to actual routes
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/admin/settings", // Update URLs to actual routes
    icon: Settings
  }
];

export function AppSidebar() {
  const { logout } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col justify-between h-full">
              {" "}
              {/* Make the SidebarMenu a flex container */}
              <div>
                {" "}
                {/* Wrap the menu items in a div */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} passHref>
                        <div className="flex items-center">
                          {" "}
                          {/* Optional: Add a flex container for alignment */}
                          {/* Decreased size of icons */}
                          <item.icon className="h-4 w-4 mr-2 text-neutral-700 dark:text-neutral-200" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarButton onClick={logout}>Logout</SidebarButton>
      </SidebarFooter>
    </Sidebar>
  );
}
