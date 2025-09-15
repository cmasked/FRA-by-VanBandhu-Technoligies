import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Download,
  Eye
} from 'lucide-react';

export default function ClaimStatus() {
  const currentClaim = {
    id: "FRA2024001234",
    applicant: "Ramesh Kumar Singh",
    type: "Individual Forest Rights",
    submissionDate: "2024-01-10",
    location: "Village Khargaon, Tehsil Balaghat, District Balaghat, Madhya Pradesh",
    currentStage: "Field Verification",
    progress: 60,
    status: "Under Review",
    estimatedCompletion: "2024-02-15"
  };

  const statusStages = [
    {
      stage: "Application Submitted",
      date: "2024-01-10",
      status: "completed",
      description: "Application received and initial verification completed"
    },
    {
      stage: "Document Verification",
      date: "2024-01-12",
      status: "completed",
      description: "All required documents verified and approved"
    },
    {
      stage: "Field Verification",
      date: "2024-01-18",
      status: "current",
      description: "Field officer assigned for on-site verification"
    },
    {
      stage: "Committee Review",
      date: "Expected: 2024-01-25",
      status: "pending",
      description: "Review by Village Forest Rights Committee"
    },
    {
      stage: "Final Approval",
      date: "Expected: 2024-02-10",
      status: "pending",
      description: "Final approval and title deed issuance"
    }
  ];

  const claimHistory = [
    {
      id: "FRA2023001100",
      type: "Community Forest Rights",
      submissionDate: "2023-08-15",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "FRA2023000890",
      type: "Individual Forest Rights",
      submissionDate: "2023-06-20",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800"
    },
    {
      id: "FRA2023000654",
      type: "Community Resource Rights",
      submissionDate: "2023-04-10",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Claim Status</h1>
        <p className="text-muted-foreground">
          Track the progress of your Forest Rights Act applications
        </p>
      </div>

      {/* Search Claims */}
      <Card>
        <CardHeader>
          <CardTitle>Search Claims</CardTitle>
          <CardDescription>
            Enter your application ID or Aadhaar number to track status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input 
                placeholder="Enter Application ID (e.g., FRA2024001234)" 
                className="w-full"
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Application Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Current Application Status</span>
          </CardTitle>
          <CardDescription>
            Application ID: {currentClaim.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Applicant:</span>
                <span className="text-sm">{currentClaim.applicant}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm">{currentClaim.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Submitted:</span>
                <span className="text-sm">{currentClaim.submissionDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Location:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                {currentClaim.location}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{currentClaim.progress}%</span>
            </div>
            <Progress value={currentClaim.progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Current Stage: {currentClaim.currentStage}</span>
              <span>Est. Completion: {currentClaim.estimatedCompletion}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
          <CardDescription>
            Detailed progress of your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {statusStages.map((stage, index) => (
              <div key={index} className="flex items-start space-x-4 pb-8 last:pb-0">
                {/* Timeline line */}
                {index < statusStages.length - 1 && (
                  <div className="absolute left-6 top-8 w-0.5 h-16 bg-border"></div>
                )}
                
                {/* Status icon */}
                <div className="relative z-10 flex-shrink-0">
                  {getStatusIcon(stage.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${
                      stage.status === 'completed' ? 'text-green-700' :
                      stage.status === 'current' ? 'text-blue-700' :
                      'text-muted-foreground'
                    }`}>
                      {stage.stage}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {stage.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                  {stage.status === 'current' && (
                    <Badge className="bg-blue-100 text-blue-800">
                      In Progress
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Applications</CardTitle>
          <CardDescription>
            History of your past Forest Rights applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claimHistory.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{claim.id}</p>
                      <p className="text-sm text-muted-foreground">{claim.type}</p>
                    </div>
                    <Badge className={claim.statusColor}>
                      {claim.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted: {claim.submissionDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  {claim.status === 'Approved' && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Certificate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}