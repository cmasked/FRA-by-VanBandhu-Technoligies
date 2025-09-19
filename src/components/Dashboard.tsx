import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  FileText, 
  Users, 
  TreePine, 
  MapPin, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Search
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: "Total Projects",
      value: "247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Completed Projects",
      value: "189",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Active Clients",
      value: "156",
      change: "+18%",
      icon: TreePine,
      color: "text-primary"
    },
    {
      title: "Team Members",
      value: "52",
      change: "+15%",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const recentClaims = [
    {
      id: "VB2024001",
      applicant: "Raj Patel",
      location: "Mumbai",
      status: "Under Review",
      date: "2024-01-15",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "VB2024002",
      applicant: "Priya Sharma",
      location: "Delhi",
      status: "Approved",
      date: "2024-01-14",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "VB2024003",
      applicant: "Amit Singh",
      location: "Bangalore",
      status: "Documents Required",
      date: "2024-01-13",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  const pieData = [
    { name: 'Active Projects', value: 35, color: '#14b8a6' },
    { name: 'Completed', value: 45, color: '#0d9488' },
    { name: 'On Hold', value: 12, color: '#5eead4' },
    { name: 'Planning', value: 8, color: '#99f6e4' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-teal-600 text-white rounded-lg p-8">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">VanBandhu Technologies Dashboard</h1>
          <p className="text-lg opacity-90 mb-6">
            Monitor your projects and track progress with our comprehensive analytics platform
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Upload className="mr-2 h-4 w-4" />
              Upload Project
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Search className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Distribution Chart and Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
            <CardDescription>Overview of project status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project updates and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{claim.id}</span>
                      <Badge className={claim.statusColor}>
                        {claim.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {claim.applicant} • {claim.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {claim.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress Overview</CardTitle>
            <CardDescription>Current development metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Projects Completed</span>
                <span>76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Client Satisfaction</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Technology Adoption</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Project Deadline Approaching</p>
                <p className="text-xs text-muted-foreground">
                  3 projects require final deliverables by Jan 25, 2024
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Monthly Target Achieved</p>
                <p className="text-xs text-muted-foreground">
                  Successfully delivered 98% of planned milestones this month
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">New Client Acquisitions</p>
                <p className="text-xs text-muted-foreground">
                  18% increase in new client partnerships this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}