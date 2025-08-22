import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: "default" | "success" | "warning" | "danger"
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = "default" 
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-radar-success/20 bg-gradient-to-br from-radar-success/5 to-transparent"
      case "warning":
        return "border-radar-warning/20 bg-gradient-to-br from-radar-warning/5 to-transparent"
      case "danger":
        return "border-radar-danger/20 bg-gradient-to-br from-radar-danger/5 to-transparent"
      default:
        return "border-radar-orange/20 bg-gradient-to-br from-radar-orange/5 to-transparent"
    }
  }

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-radar-success bg-radar-success/10"
      case "warning":
        return "text-radar-warning bg-radar-warning/10"
      case "danger":
        return "text-radar-danger bg-radar-danger/10"
      default:
        return "text-radar-orange bg-radar-orange/10"
    }
  }

  return (
    <Card className={cn("transition-smooth hover:shadow-elegant", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", getIconStyles())}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-radar-success" : "text-radar-danger"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}