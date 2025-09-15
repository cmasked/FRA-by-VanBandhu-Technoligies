import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Edit, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';

export default function UserProfile() {
  const userInfo = {
    name: "Ramesh Kumar Singh",
    email: "ramesh.kumar@email.com",
    phone: "+91 98765 43210",
    aadhaar: "XXXX XXXX 4321",
    address: "Village Khargaon, Tehsil Balaghat, District Balaghat, Madhya Pradesh - 481001",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    category: "Scheduled Tribe",
    occupation: "Forest-based Livelihood",
    registrationDate: "2023-12-10",
    lastLogin: "2024-01-18 10:30 AM"
  };

  const familyMembers = [
    {
      name: "Sunita Singh",
      relationship: "Spouse",
      age: 38,
      aadhaar: "XXXX XXXX 5678",
      occupation: "Homemaker"
    },
    {
      name: "Arjun Singh",
      relationship: "Son",
      age: 16,
      aadhaar: "XXXX XXXX 9012",
      occupation: "Student"
    },
    {
      name: "Priya Singh",
      relationship: "Daughter",
      age: 12,
      aadhaar: "XXXX XXXX 3456",
      occupation: "Student"
    }
  ];

  const documents = [
    {
      type: "Aadhaar Card",
      status: "Verified",
      uploadDate: "2023-12-10",
      expiryDate: null,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      type: "Tribal Certificate",
      status: "Verified",
      uploadDate: "2023-12-10",
      expiryDate: "2025-12-10",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      type: "Residence Proof",
      status: "Verified",
      uploadDate: "2023-12-12",
      expiryDate: null,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      type: "Income Certificate",
      status: "Pending Verification",
      uploadDate: "2024-01-15",
      expiryDate: "2024-12-15",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      type: "Bank Passbook",
      status: "Verified",
      uploadDate: "2023-12-10",
      expiryDate: null,
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const applicationHistory = [
    {
      id: "FRA2024001234",
      type: "Individual Forest Rights",
      status: "Under Review",
      submissionDate: "2024-01-10",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "WS2023001100",
      type: "Tribal Education Scholarship",
      status: "Approved",
      submissionDate: "2023-11-20",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "HS2023000890",
      type: "Housing Development Scheme",
      status: "Completed",
      submissionDate: "2023-08-15",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const securitySettings = [
    {
      setting: "Two-Factor Authentication",
      status: "Enabled",
      description: "Extra security layer for your account",
      enabled: true
    },
    {
      setting: "Login Notifications",
      status: "Enabled",
      description: "Get notified of new login attempts",
      enabled: true
    },
    {
      setting: "Data Encryption",
      status: "Enabled",
      description: "Your data is encrypted at rest",
      enabled: true
    },
    {
      setting: "Account Recovery",
      status: "Configured",
      description: "Recovery options set up",
      enabled: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userInfo.name} />
                <AvatarFallback className="text-lg">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl font-semibold">{userInfo.name}</h2>
                <p className="text-muted-foreground">{userInfo.category}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userInfo.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Member since {userInfo.registrationDate}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified Account
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">
                  Active FRA Applicant
                </Badge>
              </div>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="family">Family Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={userInfo.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userInfo.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={userInfo.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input id="aadhaar" defaultValue={userInfo.aadhaar} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue={userInfo.dateOfBirth} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" defaultValue={userInfo.gender} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" defaultValue={userInfo.category} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" defaultValue={userInfo.occupation} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={userInfo.address} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Family Details */}
        <TabsContent value="family">
          <Card>
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
              <CardDescription>
                Manage family member information for FRA applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground mt-1">
                        <span>Relationship: {member.relationship}</span>
                        <span>Age: {member.age}</span>
                        <span>Aadhaar: {member.aadhaar}</span>
                        <span>Occupation: {member.occupation}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Add Family Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                View and manage your uploaded documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{doc.type}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>Uploaded: {doc.uploadDate}</span>
                          {doc.expiryDate && (
                            <span>• Expires: {doc.expiryDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={doc.statusColor}>
                        {doc.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Replace
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>
                Your previous applications and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationHistory.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{app.id}</h4>
                      <p className="text-sm text-muted-foreground">{app.type}</p>
                      <p className="text-xs text-muted-foreground">Submitted: {app.submissionDate}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={app.statusColor}>
                        {app.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securitySettings.map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className={`h-5 w-5 ${setting.enabled ? 'text-green-500' : 'text-gray-400'}`} />
                        <div>
                          <h4 className="font-medium">{setting.setting}</h4>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={setting.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {setting.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your account password for better security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>
                  Recent login attempts and device information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last successful login:</span>
                    <span className="text-muted-foreground">{userInfo.lastLogin}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Device:</span>
                    <span className="text-muted-foreground">Chrome on Windows</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Location:</span>
                    <span className="text-muted-foreground">Balaghat, Madhya Pradesh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}