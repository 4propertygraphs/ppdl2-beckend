import React from 'react';
import { Database, Users, Building2, Zap, Globe, Shield, Code, BarChart3 } from 'lucide-react';

const SystemOverview = () => {
  const features = [
    {
      icon: Database,
      title: 'Property Management',
      description: 'Comprehensive property database with detailed information, images, and metadata.',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Agency Integration',
      description: 'Multi-agency support with API keys for Daft, MyHome, and 4PM platforms.',
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      title: 'Data Connectors',
      description: 'Flexible connector system for integrating various property data sources.',
      color: 'bg-purple-500'
    },
    {
      icon: Globe,
      title: 'External APIs',
      description: 'Integration with major Irish property platforms and CRM systems.',
      color: 'bg-orange-500'
    },
    {
      icon: Shield,
      title: 'User Authentication',
      description: 'Secure JWT-based authentication with user management capabilities.',
      color: 'bg-red-500'
    },
    {
      icon: Code,
      title: 'RESTful API',
      description: 'Well-structured REST API endpoints for all system operations.',
      color: 'bg-indigo-500'
    }
  ];

  const architecture = [
    {
      layer: 'Frontend',
      description: 'React-based user interface for property management',
      technologies: ['React', 'TypeScript', 'Tailwind CSS']
    },
    {
      layer: 'Backend API',
      description: 'Flask-based REST API with comprehensive endpoints',
      technologies: ['Flask', 'Python', 'JWT Authentication']
    },
    {
      layer: 'Database',
      description: 'MySQL database with SQLAlchemy ORM',
      technologies: ['MySQL', 'SQLAlchemy', 'Database Models']
    },
    {
      layer: 'External APIs',
      description: 'Integration with property platforms',
      technologies: ['4PM API', 'MyHome API', 'Daft API', 'Acquaint CRM']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
        <Building2 className="w-16 h-16 mx-auto mb-4 opacity-90" />
        <h1 className="text-4xl font-bold mb-4">Property Lookup System</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          A comprehensive real estate management platform that integrates multiple property data sources 
          and provides powerful tools for agencies and property professionals.
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card hover:scale-105 transform transition-all duration-200">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Architecture */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
        <div className="space-y-4">
          {architecture.map((layer, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{layer.layer}</h3>
                  <p className="text-gray-600 mb-3">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-2xl font-bold text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="card bg-gradient-to-r from-gray-50 to-blue-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Collection</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Scrapes property data from Daft.ie using Selenium</li>
              <li>• Integrates with 4PM, MyHome, and Acquaint APIs</li>
              <li>• Processes XML and JSON data formats</li>
              <li>• Stores normalized data in MySQL database</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">API Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• RESTful endpoints for CRUD operations</li>
              <li>• JWT-based authentication system</li>
              <li>• Cross-origin resource sharing (CORS) enabled</li>
              <li>• Field mapping for different data sources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;