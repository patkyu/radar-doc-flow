import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  FileText, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus,
  Download,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  title: string
  type: string
  version: string
  status: "pending" | "in-review" | "approved" | "rejected" | "urgent"
  submittedBy: string
  submittedDate: string
  reviewedBy?: string
  reviewDate?: string
  size: string
}

const mockDocuments: Document[] = [
  {
    id: "DOC-001",
    title: "Technical Manual v2.1",
    type: "Technical Manual",
    version: "2.1",
    status: "pending",
    submittedBy: "Alice Johnson",
    submittedDate: "2024-01-15",
    size: "2.4 MB"
  },
  {
    id: "DOC-002", 
    title: "Safety Protocol Manual",
    type: "Safety Documentation",
    version: "1.5",
    status: "approved",
    submittedBy: "Bob Smith",
    submittedDate: "2024-01-10",
    reviewedBy: "Carol Davis",
    reviewDate: "2024-01-12",
    size: "1.8 MB"
  },
  {
    id: "DOC-003",
    title: "Engine Specifications",
    type: "Technical Specification",
    version: "3.0",
    status: "urgent",
    submittedBy: "David Wilson",
    submittedDate: "2024-01-14",
    size: "3.2 MB"
  },
  {
    id: "DOC-004",
    title: "Maintenance Procedures",
    type: "Operational Manual",
    version: "1.2",
    status: "in-review",
    submittedBy: "Eve Brown",
    submittedDate: "2024-01-13",
    reviewedBy: "Frank Miller",
    size: "4.1 MB"
  },
  {
    id: "DOC-005",
    title: "Quality Assurance Guide",
    type: "Process Documentation",
    version: "2.0",
    status: "rejected",
    submittedBy: "Grace Taylor",
    submittedDate: "2024-01-11",
    reviewedBy: "Henry Wilson",
    reviewDate: "2024-01-14",
    size: "1.5 MB"
  }
]

const getStatusBadge = (status: Document["status"]) => {
  const variants = {
    pending: { 
      className: "bg-radar-warning/10 text-radar-warning border-radar-warning/20",
      icon: Clock
    },
    "in-review": { 
      className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      icon: Eye
    },
    approved: { 
      className: "bg-radar-success/10 text-radar-success border-radar-success/20",
      icon: CheckCircle
    },
    rejected: { 
      className: "bg-radar-danger/10 text-radar-danger border-radar-danger/20",
      icon: AlertTriangle
    },
    urgent: { 
      className: "bg-radar-danger/10 text-radar-danger border-radar-danger/20 animate-pulse",
      icon: AlertTriangle
    }
  }

  const variant = variants[status]
  const Icon = variant.icon

  return (
    <Badge className={cn("text-xs flex items-center gap-1", variant.className)}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </Badge>
  )
}

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage and track all technical documentation
          </p>
        </div>
        <Button variant="radar" size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="radar-outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("in-review")}>
                  In Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("urgent")}>
                  Urgent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document Library ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{doc.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">v{doc.version}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-sm">{doc.submittedBy}</TableCell>
                  <TableCell className="text-sm">{doc.submittedDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}