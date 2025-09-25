import React, { useState } from 'react';
import { Users, Building, MapPin, Key, Globe, Edit, Eye } from 'lucide-react';

const AgenciesDemo = () => {
  const [selectedAgency, setSelectedAgency] = useState<any>(null);

  const sampleAgencies = [
    {
      id: 1,
      name: "Dublin Properties Ltd",
      address: "123 Grafton Street, Dublin 2",
      logo: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      site_name: "dublinproperties.ie",
      site_prefix: "DPL",
      myhome_api_key: "mh_api_key_123",
      myhome_group_id: 1001,
      daft_api_key: "daft_key_456",
      fourpm_branch_id: 789,
      key: "unique_key_dublin_123",
      office_name: "Dublin Central Office",
      ghl_id: "ghl_dublin_001",
      whmcs_id: "whmcs_dublin_001"
    },
    {
      id: 2,
      name: "Cork Estate Agents",
      address: "45 Patrick Street, Cork",
      logo: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      site_name: "corkestate.ie",
      site_prefix: "CEA",
      myhome_api_key: "mh_api_key_789",
      myhome_group_id: 1002,
      daft_api_key: "daft_key_012",
      fourpm_branch_id: 345,
      key: "unique_key_cork_456",
      office_name: "Cork Main Office",
      ghl_id: "ghl_cork_002",
      whmcs_id: "whmcs_cork_002"
    },
    {
      id: 3,
      name: "Galway Homes",
      address: "78 Shop Street, Galway",
      logo: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      site_name: "galwayhomes.ie",
      site_prefix: "GH",
      myhome_api_key: "mh_api_key_345",
      myhome_group_id: 1003,
      daft_api_key: "daft_key_678",
      fourpm_branch_id: 901,
      key: "unique_key_galway_789",
      office_name: "Galway City Office",
      ghl_id: "ghl_galway_003",
      whmcs_id: "whmcs_galway_003"
    }
  ];

  const AgencyCard = ({ agency }: { agency: any }) => (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={agency.logo}
            alt={agency.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{agency.name}</h3>
            <p className="text-sm text-gray-500">{agency.office_name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedAgency(agency)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{agency.address}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Globe className="w-4 h-4 mr-2" />
          <span className="text-sm">{agency.site_name}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">{agency.myhome_group_id}</div>
            <div className="text-xs text-gray-500">MyHome ID</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">{agency.fourpm_branch_id}</div>
            <div className="text-xs text-gray-500">4PM Branch</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {agency.site_prefix}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Daft API
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
            MyHome API
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Agencies Management
          </h1>
          <p className="text-gray-600 mt-2">Manage real estate agencies and their API integrations</p>
        </div>
        <button className="btn-primary">
          Add New Agency
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{sampleAgencies.length}</div>
          <div className="text-sm text-gray-500">Total Agencies</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{sampleAgencies.filter(a => a.daft_api_key).length}</div>
          <div className="text-sm text-gray-500">Daft Integrations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{sampleAgencies.filter(a => a.myhome_api_key).length}</div>
          <div className="text-sm text-gray-500">MyHome Integrations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{sampleAgencies.filter(a => a.fourpm_branch_id).length}</div>
          <div className="text-sm text-gray-500">4PM Integrations</div>
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleAgencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>

      {/* Agency Detail Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Agency Details</h2>
                <button
                  onClick={() => setSelectedAgency(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={selectedAgency.logo}
                    alt={selectedAgency.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedAgency.name}</h3>
                    <p className="text-gray-600">{selectedAgency.office_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Basic Information</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <p className="text-gray-900">{selectedAgency.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <p className="text-blue-600">{selectedAgency.site_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Prefix</label>
                      <p className="text-gray-900">{selectedAgency.site_prefix}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unique Key</label>
                      <p className="text-gray-900 font-mono text-sm bg-gray-100 p-2 rounded">
                        {selectedAgency.key}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">API Integrations</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MyHome API Key</label>
                      <p className="text-gray-900 font-mono text-sm bg-gray-100 p-2 rounded">
                        {selectedAgency.myhome_api_key}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MyHome Group ID</label>
                      <p className="text-gray-900">{selectedAgency.myhome_group_id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Daft API Key</label>
                      <p className="text-gray-900 font-mono text-sm bg-gray-100 p-2 rounded">
                        {selectedAgency.daft_api_key}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">4PM Branch ID</label>
                      <p className="text-gray-900">{selectedAgency.fourpm_branch_id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GHL ID</label>
                    <p className="text-gray-900 font-mono text-sm bg-gray-100 p-2 rounded">
                      {selectedAgency.ghl_id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WHMCS ID</label>
                    <p className="text-gray-900 font-mono text-sm bg-gray-100 p-2 rounded">
                      {selectedAgency.whmcs_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenciesDemo;