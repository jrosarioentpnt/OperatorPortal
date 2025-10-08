import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  CalendarIcon,
  WifiIcon,
  MapPinIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  description?: string;
}

const MetricCard = ({
  title,
  value,
  trend = 0,
  icon,
  description = "",
}: MetricCardProps) => {
  return (
    <Card className="bg-card border-border hover:shadow-lg hover:border-primary transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
        {trend !== 0 && (
          <div className="flex items-center mt-4">
            {trend > 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs font-medium ${trend > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {Math.abs(trend)}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  totalSubscribers?: number;
  pendingInstallations?: number;
  devicesOnline?: number;
  activeZones?: number;
  subscribersTrend?: number;
  installationsTrend?: number;
  devicesTrend?: number;
  zonesTrend?: number;
}

const MetricsOverview = ({
  totalSubscribers = 1248,
  pendingInstallations = 42,
  devicesOnline = 876,
  activeZones = 16,
  subscribersTrend = 12.5,
  installationsTrend = -4.2,
  devicesTrend = 8.7,
  zonesTrend = 0,
}: MetricsOverviewProps) => {
  return (
    <div className="w-full bg-background">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Subscribers"
          value={totalSubscribers.toLocaleString()}
          trend={subscribersTrend}
          icon={<UsersIcon className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Pending Installations"
          value={pendingInstallations}
          trend={installationsTrend}
          icon={<CalendarIcon className="h-5 w-5 text-primary" />}
          description="Awaiting scheduling"
        />
        <MetricCard
          title="Devices Online"
          value={`${devicesOnline} / ${(devicesOnline + 124).toLocaleString()}`}
          trend={devicesTrend}
          icon={<WifiIcon className="h-5 w-5 text-primary" />}
          description="Online / Total"
        />
        <MetricCard
          title="Active Zones"
          value={activeZones}
          trend={zonesTrend}
          icon={<MapPinIcon className="h-5 w-5 text-primary" />}
          description="Service areas"
        />
      </div>
    </div>
  );
};

export default MetricsOverview;