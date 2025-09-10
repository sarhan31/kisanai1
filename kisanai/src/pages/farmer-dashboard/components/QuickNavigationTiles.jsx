import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickNavigationTiles = () => {
  const navigate = useNavigate();

  const navigationTiles = [
    {
      id: 'weather-forecast',
      title: 'Weather Forecast',
      description: '7-day detailed forecast',
      icon: 'CloudSun',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      route: '/weather-forecast',
      stats: '28°C Today'
    },
    {
      id: 'soil-analysis',
      title: 'Soil Analysis',
      description: 'Comprehensive soil health',
      icon: 'Mountain',
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      route: '/soil-analysis',
      stats: 'pH 6.8'
    },
    {
      id: 'ai-recommendations',
      title: 'AI Recommendations',
      description: 'Smart farming insights',
      icon: 'Brain',
      color: 'bg-primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      route: '/ai-recommendations',
      stats: '12 New Tips'
    },
    {
      id: 'data-input',
      title: 'Data Entry',
      description: 'Record farm activities',
      icon: 'FileText',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      route: '/data-input-forms',
      stats: 'Quick Entry'
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      description: 'Farm performance insights',
      icon: 'BarChart3',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      route: '/performance-analytics',
      stats: '↑ 15% Yield'
    },
    {
      id: 'market-prices',
      title: 'Market Prices',
      description: 'Current crop prices',
      icon: 'TrendingUp',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      route: '/market-prices',
      stats: '₹2,400/quintal'
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Quick Access</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {navigationTiles?.map((tile) => (
          <div
            key={tile?.id}
            onClick={() => handleNavigation(tile?.route)}
            className="group relative p-4 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-card hover:scale-[1.02]"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-full h-full bg-gradient-to-br from-transparent to-primary/20 rounded-lg" />
            </div>

            <div className="relative">
              {/* Icon and Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 ${tile?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={tile?.icon} size={24} className={tile?.textColor} />
                </div>
                {tile?.stats && (
                  <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-full">
                    {tile?.stats}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                  {tile?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {tile?.description}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-colors" />
          </div>
        ))}
      </div>
      {/* Additional Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-card-foreground">Quick Actions</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <button
            onClick={() => navigate('/emergency-contacts')}
            className="flex items-center space-x-2 p-3 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-smooth"
          >
            <Icon name="Phone" size={16} />
            <span className="text-sm font-medium">Emergency</span>
          </button>
          <button
            onClick={() => navigate('/weather-alerts')}
            className="flex items-center space-x-2 p-3 bg-warning/10 text-warning rounded-lg hover:bg-warning/20 transition-smooth"
          >
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Alerts</span>
          </button>
          <button
            onClick={() => navigate('/crop-calendar')}
            className="flex items-center space-x-2 p-3 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-smooth"
          >
            <Icon name="Calendar" size={16} />
            <span className="text-sm font-medium">Calendar</span>
          </button>
          <button
            onClick={() => navigate('/help-support')}
            className="flex items-center space-x-2 p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-smooth"
          >
            <Icon name="HelpCircle" size={16} />
            <span className="text-sm font-medium">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickNavigationTiles;