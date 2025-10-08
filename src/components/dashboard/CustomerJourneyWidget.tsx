import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, UserPlus } from "lucide-react";

interface JourneyStage {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

interface CustomerJourneyWidgetProps {
  stages?: JourneyStage[];
  totalCustomers?: number;
}

const CustomerJourneyWidget = ({
  stages = [
    {
      id: "signed-up",
      name: "Signed Up",
      count: 42,
      icon: <UserPlus className="h-5 w-5 text-white" />,
      color: "bg-blue-500",
    },
    {
      id: "scheduled",
      name: "Install Scheduled",
      count: 28,
      icon: <Clock className="h-5 w-5 text-white" />,
      color: "bg-amber-500",
    },
    {
      id: "connected",
      name: "Device Connected",
      count: 16,
      icon: <CheckCircle className="h-5 w-5 text-white" />,
      color: "bg-green-500",
    },
  ],
  totalCustomers = 86,
}: CustomerJourneyWidgetProps) => {
  return (
    <Card className="w-full bg-card border-border hover:shadow-lg hover:border-primary transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">
          Customer Journey Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Fully Connected</p>
              <p className="text-2xl font-bold text-foreground">
                {stages.find((stage) => stage.id === "connected")?.count || 0}
                <span className="text-sm text-muted-foreground ml-1">
                  (
                  {Math.round(
                    ((stages.find((stage) => stage.id === "connected")?.count ||
                      0) /
                      totalCustomers) *
                      100,
                  )}
                  %)
                </span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress
            value={
              ((stages.find((stage) => stage.id === "connected")?.count || 0) /
                totalCustomers) *
              100
            }
            className="h-2"
          />

          {/* Journey Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`${stage.color} p-2 rounded-full mr-3`}>
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{stage.name}</p>
                    <Badge variant="outline" className="ml-2">
                      {stage.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round((stage.count / totalCustomers) * 100)}% of total
                  </p>
                </div>
                {index < stages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerJourneyWidget;