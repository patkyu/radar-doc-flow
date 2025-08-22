import { StatsCard } from "@/components/dashboard/StatsCard"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/custom-button"
import { Progress } from "@/components/ui/progress"
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Plus
} from "lucide-react"
import radarHero from "@/assets/radar-hero.jpg"
import workflowIllustration from "@/assets/workflow-illustration.jpg"

const dashboardStats = [
  {
    title: "Total Documents",
    value: "1,247",
    description: "Active in system",
    icon: FileText,
    trend: { value: 12, isPositive: true }
  },
  {
    title: "Pending Reviews",
    value: "23",
    description: "Awaiting action",
    icon: Clock,
    variant: "warning" as const,
    trend: { value: -8, isPositive: false }
  },
  {
    title: "Completed This Week",
    value: "156",
    description: "Reviews processed",
    icon: CheckCircle,
    variant: "success" as const,
    trend: { value: 24, isPositive: true }
  },
  {
    title: "Active Reviewers",
    value: "42",
    description: "Team members",
    icon: Users,
    trend: { value: 5, isPositive: true }
  }
]

const workflowProgress = [
  { stage: "Document Submission", progress: 100, count: 45 },
  { stage: "Initial Review", progress: 78, count: 35 },
  { stage: "Technical Approval", progress: 62, count: 28 },
  { stage: "Final Sign-off", progress: 45, count: 20 }
]

function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${radarHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-dark/80" />
          <div className="relative z-10 flex items-center justify-between h-full px-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to RADAR
              </h1>
              <p className="text-white/90 text-lg">
                Technical Documentation Review & Approval System
              </p>
              <p className="text-white/70 mt-1">
                Streamline your workflow with real-time tracking and automated notifications
              </p>
            </div>
            <Button variant="radar" size="lg" className="hidden md:flex">
              <Plus className="w-4 h-4 mr-2" />
              Submit Document
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workflow Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-radar-orange" />
                Current Workflow Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workflowProgress.map((item) => (
                <div key={item.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.stage}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} documents
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                <Button variant="radar-outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  New Submission
                </Button>
                <Button variant="radar-outline" className="justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  View Pending
                </Button>
                <Button variant="radar-outline" className="justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Urgent Items
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Workflow Illustration */}
      <Card>
        <CardHeader>
          <CardTitle>RADAR Workflow Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <img 
                src={workflowIllustration} 
                alt="RADAR Workflow Process" 
                className="w-full rounded-lg shadow-elegant"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Streamlined Document Review Process</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-radar-success" />
                  Centralized document submission and tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-radar-success" />
                  Automated reviewer assignments and notifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-radar-success" />
                  Real-time progress visibility for all stakeholders
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-radar-success" />
                  Comprehensive audit trails for compliance
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard;