import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertNotifications = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filter, setFilter] = useState('all');

  const alertTypes = [
    { id: 'all', label: 'All Alerts', count: alerts?.length },
    { id: 'weather', label: 'Weather', count: alerts?.filter(a => a?.type === 'weather')?.length },
    { id: 'pest', label: 'Pest', count: alerts?.filter(a => a?.type === 'pest')?.length },
    { id: 'system', label: 'System', count: alerts?.filter(a => a?.type === 'system')?.length }
  ];

  const getSeverityConfig = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          color: 'text-error',
          bg: 'bg-error/10',
          border: 'border-error/20',
          icon: 'AlertTriangle'
        };
      case 'high':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'AlertCircle'
        };
      case 'medium':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'Info'
        };
      case 'low':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'CheckCircle'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'Bell'
        };
    }
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'weather': 'Cloud',
      'pest': 'Bug',
      'system': 'Settings',
      'irrigation': 'Droplets',
      'soil': 'Mountain',
      'crop': 'Sprout'
    };
    return iconMap?.[type?.toLowerCase()] || 'Bell';
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.type === filter);

  const toggleExpanded = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Alert Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {filteredAlerts?.length} active alerts
            </p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          Mark All Read
        </button>
      </div>
      {/* Alert Type Filter */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {alertTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => setFilter(type?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
              filter === type?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{type?.label}</span>
            {type?.count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                filter === type?.id 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-background text-muted-foreground'
              }`}>
                {type?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Alerts List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredAlerts?.map((alert) => {
          const severityConfig = getSeverityConfig(alert?.severity);
          const isExpanded = expandedAlert === alert?.id;
          
          return (
            <div
              key={alert?.id}
              className={`border rounded-lg p-4 transition-smooth ${severityConfig?.border} ${
                isExpanded ? severityConfig?.bg : 'hover:' + severityConfig?.bg
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 ${severityConfig?.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={getTypeIcon(alert?.type)} size={20} className={severityConfig?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-card-foreground">
                        {alert?.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full border ${severityConfig?.border} ${severityConfig?.bg} ${severityConfig?.color}`}>
                        {alert?.severity}
                      </span>
                      {!alert?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert?.message}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                      {alert?.location && (
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{alert?.location}</span>
                        </span>
                      )}
                      {alert?.validUntil && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Valid until {alert?.validUntil}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert?.actions && alert?.actions?.length > 0 && (
                    <button
                      onClick={() => toggleExpanded(alert?.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-smooth"
                    >
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                    </button>
                  )}
                  <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              {/* Expanded Actions */}
              {isExpanded && alert?.actions && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="font-medium text-card-foreground mb-3">Recommended Actions</h5>
                  <div className="space-y-2">
                    {alert?.actions?.map((action, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-lg transition-smooth"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="ArrowRight" size={14} className="text-primary" />
                          <span className="text-sm text-card-foreground">{action}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Additional Details */}
              {isExpanded && alert?.details && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="font-medium text-card-foreground mb-2">Details</h5>
                  <p className="text-sm text-muted-foreground">{alert?.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filteredAlerts?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h4 className="font-medium text-card-foreground mb-2">No alerts found</h4>
          <p className="text-sm text-muted-foreground">
            {filter === 'all' ?'All clear! No active alerts at the moment.' 
              : `No ${filter} alerts currently active.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertNotifications;