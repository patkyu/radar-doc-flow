import { useState } from "react"
import { 
  FileText, 
  Users, 
  Bell, 
  BarChart3, 
  Settings, 
  Home,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Reviews", url: "/reviews", icon: Clock },
  { title: "Approvals", url: "/approvals", icon: CheckCircle },
  { title: "Team", url: "/team", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const workflowItems = [
  { title: "Pending Reviews", url: "/pending", icon: Clock },
  { title: "Urgent Items", url: "/urgent", icon: AlertTriangle },
  { title: "Search", url: "/search", icon: Search },
]

const systemItems = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "transition-smooth",
      isActive 
        ? "bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-sidebar-primary" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
    )

  return (
    <Sidebar
      className={cn(
        "transition-smooth border-r border-sidebar-border",
        collapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">RADAR</h2>
              <p className="text-xs text-sidebar-foreground/60">Document Review Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 px-2 mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 px-2 mb-2">
            Workflow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {workflowItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 px-2 mb-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}