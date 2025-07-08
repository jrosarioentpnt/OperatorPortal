import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Cpu,
  Calendar,
  Map,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Subscribers",
      icon: <Users className="h-5 w-5" />,
      path: "/subscribers",
    },
    {
      name: "Service Plans",
      icon: <Package className="h-5 w-5" />,
      path: "/service-plans",
    },
    { name: "Devices", icon: <Cpu className="h-5 w-5" />, path: "/devices" },
    {
      name: "Installations",
      icon: <Calendar className="h-5 w-5" />,
      path: "/installations",
    },
    { name: "Zones", icon: <Map className="h-5 w-5" />, path: "/zones" },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center">
              <div className="mr-2 h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">F</span>
              </div>
              <span className="hidden font-bold text-xl md:inline-block">
                Fiber Operator Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8 md:w-80 lg:w-96"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="User"
                    />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">
                      admin@fiberco.com
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background pt-16 transition-transform duration-300 md:translate-x-0 md:pt-16`}
        >
          <nav className="space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 pt-16 md:pl-64">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
