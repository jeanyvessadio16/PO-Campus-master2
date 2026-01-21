"use client";

import { Home, Users, BookOpen, BarChart3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Statistics",
    url: "/admin/stats",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// Barre latérale pour administrateur
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "transition-all duration-200",
                        isActive ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("size-4", isActive && "text-primary-foreground")} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="/avatars/admin.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">Administrateur</span>
            <span className="text-xs text-muted-foreground">admin@campus.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
