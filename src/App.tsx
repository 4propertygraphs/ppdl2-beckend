import React, { useState } from 'react';
import { Building2, Users, Database, Settings, Home, Search, MapPin, DollarSign } from 'lucide-react';
import SystemOverview from './components/SystemOverview';
import PropertiesDemo from './components/PropertiesDemo';
import AgenciesDemo from './components/AgenciesDemo';
import ConnectorsDemo from './components/ConnectorsDemo';
import ApiDemo from './components/ApiDemo';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'agencies', label: 'Agencies', icon: Users },
    { id: 'connectors', label: 'Connectors', icon: Database },
    { id: 'api', label: 'API Demo', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SystemOverview />;
      case 'properties':
        return <PropertiesDemo />;
      case 'agencies':
        return <AgenciesDemo />;
      case 'connectors':
        return <ConnectorsDemo />;
      case 'api':
        return <ApiDemo />;
      default:
        return <SystemOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Property Lookup System</h1>
                <p className="text-sm text-gray-500">Real Estate Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Search className="w-4 h-4" />
              <span>Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;