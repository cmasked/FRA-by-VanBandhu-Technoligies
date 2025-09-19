import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Video, 
  Headphones,
  Calendar,
  User,
  Star,
  Play,
  Clock
} from 'lucide-react';

export default function KnowledgeHub() {
  const documents = [
    {
      id: 1,
      title: "Forest Rights Act 2006 - Complete Guide",
      type: "Legal Document",
      description: "Comprehensive guide to understanding Forest Rights Act provisions",
      category: "Legal",
      size: "2.5 MB",
      downloads: 12450,
      rating: 4.8,
      lastUpdated: "2024-01-15",
      languages: ["English", "Hindi"]
    },
    {
      id: 2,
      title: "FRA Application Process Handbook",
      type: "Handbook",
      description: "Step-by-step guide for submitting forest rights applications",
      category: "Procedures",
      size: "1.8 MB", 
      downloads: 8934,
      rating: 4.6,
      lastUpdated: "2024-01-10",
      languages: ["English", "Hindi", "Odia"]
    },
    {
      id: 3,
      title: "Community Forest Rights Guidelines",
      type: "Guidelines",
      description: "Detailed procedures for community forest rights claims",
      category: "Procedures",
      size: "3.2 MB",
      downloads: 6721,
      rating: 4.7,
      lastUpdated: "2023-12-20",
      languages: ["English", "Hindi"]
    },
    {
      id: 4,
      title: "Document Checklist for FRA Applications",
      type: "Checklist",
      description: "Essential documents required for various types of applications",
      category: "Requirements",
      size: "0.8 MB",
      downloads: 15678,
      rating: 4.9,
      lastUpdated: "2024-01-08",
      languages: ["English", "Hindi", "Bengali", "Odia"]
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Understanding Your Forest Rights",
      duration: "15:30",
      views: 45672,
      description: "Basic introduction to forest rights and eligibility criteria",
      thumbnail: "video-thumb-1",
      category: "Introduction",
      languages: ["Hindi", "English"]
    },
    {
      id: 2,
      title: "How to Fill FRA Application Forms",
      duration: "22:45",
      views: 32145,
      description: "Detailed walkthrough of application form completion",
      thumbnail: "video-thumb-2",
      category: "Tutorial",
      languages: ["Hindi", "English", "Odia"]
    },
    {
      id: 3,
      title: "Community Forest Rights Explained",
      duration: "18:20",
      views: 28934,
      description: "Understanding community forest rights and collective applications",
      thumbnail: "video-thumb-3",
      category: "Education",
      languages: ["Hindi", "English"]
    },
    {
      id: 4,
      title: "Field Verification Process",
      duration: "12:15",
      views: 19876,
      description: "What to expect during field verification by authorities",
      thumbnail: "video-thumb-4",
      category: "Process",
      languages: ["Hindi", "English", "Bengali"]
    }
  ];

  const audioGuides = [
    {
      id: 1,
      title: "FRA Rights in Simple Language",
      duration: "25:00",
      plays: 8945,
      description: "Easy-to-understand explanation of forest rights",
      category: "Basic",
      language: "Hindi"
    },
    {
      id: 2,
      title: "Application Process Audio Guide",
      duration: "30:15",
      plays: 6721,
      description: "Voice guide through the application process",
      category: "Tutorial",
      language: "Odia"
    },
    {
      id: 3,
      title: "Success Stories from Beneficiaries",
      duration: "35:45",
      plays: 5432,
      description: "Real experiences from FRA beneficiaries",
      category: "Stories",
      language: "Hindi"
    }
  ];

  const faqs = [
    {
      question: "Who is eligible for individual forest rights?",
      answer: "Scheduled Tribes and other traditional forest dwellers who have been residing in forest land before December 13, 2005, and are dependent on forest for their livelihood.",
      category: "Eligibility"
    },
    {
      question: "What is the difference between individual and community forest rights?",
      answer: "Individual rights are granted to families for residence and cultivation, while community rights are granted to entire communities for access to forest resources and management.",
      category: "Types"
    },
    {
      question: "How long does the application process take?",
      answer: "The complete process typically takes 6-12 months, depending on the complexity of the case and completeness of documentation.",
      category: "Process"
    },
    {
      question: "Can I appeal if my application is rejected?",
      answer: "Yes, you can appeal to the Sub-Divisional Level Committee within 60 days of receiving the rejection order.",
      category: "Appeals"
    }
  ];

  const categories = ["All", "Legal", "Procedures", "Requirements", "Stories", "Technical"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Comprehensive resources and guides for Forest Rights Act
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search guides, documents, videos..." className="pl-10" />
              </div>
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center">
            <Headphones className="mr-2 h-4 w-4" />
            Audio Guides
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{doc.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{doc.type}</Badge>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>{doc.downloads.toLocaleString()} downloads</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{doc.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Updated:</span>
                      <span className="text-muted-foreground">{doc.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Languages:</span>
                      <div className="flex space-x-1">
                        {doc.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="mx-auto h-12 w-12 text-white bg-primary rounded-full p-3 mb-2" />
                        <p className="text-sm text-muted-foreground">Video Thumbnail</p>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-4">{video.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{video.views.toLocaleString()} views</span>
                    <Badge variant="outline">{video.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{video.description}</CardDescription>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Available in:</span>
                      <div className="flex space-x-1">
                        {video.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Play Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audio Guides Tab */}
        <TabsContent value="audio">
          <div className="space-y-4">
            {audioGuides.map((audio) => (
              <Card key={audio.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Headphones className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{audio.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{audio.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{audio.duration}</span>
                        </div>
                        <span>{audio.plays.toLocaleString()} plays</span>
                        <Badge variant="outline">{audio.language}</Badge>
                        <Badge variant="secondary">{audio.category}</Badge>
                      </div>
                    </div>
                    <Button>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <Badge variant="outline">{faq.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Popular Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Resources This Month</CardTitle>
          <CardDescription>Most accessed content by users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Application Forms</p>
                <p className="text-xs text-muted-foreground">25K downloads</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Video className="h-8 w-8 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Tutorial Videos</p>
                <p className="text-xs text-muted-foreground">45K views</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <BookOpen className="h-8 w-8 text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Legal Guidelines</p>
                <p className="text-xs text-muted-foreground">18K reads</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}