import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Gift, 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  Users, 
  IndianRupee,
  FileText,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

export default function WelfareSchemes() {
  const categories = [
    'All Categories',
    'Education',
    'Healthcare', 
    'Financial Assistance',
    'Skills Development',
    'Agriculture',
    'Housing',
    'Employment'
  ];

  const schemes = [
    {
      id: 1,
      title: "PM Tribal Development Program",
      category: "Financial Assistance",
      description: "Financial support for tribal families living in forest areas",
      eligibility: "Forest dwelling tribal families with valid FRA certificate",
      benefits: "₹5,000 per month for 6 months",
      deadline: "2024-03-31",
      applicants: "2,450",
      status: "Active",
      rating: 4.5,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      title: "Forest Livelihood Enhancement Scheme",
      category: "Skills Development",
      description: "Skill development and training for sustainable forest-based livelihoods",
      eligibility: "Age 18-45, FRA beneficiary, Tribal community member",
      benefits: "Free training + ₹2,000 monthly stipend",
      deadline: "2024-02-28",
      applicants: "1,234",
      status: "Active",
      rating: 4.3,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      title: "Tribal Education Scholarship",
      category: "Education",
      description: "Educational support for children of forest rights beneficiaries",
      eligibility: "Student from FRA beneficiary family, Age 6-25",
      benefits: "₹12,000 annually + books allowance",
      deadline: "2024-04-15",
      applicants: "3,567",
      status: "Active",
      rating: 4.7,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      title: "Forest Healthcare Initiative",
      category: "Healthcare",
      description: "Comprehensive healthcare coverage for forest communities",
      eligibility: "FRA certificate holder and family members",
      benefits: "Free medical treatment up to ₹5 lakhs",
      deadline: "2024-12-31",
      applicants: "5,678",
      status: "Active", 
      rating: 4.2,
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 5,
      title: "Tribal Housing Development",
      category: "Housing",
      description: "Housing assistance for forest dwelling communities",
      eligibility: "Landless tribal families with FRA recognition",
      benefits: "₹2.5 lakhs for house construction",
      deadline: "2024-06-30",
      applicants: "1,890",
      status: "Limited",
      rating: 4.1,
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 6,
      title: "MGNREGA Forest Works",
      category: "Employment",
      description: "Guaranteed employment in forest conservation activities",
      eligibility: "Adult member of rural household with job card",
      benefits: "₹220 per day for 200 days/year",
      deadline: "Ongoing",
      applicants: "12,456",
      status: "Active",
      rating: 4.0,
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const eligibilityCheck = {
    fraStatus: "Approved",
    tribalCertificate: "Valid",
    residenceProof: "Valid",
    incomeLevel: "Below Poverty Line",
    eligibleSchemes: 4
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welfare Schemes</h1>
        <p className="text-muted-foreground">
          Discover government schemes and benefits available for forest communities
        </p>
      </div>

      {/* Eligibility Overview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="mr-2 h-5 w-5" />
            Your Eligibility Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{eligibilityCheck.eligibleSchemes}</div>
              <p className="text-sm text-green-700">Eligible Schemes</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">FRA Status:</span>
                <Badge className="bg-green-100 text-green-800">{eligibilityCheck.fraStatus}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tribal Certificate:</span>
                <Badge className="bg-green-100 text-green-800">{eligibilityCheck.tribalCertificate}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Residence Proof:</span>
                <Badge className="bg-green-100 text-green-800">{eligibilityCheck.residenceProof}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Income Level:</span>
                <Badge className="bg-blue-100 text-blue-800">{eligibilityCheck.incomeLevel}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Update Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Schemes</CardTitle>
          <CardDescription>Search and filter available welfare schemes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search schemes by name or keywords..." className="pl-10" />
              </div>
            </div>
            <div className="md:w-48">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{scheme.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{scheme.category}</Badge>
                    <Badge className={scheme.statusColor}>{scheme.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(scheme.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      {scheme.rating} ({scheme.applicants} applicants)
                    </span>
                  </div>
                </div>
              </div>
              <CardDescription>{scheme.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Eligibility:</p>
                    <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Benefits:</p>
                    <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">Deadline: </span>
                    <span className="text-sm text-muted-foreground">{scheme.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Apply Now
                </Button>
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
          <CardDescription>Track your welfare scheme applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">PM Tribal Development Program</h4>
                <p className="text-sm text-muted-foreground">Application ID: PMTDP2024001</p>
                <p className="text-xs text-muted-foreground">Applied: Jan 10, 2024</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Clock className="mr-1 h-3 w-3" />
                  Under Review
                </Badge>
                <Button variant="outline" size="sm">View Status</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">Tribal Education Scholarship</h4>
                <p className="text-sm text-muted-foreground">Application ID: TES2024002</p>
                <p className="text-xs text-muted-foreground">Applied: Dec 15, 2023</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Approved
                </Badge>
                <Button variant="outline" size="sm">Download Certificate</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}