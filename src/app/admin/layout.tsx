import { AppSidebar } from "@/components/AppSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { superAdminNavbar } from "@/constants/config";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarHeader/>
      <SidebarProvider>
        <AppSidebar items={superAdminNavbar} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
