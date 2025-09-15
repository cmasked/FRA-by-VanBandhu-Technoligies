import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import UploadDocuments from './components/UploadDocuments';
import ClaimStatus from './components/ClaimStatus';
import FRAAtlas from './components/FRAAtlas';
import WelfareSchemes from './components/WelfareSchemes';
import Chatbot from './components/Chatbot';
import KnowledgeHub from './components/KnowledgeHub';
import Alerts from './components/Alerts';
import UserProfile from './components/UserProfile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadDocuments />;
      case 'claim-status':
        return <ClaimStatus />;
      case 'fra-atlas':
        return <FRAAtlas />;
      case 'welfare-schemes':
        return <WelfareSchemes />;
      case 'chatbot':
        return <Chatbot />;
      case 'knowledge-hub':
        return <KnowledgeHub />;
      case 'alerts':
        return <Alerts />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Home />;
    }
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onProfileClick={handleProfileClick} />
      
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}