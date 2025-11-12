import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, colorClass }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-sm mt-2 flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{trend.value}</span>
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            colorClass || "bg-primary/10"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              colorClass ? "text-current" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
