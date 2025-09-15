import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Map, 
  Search, 
  Layers, 
  Filter, 
  Download, 
  ZoomIn, 
  ZoomOut,
  MapPin,
  TreePine,
  Users,
  FileText,
  Settings
} from 'lucide-react';

export default function FRAAtlas() {
  const mapLayers = [
    { id: 'forest-cover', name: 'Forest Cover', active: true, color: 'bg-green-500' },
    { id: 'claims', name: 'Forest Rights Claims', active: true, color: 'bg-blue-500' },
    { id: 'settlements', name: 'Forest Settlements', active: false, color: 'bg-yellow-500' },
    { id: 'protected-areas', name: 'Protected Areas', active: true, color: 'bg-red-500' },
    { id: 'tribal-villages', name: 'Tribal Villages', active: false, color: 'bg-purple-500' }
  ];

  const regionStats = [
    { region: 'Jharkhand', totalClaims: 1250, approved: 890, pending: 360, area: '12,450 ha' },
    { region: 'Odisha', totalClaims: 2100, approved: 1580, pending: 520, area: '18,920 ha' },
    { region: 'Chhattisgarh', totalClaims: 1800, approved: 1200, pending: 600, area: '15,670 ha' },
    { region: 'Madhya Pradesh', totalClaims: 1950, approved: 1340, pending: 610, area: '22,340 ha' }
  ];

  const quickStats = [
    { label: 'Total Claims Mapped', value: '7,100', icon: FileText, color: 'text-blue-600' },
    { label: 'Forest Area (Ha)', value: '69,380', icon: TreePine, color: 'text-green-600' },
    { label: 'Villages Covered', value: '450', icon: MapPin, color: 'text-purple-600' },
    { label: 'Beneficiaries', value: '28,901', icon: Users, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">FRA Atlas Map</h1>
        <p className="text-muted-foreground">
          Interactive mapping system for Forest Rights Act implementation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Enter village, district..." className="pl-10" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Claim Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Map Layers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Layers className="mr-2 h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mapLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${layer.color}`}></div>
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={layer.active}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-96 lg:h-[600px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  Interactive Map
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              {/* Mock Map Interface */}
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-b-lg overflow-hidden">
                {/* Mock forest areas */}
                <div className="absolute top-10 left-10 w-32 h-24 bg-green-400 opacity-70 rounded-lg"></div>
                <div className="absolute top-20 right-20 w-40 h-32 bg-green-500 opacity-70 rounded-lg"></div>
                <div className="absolute bottom-16 left-16 w-36 h-28 bg-green-400 opacity-70 rounded-lg"></div>
                
                {/* Mock claim markers */}
                <div className="absolute top-16 left-20 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-32 right-32 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute bottom-24 left-28 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-40 left-40 w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Mock villages */}
                <div className="absolute top-24 left-32 w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="absolute bottom-32 right-24 w-2 h-2 bg-purple-600 rounded-full"></div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <h4 className="text-sm font-medium mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Forest Cover</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Approved Claims</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      <span>Pending Claims</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span>Villages</span>
                    </div>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
                  <h4 className="font-medium mb-2">Region: Balaghat District</h4>
                  <div className="space-y-1 text-sm">
                    <p>Total Claims: 245</p>
                    <p>Approved: 180</p>
                    <p>Pending: 65</p>
                    <p>Forest Area: 2,450 ha</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Map className="mx-auto h-16 w-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Interactive Map View</p>
                    <p className="text-sm">Click and zoom to explore forest rights data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Regional Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Statistics</CardTitle>
          <CardDescription>
            Forest Rights Act implementation across different states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Region</th>
                  <th className="text-left p-3">Total Claims</th>
                  <th className="text-left p-3">Approved</th>
                  <th className="text-left p-3">Pending</th>
                  <th className="text-left p-3">Area Allocated</th>
                  <th className="text-left p-3">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {regionStats.map((region, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{region.region}</td>
                    <td className="p-3">{region.totalClaims.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge className="bg-green-100 text-green-800">
                        {region.approved.toLocaleString()}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {region.pending.toLocaleString()}
                      </Badge>
                    </td>
                    <td className="p-3">{region.area}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span>{Math.round((region.approved / region.totalClaims) * 100)}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${(region.approved / region.totalClaims) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}