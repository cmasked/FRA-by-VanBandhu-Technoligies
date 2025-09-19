import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Mail, 
  MessageSquare, 
  Calendar,
  MapPin,
  FileText,
  Users,
  Settings,
  X,
  Phone,
  Smartphone
} from 'lucide-react';

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      title: "Document Submission Deadline Approaching",
      message: "Your additional documents for application FRA2024001234 must be submitted by January 25, 2024.",
      type: "warning",
      timestamp: "2 hours ago",
      read: false,
      actionRequired: true,
      category: "Application"
    },
    {
      id: 2,
      title: "Field Verification Scheduled",
      message: "Field verification for your forest rights claim has been scheduled for January 22, 2024 at 10:00 AM.",
      type: "info",
      timestamp: "1 day ago", 
      read: false,
      actionRequired: true,
      category: "Verification"
    },
    {
      id: 3,
      title: "New Welfare Scheme Available",
      message: "Tribal Healthcare Initiative is now accepting applications. You may be eligible for free medical coverage.",
      type: "success",
      timestamp: "3 days ago",
      read: true,
      actionRequired: false,
      category: "Schemes"
    },
    {
      id: 4,
      title: "Committee Meeting Notice",
      message: "Village Forest Rights Committee meeting scheduled for January 28, 2024. Your presence is required.",
      type: "info",
      timestamp: "5 days ago",
      read: true,
      actionRequired: true,
      category: "Meetings"
    },
    {
      id: 5,
      title: "Application Status Update",
      message: "Your application FRA2024001234 has moved to field verification stage. Expected completion: February 15, 2024.",
      type: "success",
      timestamp: "1 week ago",
      read: true,
      actionRequired: false,
      category: "Status"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      title: "Scheduled Maintenance",
      message: "Portal will be under maintenance on January 30, 2024 from 2:00 AM to 6:00 AM.",
      type: "warning",
      timestamp: "6 hours ago",
      category: "System"
    },
    {
      id: 2,
      title: "New Portal Features",
      message: "Enhanced FRA Atlas with satellite imagery and improved search functionality is now available.",
      type: "info",
      timestamp: "3 days ago",
      category: "Updates"
    },
    {
      id: 3,
      title: "Security Update",
      message: "Two-factor authentication is now mandatory for all user accounts. Please update your security settings.",
      type: "warning",
      timestamp: "1 week ago",
      category: "Security"
    }
  ];

  const notificationSettings = [
    {
      category: "Application Updates",
      description: "Status changes, approvals, rejections",
      email: true,
      sms: true,
      push: true
    },
    {
      category: "Document Requirements",
      description: "Missing documents, deadlines",
      email: true,
      sms: true,
      push: false
    },
    {
      category: "Welfare Schemes",
      description: "New schemes, eligibility alerts",
      email: false,
      sms: false,
      push: true
    },
    {
      category: "Meetings & Events",
      description: "Committee meetings, hearings",
      email: true,
      sms: true,
      push: true
    },
    {
      category: "System Notifications",
      description: "Maintenance, updates, security",
      email: true,
      sms: false,
      push: false
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const actionRequiredCount = alerts.filter(alert => alert.actionRequired && !alert.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your application status and important announcements
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">{unreadCount} unread alerts</p>
            {actionRequiredCount > 0 && (
              <p className="text-xs text-yellow-600">{actionRequiredCount} require action</p>
            )}
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{alerts.length}</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{actionRequiredCount}</p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{alerts.length - unreadCount}</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Alerts</TabsTrigger>
          <TabsTrigger value="system">System Alerts</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        {/* Personal Alerts */}
        <TabsContent value="personal">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`border ${!alert.read ? 'border-primary/20 bg-primary/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium ${!alert.read ? 'font-semibold' : ''}`}>
                            {alert.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getAlertBadgeColor(alert.type)}>
                            {alert.category}
                          </Badge>
                          {alert.actionRequired && (
                            <Badge className="bg-red-100 text-red-800">
                              Action Required
                            </Badge>
                          )}
                          {!alert.read && (
                            <Badge className="bg-blue-100 text-blue-800">
                              New
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </span>
                      </div>

                      {alert.actionRequired && !alert.read && (
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm">
                            Take Action
                          </Button>
                          <Button variant="outline" size="sm">
                            Mark as Read
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Alerts */}
        <TabsContent value="system">
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={getAlertBadgeColor(alert.type)}>
                          {alert.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive different types of notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notificationSettings.map((setting, index) => (
                    <div key={index} className="space-y-3">
                      <div>
                        <h4 className="font-medium">{setting.category}</h4>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Email</span>
                          <Switch defaultChecked={setting.email} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">SMS</span>
                          <Switch defaultChecked={setting.sms} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Push</span>
                          <Switch defaultChecked={setting.push} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update your contact details for receiving notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ramesh.kumar@email.com</span>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">+91 98765 43210</span>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Frequency</CardTitle>
                <CardDescription>
                  Set how often you want to receive digest notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Daily Digest</h4>
                      <p className="text-sm text-muted-foreground">Receive a daily summary of all notifications</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Weekly Summary</h4>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary every Monday</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Instant Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive alerts immediately as they occur</p>
                    </div>
                    <Switch defaultChecked={true} />
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