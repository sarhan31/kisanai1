import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IrrigationScheduleCard = ({ recommendation, onMarkComplete, onScheduleReminder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Droplets" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{recommendation?.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation?.cropType}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(recommendation?.urgency)}`}>
          {recommendation?.urgency?.charAt(0)?.toUpperCase() + recommendation?.urgency?.slice(1)} Priority
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">Next Irrigation</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.nextIrrigation}</p>
            <p className="text-xs text-muted-foreground">{recommendation?.timeRemaining}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Gauge" size={16} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">Water Amount</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.waterAmount}</p>
            <p className="text-xs text-muted-foreground">Per hectare</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Thermometer" size={16} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">Soil Moisture</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.soilMoisture}%</p>
            <p className="text-xs text-muted-foreground">Current level</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Detailed Schedule</h4>
              <div className="space-y-2">
                {recommendation?.schedule?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{item?.date}</p>
                        <p className="text-xs text-muted-foreground">{item?.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">{item?.amount}</p>
                      <p className="text-xs text-muted-foreground">{item?.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Weather Considerations</h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-card-foreground">{recommendation?.weatherNote}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">AI Confidence:</span>
            </div>
            <span className="text-xs font-medium text-card-foreground">{recommendation?.confidence}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              {isExpanded ? "Less" : "More"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onScheduleReminder(recommendation?.id)}
            >
              <Icon name="Bell" size={16} />
              Remind Me
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onMarkComplete(recommendation?.id)}
            >
              <Icon name="Check" size={16} />
              Mark Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationScheduleCard;