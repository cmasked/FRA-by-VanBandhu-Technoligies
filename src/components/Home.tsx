import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, CheckCircle, Users, TreePine, TrendingUp, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section with Forest Image */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1707059625256-9092db31a748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5zZSUyMGdyZWVuJTIwZm9yZXN0JTIwdHJlZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzU3ODM0MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Dense green forest"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 max-w-3xl px-6">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Technology Solutions
              </Badge>
              
              <h1 className="text-white text-4xl md:text-6xl">
                Welcome to <span className="text-primary">VanBandhu Technologies</span>
              </h1>
              
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                Innovative technology solutions for forest management, environmental conservation, 
                and sustainable development initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview of FRA Progress Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2>Overview of FRA Progress</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into Forest Rights Act implementation across India, 
            tracking claims, approvals, and community empowerment initiatives.
          </p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl">28.5L</p>
                <p className="text-sm text-muted-foreground">Total Claims Filed</p>
                <Badge variant="default" className="text-xs">+15% This Year</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl">21.8L</p>
                <p className="text-sm text-muted-foreground">Claims Approved</p>
                <Badge variant="default" className="text-xs">76.5% Success Rate</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl">24,250</p>
                <p className="text-sm text-muted-foreground">CFR Villages</p>
                <Badge variant="default" className="text-xs">+22% Growth</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <TreePine className="h-8 w-8 text-green-700" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl">32.5L</p>
                <p className="text-sm text-muted-foreground">Hectares Distributed</p>
                <Badge variant="default" className="text-xs">Area Granted</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Indicators */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                National Implementation Progress
              </CardTitle>
              <CardDescription>Overall FRA implementation across all states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Claims Processing</span>
                  <span>76.5%</span>
                </div>
                <Progress value={76.5} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Community Rights Granted</span>
                  <span>68.2%</span>
                </div>
                <Progress value={68.2} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Digital Documentation</span>
                  <span>85.3%</span>
                </div>
                <Progress value={85.3} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Regional Highlights
              </CardTitle>
              <CardDescription>Top performing states in FRA implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Odisha</p>
                    <p className="text-sm text-muted-foreground">2.9L claims approved</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">84% Success</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Chhattisgarh</p>
                    <p className="text-sm text-muted-foreground">2.24L claims approved</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">80% Success</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Jharkhand</p>
                    <p className="text-sm text-muted-foreground">1.65L claims approved</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">75% Success</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Achievements */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3>Key Achievements in 2024</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <div className="text-3xl text-primary">4.2L</div>
                  <div className="text-sm text-muted-foreground">New Claims Processed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl text-primary">18%</div>
                  <div className="text-sm text-muted-foreground">Increase in Approvals</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl text-primary">15</div>
                  <div className="text-sm text-muted-foreground">States Above 70% Implementation</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status indicators */}
      <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground border-t pt-8">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Systems Online</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Data Updated</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Services Available</span>
        </div>
      </div>
    </div>
  );
}