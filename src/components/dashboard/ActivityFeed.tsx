import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, User, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: "review" | "approval" | "submission" | "comment"
  title: string
  description: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  timestamp: string
  status?: "pending" | "approved" | "rejected" | "urgent"
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "submission",
    title: "New Document Submitted",
    description: "Technical Manual v2.1 submitted for review",
    user: { name: "Alice Johnson", initials: "AJ" },
    timestamp: "2 minutes ago",
    status: "pending"
  },
  {
    id: "2",
    type: "approval",
    title: "Document Approved",
    description: "Safety Protocol Manual approved by Technical Lead",
    user: { name: "Bob Smith", initials: "BS" },
    timestamp: "15 minutes ago",
    status: "approved"
  },
  {
    id: "3",
    type: "review",
    title: "Review Assignment",
    description: "You've been assigned to review Engine Specifications",
    user: { name: "Carol Davis", initials: "CD" },
    timestamp: "1 hour ago",
    status: "urgent"
  },
  {
    id: "4",
    type: "comment",
    title: "New Comment Added",
    description: "Feedback added to Maintenance Procedures document",
    user: { name: "David Wilson", initials: "DW" },
    timestamp: "2 hours ago"
  }
]

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "submission":
      return FileText
    case "approval":
      return CheckCircle
    case "review":
      return Clock
    case "comment":
      return User
    default:
      return FileText
  }
}

const getStatusBadge = (status?: ActivityItem["status"]) => {
  if (!status) return null

  const variants = {
    pending: "bg-radar-warning/10 text-radar-warning border-radar-warning/20",
    approved: "bg-radar-success/10 text-radar-success border-radar-success/20",
    rejected: "bg-radar-danger/10 text-radar-danger border-radar-danger/20",
    urgent: "bg-radar-danger/10 text-radar-danger border-radar-danger/20 animate-pulse"
  }

  return (
    <Badge className={cn("text-xs", variants[status])}>
      {status === "urgent" && <AlertTriangle className="w-3 h-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-radar-orange/10 rounded-full flex items-center justify-center">
                  <Icon className="w-4 h-4 text-radar-orange" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="text-xs bg-radar-orange/10 text-radar-orange">
                        {activity.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {activity.user.name}
                    </span>
                  </div>
                  
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}