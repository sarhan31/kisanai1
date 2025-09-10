import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const CropYieldCard = ({ crop }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 80) return 'bg-success';
    if (confidence >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  const trendIcon = getTrendIcon(crop?.trend);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Wheat" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{crop?.name}</h3>
            <p className="text-sm text-muted-foreground">{crop?.variety}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-card-foreground">{crop?.predictedYield}</p>
          <p className="text-sm text-muted-foreground">tons/hectare</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">AI Confidence</span>
          <span className={`text-sm font-medium ${getConfidenceColor(crop?.confidence)}`}>
            {crop?.confidence}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getConfidenceBg(crop?.confidence)}`}
            style={{ width: `${crop?.confidence}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name={trendIcon?.name} size={16} className={trendIcon?.color} />
          <span className="text-sm text-muted-foreground">
            {crop?.trend > 0 ? '+' : ''}{crop?.trend}% vs last season
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          Harvest: {crop?.harvestDate}
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={crop?.trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
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
            <Line 
              type="monotone" 
              dataKey="yield" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropYieldCard;