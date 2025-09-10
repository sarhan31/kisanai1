import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const SoilHealthMonitoring = ({ soilData }) => {
  const [selectedField, setSelectedField] = useState(soilData?.fields?.[0]);

  const getHealthColor = (value, type) => {
    const ranges = {
      ph: { good: [6.0, 7.5], warning: [5.5, 8.0] },
      moisture: { good: [40, 70], warning: [30, 80] },
      nitrogen: { good: [20, 40], warning: [15, 50] },
      phosphorus: { good: [15, 30], warning: [10, 40] },
      potassium: { good: [150, 300], warning: [100, 400] }
    };

    const range = ranges?.[type];
    if (!range) return 'text-muted-foreground';

    if (value >= range?.good?.[0] && value <= range?.good?.[1]) return 'text-success';
    if (value >= range?.warning?.[0] && value <= range?.warning?.[1]) return 'text-warning';
    return 'text-error';
  };

  const getHealthStatus = (value, type) => {
    const ranges = {
      ph: { good: [6.0, 7.5], warning: [5.5, 8.0] },
      moisture: { good: [40, 70], warning: [30, 80] },
      nitrogen: { good: [20, 40], warning: [15, 50] },
      phosphorus: { good: [15, 30], warning: [10, 40] },
      potassium: { good: [150, 300], warning: [100, 400] }
    };

    const range = ranges?.[type];
    if (!range) return 'Unknown';

    if (value >= range?.good?.[0] && value <= range?.good?.[1]) return 'Optimal';
    if (value >= range?.warning?.[0] && value <= range?.warning?.[1]) return 'Moderate';
    return 'Needs Attention';
  };

  const nutrientColors = ['#2D5A27', '#4A7C59', '#8B4513'];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Soil Health Monitoring</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedField?.id}
            onChange={(e) => setSelectedField(soilData?.fields?.find(f => f?.id === e?.target?.value))}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {soilData?.fields?.map((field) => (
              <option key={field?.id} value={field?.id}>
                {field?.name}
              </option>
            ))}
          </select>
          <div className="text-sm text-muted-foreground">
            Last tested: {selectedField?.lastTested}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* pH and Moisture Levels */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Basic Parameters</h4>
          
          {/* pH Level */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="TestTube" size={16} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">pH Level</span>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(selectedField?.ph, 'ph')}`}>
                {selectedField?.ph}
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2 mb-2">
              <div
                className="h-2 bg-primary rounded-full"
                style={{ width: `${(selectedField?.ph / 14) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Acidic (0)</span>
              <span>Neutral (7)</span>
              <span>Alkaline (14)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Status: {getHealthStatus(selectedField?.ph, 'ph')}
            </p>
          </div>

          {/* Moisture Level */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="Droplets" size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-card-foreground">Moisture</span>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(selectedField?.moisture, 'moisture')}`}>
                {selectedField?.moisture}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2 mb-2">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${selectedField?.moisture}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Status: {getHealthStatus(selectedField?.moisture, 'moisture')}
            </p>
          </div>
        </div>

        {/* Nutrient Distribution */}
        <div>
          <h4 className="font-medium text-card-foreground mb-4">Nutrient Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedField?.nutrients}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {selectedField?.nutrients?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={nutrientColors?.[index % nutrientColors?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {selectedField?.nutrients?.map((nutrient, index) => (
              <div key={nutrient?.name} className="text-center">
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: nutrientColors?.[index] }}
                />
                <p className="text-xs font-medium text-card-foreground">{nutrient?.name}</p>
                <p className="text-xs text-muted-foreground">{nutrient?.value} ppm</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Detailed Nutrient Analysis */}
      <div className="mb-6">
        <h4 className="font-medium text-card-foreground mb-4">Nutrient Analysis</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={selectedField?.nutrients}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recommendations */}
      {selectedField?.recommendations && selectedField?.recommendations?.length > 0 && (
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-card-foreground mb-4">Soil Health Recommendations</h4>
          <div className="space-y-3">
            {selectedField?.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {recommendation?.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recommendation?.description}
                  </p>
                  {recommendation?.priority && (
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                      recommendation?.priority === 'high' ?'bg-error/10 text-error' 
                        : recommendation?.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                    }`}>
                      {recommendation?.priority} priority
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilHealthMonitoring;