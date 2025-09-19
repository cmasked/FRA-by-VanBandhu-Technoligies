import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Paperclip, 
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  helpful?: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your Forest Rights Assistant. I can help you with information about FRA applications, document requirements, claim status, and welfare schemes. How can I assist you today?",
      sender: 'bot',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);



  const contactInfo = [
    {
      type: "Phone",
      value: "1800-180-1234",
      icon: Phone,
      description: "Toll-free helpline (9 AM - 6 PM)"
    },
    {
      type: "Email", 
      value: "support@forestrights.gov.in",
      icon: Mail,
      description: "Email support (24/7)"
    },
    {
      type: "Document",
      value: "Download FRA Guidelines",
      icon: FileText,
      description: "Complete guide (PDF)"
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('apply') || input.includes('application')) {
      return "To apply for Forest Rights under FRA:\n\n1. Fill out Form A (Individual) or Form B (Community)\n2. Gather required documents (identity proof, residence proof, occupation evidence)\n3. Submit to Village Forest Rights Committee (VFRC)\n4. Attend Gram Sabha meeting\n5. Await field verification\n\nWould you like specific information about any of these steps?";
    }
    
    if (input.includes('document') || input.includes('required')) {
      return "Required documents for FRA application:\n\n📄 Identity Proof: Aadhaar, Voter ID, or Passport\n📄 Residence Proof: Ration card or village certificate\n📄 Occupation Evidence: Photos, witnesses, or revenue records showing forest occupation before 2005\n📄 ST/OTFD Certificate: Tribal or traditional forest dweller certificate\n\nOptional: Survey settlement records, family tree documents";
    }
    
    if (input.includes('status') || input.includes('track')) {
      return "To check your claim status:\n\n1. Visit the 'Claim Status' section\n2. Enter your Application ID (e.g., FRA2024001234)\n3. Or use your Aadhaar number\n\nYour current application shows:\n• Stage: Field Verification\n• Progress: 60% complete\n• Expected completion: Feb 15, 2024\n\nWould you like me to show you the detailed timeline?";
    }
    
    if (input.includes('welfare') || input.includes('scheme')) {
      return "Available welfare schemes for forest communities:\n\n🎓 Tribal Education Scholarship: ₹12,000 annually\n💰 PM Tribal Development: ₹5,000 monthly support\n🏠 Housing Development: ₹2.5 lakhs for construction\n⚕️ Healthcare Initiative: Free treatment up to ₹5 lakhs\n💼 Skills Development: Free training + stipend\n\nYou're eligible for 4 schemes based on your FRA status. Would you like details about any specific scheme?";
    }
    
    if (input.includes('map') || input.includes('atlas')) {
      return "The FRA Atlas provides:\n\n🗺️ Interactive maps showing forest cover\n📍 Approved and pending claim locations\n🏘️ Tribal villages and settlements\n📊 Regional statistics and progress\n\nYou can:\n• Search by location\n• Filter by claim status\n• View forest settlement boundaries\n• Download maps and reports\n\nWould you like help navigating the Atlas?";
    }
    
    return "I understand you're asking about Forest Rights. I can help with:\n\n• FRA application process\n• Document requirements\n• Claim status tracking\n• Welfare schemes\n• Map and location information\n• Committee procedures\n\nCould you please be more specific about what you'd like to know? Or you can choose from the quick questions below.";
  };



  const markHelpful = (messageId: number, helpful: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">FRA Chatbot Assistant</h1>
        <p className="text-muted-foreground">
          Get instant help with forest rights applications and procedures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat Assistant
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                          </p>
                          {message.sender === 'bot' && (
                            <div className="flex space-x-2 mt-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2"
                                onClick={() => markHelpful(message.id, true)}
                              >
                                <ThumbsUp className={`h-3 w-3 ${message.helpful === true ? 'text-green-600' : ''}`} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2"
                                onClick={() => markHelpful(message.id, false)}
                              >
                                <ThumbsDown className={`h-3 w-3 ${message.helpful === false ? 'text-red-600' : ''}`} />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex space-x-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your question about Forest Rights..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need More Help?</CardTitle>
              <CardDescription>Alternative ways to get support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contact.value}</p>
                        <p className="text-xs text-muted-foreground">{contact.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chat Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear Conversation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Transcript
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bot Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assistant Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time:</span>
                  <span className="text-sm text-muted-foreground">~2 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accuracy:</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Languages:</span>
                  <span className="text-sm text-muted-foreground">EN, HI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}