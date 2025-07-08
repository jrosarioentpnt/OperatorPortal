import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Menu, Search, Settings, User } from "lucide-react";
import MetricsOverview from "./dashboard/MetricsOverview";
import CustomerJourneyWidget from "./dashboard/CustomerJourneyWidget";
import DataTable from "./tables/DataTable";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Mock data for recent subscribers table
  const recentSubscribers = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Anytown",
      status: "Connected",
      signupDate: "2023-05-15",
      zone: "North",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Oak Ave, Somecity",
      status: "Install Scheduled",
      signupDate: "2023-05-18",
      zone: "East",
    },
    {
      id: 3,
      name: "Robert Johnson",
      address: "789 Pine Rd, Othertown",
      status: "Signed Up",
      signupDate: "2023-05-20",
      zone: "West",
    },
    {
      id: 4,
      name: "Emily Davis",
      address: "101 Elm St, Newcity",
      status: "Connected",
      signupDate: "2023-05-14",
      zone: "South",
    },
    {
      id: 5,
      name: "Michael Wilson",
      address: "202 Maple Dr, Oldtown",
      status: "Install Scheduled",
      signupDate: "2023-05-19",
      zone: "Central",
    },
  ];

  // Column definitions for the recent subscribers table
  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Address", accessorKey: "address" },
    { header: "Status", accessorKey: "status" },
    { header: "Signup Date", accessorKey: "signupDate" },
    { header: "Zone", accessorKey: "zone" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`bg-card border-r border-border ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}
      >
        {/* Company Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen ? (
            <div className="font-bold text-xl">Fiber Operator</div>
          ) : (
            <div className="font-bold text-xl mx-auto">FO</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {[
              {
                name: "Dashboard",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                ),
              },
              {
                name: "Subscribers",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
              },
              {
                name: "Service Plans",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                ),
              },
              {
                name: "Devices",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>
                ),
              },
              {
                name: "Installations",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                ),
              },
              {
                name: "Zones",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                ),
              },
              { name: "Settings", icon: <Settings className="h-5 w-5" /> },
            ].map((item, index) => (
              <li key={index}>
                <Button
                  variant={index === 0 ? "secondary" : "ghost"}
                  className={`w-full justify-start ${!sidebarOpen && "justify-center"}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-8 h-9 w-[200px] md:w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:inline-block">Admin User</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to the Fiber Operator Portal
            </p>
          </div>

          {/* Metrics Overview */}
          <MetricsOverview />

          {/* Customer Journey Widget */}
          <div className="mt-6">
            <CustomerJourneyWidget />
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="connected">Connected</TabsTrigger>
                      <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      <TabsTrigger value="signed-up">Signed Up</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>

                  <TabsContent value="all" className="m-0">
                    <DataTable data={recentSubscribers} columns={columns} />
                  </TabsContent>
                  <TabsContent value="connected" className="m-0">
                    <DataTable
                      data={recentSubscribers.filter(
                        (sub) => sub.status === "Connected",
                      )}
                      columns={columns}
                    />
                  </TabsContent>
                  <TabsContent value="scheduled" className="m-0">
                    <DataTable
                      data={recentSubscribers.filter(
                        (sub) => sub.status === "Install Scheduled",
                      )}
                      columns={columns}
                    />
                  </TabsContent>
                  <TabsContent value="signed-up" className="m-0">
                    <DataTable
                      data={recentSubscribers.filter(
                        (sub) => sub.status === "Signed Up",
                      )}
                      columns={columns}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
