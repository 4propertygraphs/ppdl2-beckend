import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Bed, Bath, Square, Image, Eye, Edit, Trash2 } from 'lucide-react';

const PropertiesDemo = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const sampleProperties = [
    {
      id: 1,
      agency_agent_name: "Sarah O'Connor",
      agency_name: "Dublin Properties Ltd",
      house_location: "Ballsbridge, Dublin 4",
      house_price: "€850,000",
      house_bedrooms: 3,
      house_bathrooms: 2,
      house_mt_squared: "120 m²",
      house_extra_info_1: "Garden",
      house_extra_info_2: "Parking",
      house_extra_info_3: "Modern Kitchen",
      house_extra_info_4: "Close to DART",
      agency_image_url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      images_url_house: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: 2,
      agency_agent_name: "Michael Walsh",
      agency_name: "Cork Estate Agents",
      house_location: "Blackrock, Cork",
      house_price: "€425,000",
      house_bedrooms: 4,
      house_bathrooms: 3,
      house_mt_squared: "150 m²",
      house_extra_info_1: "Sea View",
      house_extra_info_2: "Large Garden",
      house_extra_info_3: "Renovated",
      house_extra_info_4: "Quiet Area",
      agency_image_url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      images_url_house: ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"]
    },
    {
      id: 3,
      agency_agent_name: "Emma Kelly",
      agency_name: "Galway Homes",
      house_location: "Salthill, Galway",
      house_price: "€320,000",
      house_bedrooms: 2,
      house_bathrooms: 1,
      house_mt_squared: "85 m²",
      house_extra_info_1: "Beach Access",
      house_extra_info_2: "Balcony",
      house_extra_info_3: "City Center",
      house_extra_info_4: "Investment Opportunity",
      agency_image_url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400",
      images_url_house: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"]
    }
  ];

  const PropertyCard = ({ property }: { property: any }) => (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={property.agency_image_url}
            alt="Agency"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{property.agency_agent_name}</h3>
            <p className="text-sm text-gray-500">{property.agency_name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedProperty(property)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <img
          src={property.images_url_house[0]}
          alt="Property"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.house_location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{property.house_price}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.house_bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.house_bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.house_mt_squared}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[property.house_extra_info_1, property.house_extra_info_2, property.house_extra_info_3, property.house_extra_info_4]
            .filter(info => info && info !== "Unknown")
            .map((info, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {info}
              </span>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-blue-600" />
            Properties Management
          </h1>
          <p className="text-gray-600 mt-2">Manage and view property listings from various sources</p>
        </div>
        <button className="btn-primary">
          Add New Property
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{sampleProperties.length}</div>
          <div className="text-sm text-gray-500">Total Properties</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">€{Math.round(sampleProperties.reduce((sum, p) => sum + parseInt(p.house_price.replace(/[€,]/g, '')), 0) / 1000)}K</div>
          <div className="text-sm text-gray-500">Avg. Price</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{Math.round(sampleProperties.reduce((sum, p) => sum + p.house_bedrooms, 0) / sampleProperties.length)}</div>
          <div className="text-sm text-gray-500">Avg. Bedrooms</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{Math.round(sampleProperties.reduce((sum, p) => sum + parseInt(p.house_mt_squared.replace(/[m²\s]/g, '')), 0) / sampleProperties.length)}m²</div>
          <div className="text-sm text-gray-500">Avg. Size</div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <img
                  src={selectedProperty.images_url_house[0]}
                  alt="Property"
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                    <p className="text-gray-900">{selectedProperty.agency_agent_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
                    <p className="text-gray-900">{selectedProperty.agency_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">{selectedProperty.house_location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <p className="text-green-600 font-semibold">{selectedProperty.house_price}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <p className="text-gray-900">{selectedProperty.house_bedrooms}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <p className="text-gray-900">{selectedProperty.house_bathrooms}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="flex flex-wrap gap-2">
                    {[selectedProperty.house_extra_info_1, selectedProperty.house_extra_info_2, selectedProperty.house_extra_info_3, selectedProperty.house_extra_info_4]
                      .filter(info => info && info !== "Unknown")
                      .map((info, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {info}
                        </span>
                      ))}
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

export default PropertiesDemo;