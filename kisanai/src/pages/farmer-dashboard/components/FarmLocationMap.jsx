import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FarmLocationMap = ({ farmLocations }) => {
  const [selectedLocation, setSelectedLocation] = useState(farmLocations?.[0]);
  const [mapView, setMapView] = useState('satellite'); // satellite, terrain, roadmap

  const getMapUrl = (location, view = 'satellite') => {
    const { lat, lng } = location?.coordinates;
    const mapType = view === 'satellite' ? 'satellite' : view === 'terrain' ? 'terrain' : 'roadmap';
    return `https://www.google.com/maps?q=${lat},${lng}&z=16&t=${mapType}&output=embed`;
  };

  const getCropIcon = (cropType) => {
    const iconMap = {
      'wheat': 'Wheat',
      'rice': 'Sprout',
      'corn': 'Corn',
      'cotton': 'Flower',
      'sugarcane': 'TreePine',
      'vegetables': 'Carrot'
    };
    return iconMap?.[cropType?.toLowerCase()] || 'Sprout';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'text-success bg-success/10';
      case 'needs attention': return 'text-warning bg-warning/10';
      case 'critical': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Farm Location Map</h3>
        <div className="flex items-center space-x-2">
          <select
            value={mapView}
            onChange={(e) => setMapView(e?.target?.value)}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="satellite">Satellite</option>
            <option value="terrain">Terrain</option>
            <option value="roadmap">Roadmap</option>
          </select>
          <button className="p-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-smooth">
            <Icon name="Maximize" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location List */}
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">Field Locations</h4>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {farmLocations?.map((location) => (
              <div
                key={location?.id}
                onClick={() => setSelectedLocation(location)}
                className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                  selectedLocation?.id === location?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getCropIcon(location?.cropType)} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-card-foreground truncate">
                      {location?.name}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {location?.cropType} • {location?.area} hectares
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(location?.status)}`}>
                        {location?.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {location?.lastVisited}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <div className="relative h-80 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={selectedLocation?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl(selectedLocation, mapView)}
              className="border-0"
            />
            
            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-modal">
              <div className="flex items-center space-x-2">
                <Icon name={getCropIcon(selectedLocation?.cropType)} size={16} className="text-primary" />
                <span className="font-medium text-card-foreground text-sm">
                  {selectedLocation?.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedLocation?.coordinates?.lat?.toFixed(6)}, {selectedLocation?.coordinates?.lng?.toFixed(6)}
              </p>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="w-8 h-8 bg-card/95 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center shadow-modal hover:bg-card transition-smooth">
                <Icon name="Plus" size={14} className="text-card-foreground" />
              </button>
              <button className="w-8 h-8 bg-card/95 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center shadow-modal hover:bg-card transition-smooth">
                <Icon name="Minus" size={14} className="text-card-foreground" />
              </button>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h5 className="font-medium text-card-foreground mb-3">Field Details</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Crop Type</p>
                <p className="font-medium text-card-foreground">{selectedLocation?.cropType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="font-medium text-card-foreground">{selectedLocation?.area} ha</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Soil Type</p>
                <p className="font-medium text-card-foreground">{selectedLocation?.soilType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Irrigation</p>
                <p className="font-medium text-card-foreground">{selectedLocation?.irrigationType}</p>
              </div>
            </div>

            {selectedLocation?.notes && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-card-foreground">{selectedLocation?.notes}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
              <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-smooth">
                <Icon name="Navigation" size={14} />
                <span>Navigate</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-muted text-card-foreground rounded-lg text-sm hover:bg-muted/80 transition-smooth">
                <Icon name="Camera" size={14} />
                <span>Add Photo</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-muted text-card-foreground rounded-lg text-sm hover:bg-muted/80 transition-smooth">
                <Icon name="FileText" size={14} />
                <span>Log Activity</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmLocationMap;