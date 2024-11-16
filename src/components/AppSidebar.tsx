"use client";
import Link from "next/link";
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
import { 
  BarChart, 
  Aperture, 
  Ratio, 
  Bell, 
  Users, 
  Calendar, 
  CreditCard, 
  Group, 
  Home, 
  Inbox, 
  Search, 
  Settings, 
  AlertTriangle
} from "lucide-react";

const iconMap = {
  home: Home,
  inbox: Inbox,
  calendar: Calendar,
  search: Search,
  settings: Settings,
  dashboard: Home,  
  group: Group,          
  bar_chart: BarChart,    
  credit_card: CreditCard,
  error: AlertTriangle,
  people: Users,    
  devices: Aperture,
  assessment: Ratio,
  notifications: Bell,
};

export function AppSidebar({ items }: AppSidebarProps) {
  const { logout } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col justify-between h-full">
              <div>
                {items.map((item) => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} passHref>
                          <div className="flex items-center">
                            {IconComponent && <IconComponent className="h-4 w-4 mr-2 text-neutral-700 dark:text-neutral-200" />}
                            <span>{item.title}</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
