import { 
  Home,
  LayoutDashboard, 
  Upload, 
  FileText, 
  Map, 
  Gift, 
  MessageCircle, 
  BookOpen, 
  Bell, 
  User 
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload Documents', icon: Upload },
  { id: 'claim-status', label: 'Claim Status', icon: FileText },
  { id: 'fra-atlas', label: 'FRA Atlas Map', icon: Map },
  { id: 'welfare-schemes', label: 'Welfare Schemes', icon: Gift },
  { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
  { id: 'knowledge-hub', label: 'Knowledge Hub', icon: BookOpen },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'profile', label: 'User Profile', icon: User },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-card border-r border-border w-64 h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Services</h2>
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'alerts' && (
                  <Badge className="ml-2 bg-red-500 text-white">3</Badge>
                )}
                {item.id === 'chatbot' && (
                  <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}