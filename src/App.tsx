import React from 'react';
import { Server, Database, Key, Users, Building2, Globe, Code } from 'lucide-react';

function App() {
  const endpoints = [
    {
      category: "Authentication",
      icon: Key,
      color: "bg-red-500",
      routes: [
        {
          method: "POST",
          path: "/api/signup",
          description: "Create a new user account",
          body: "{ username, email, password }"
        },
        {
          method: "POST",
          path: "/api/login", 
          description: "Login user and get JWT token",
          body: "{ email, password }"
        },
        {
          method: "POST",
          path: "/api/verify_token",
          description: "Verify JWT token validity",
          body: "{ token }"
        }
      ]
    },
    {
      category: "User Management",
      icon: Users,
      color: "bg-blue-500",
      routes: [
        {
          method: "PUT",
          path: "/api/users/<id>",
          description: "Update user information",
          body: "{ username?, email?, password? }"
        }
      ]
    },
    {
      category: "Properties",
      icon: Building2,
      color: "bg-green-500",
      routes: [
        {
          method: "POST",
          path: "/api/properties",
          description: "Add new property",
          body: "{ agent_name, agency_name, location, price, bedrooms, bathrooms, mt_squared, extra_info, agency_image_url, images_url_house }"
        },
        {
          method: "GET",
          path: "/api/properties?key=<api_key>",
          description: "Get properties from 4PM API",
          body: "Query param: key (required)"
        },
        {
          method: "PUT",
          path: "/api/properties/<id>",
          description: "Update property by ID",
          body: "{ agent_name?, agency_name?, location?, price?, ... }"
        },
        {
          method: "DELETE",
          path: "/api/properties/<id>",
          description: "Delete property by ID",
          body: "None"
        }
      ]
    },
    {
      category: "Agencies",
      icon: Globe,
      color: "bg-purple-500",
      routes: [
        {
          method: "GET",
          path: "/api/agencies",
          description: "Get all agencies from database",
          body: "None"
        },
        {
          method: "GET",
          path: "/api/agencies/<id>",
          description: "Get single agency by ID",
          body: "None"
        },
        {
          method: "PUT",
          path: "/api/agencies/<id>",
          description: "Update agency information",
          body: "{ name?, address1?, address2?, logo?, site_name?, myhome_api_key?, daft_api_key?, ... }"
        }
      ]
    },
    {
      category: "External APIs",
      icon: Database,
      color: "bg-orange-500",
      routes: [
        {
          method: "GET",
          path: "/api/myhome?key=<api_key>&id=<property_id>",
          description: "Get property from MyHome API",
          body: "Query params: key, id (both required)"
        },
        {
          method: "GET",
          path: "/api/acquaint?key=<api_key>&id=<property_id>",
          description: "Get property from Acquaint CRM XML",
          body: "Query params: key, id (both required)"
        }
      ]
    },
    {
      category: "System Data",
      icon: Code,
      color: "bg-indigo-500",
      routes: [
        {
          method: "GET",
          path: "/api/connectors",
          description: "Get all connectors",
          body: "None"
        },
        {
          method: "GET",
          path: "/api/pipelines",
          description: "Get all pipelines",
          body: "None"
        },
        {
          method: "GET",
          path: "/api/field_mappings",
          description: "Get field mappings for different platforms",
          body: "None"
        }
      ]
    }
  ];

  const MethodBadge = ({ method }: { method: string }) => {
    const colors = {
      GET: "bg-green-100 text-green-800",
      POST: "bg-blue-100 text-blue-800", 
      PUT: "bg-yellow-100 text-yellow-800",
      DELETE: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[method as keyof typeof colors]}`}>
        {method}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Flask Backend API</h1>
                <p className="text-sm text-gray-500">Property Lookup System Endpoints</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ready to Run</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* How to Run */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">How to Run Your Backend</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lg font-semibold mb-2">1. Install Dependencies</div>
              <code className="text-sm opacity-90">pip install -r requirements.txt</code>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lg font-semibold mb-2">2. Navigate to Models</div>
              <code className="text-sm opacity-90">cd Models</code>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lg font-semibold mb-2">3. Run Flask App</div>
              <code className="text-sm opacity-90">python App.py</code>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
            <div className="font-semibold mb-2">Server will start at:</div>
            <code className="text-lg">http://localhost:5000</code>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          {endpoints.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`${category.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {category.routes.map((route, routeIndex) => (
                      <div key={routeIndex} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <MethodBadge method={route.method} />
                            <code className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                              {route.path}
                            </code>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{route.description}</p>
                        
                        {route.body !== "None" && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Request Body:</div>
                            <code className="text-xs text-gray-600 bg-gray-100 p-2 rounded block">
                              {route.body}
                            </code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Configuration Notes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Configuration Required</h3>
          <div className="space-y-2 text-yellow-700">
            <p>• Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file with database connection string</p>
            <p>• Set up MySQL database with the required tables (users, properties, agencies, etc.)</p>
            <p>• Configure CORS settings for your frontend origin</p>
            <p>• Add your API keys for external services (4PM, MyHome, Daft, Acquaint)</p>
          </div>
        </div>

        {/* Database Models */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['User', 'Property', 'Agency', 'Connector', 'Pipeline', 'Site'].map((model) => (
              <div key={model} className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900">{model}</div>
                <div className="text-sm text-gray-500">SQLAlchemy Model</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;