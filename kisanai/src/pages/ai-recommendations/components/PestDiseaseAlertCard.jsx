import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PestDiseaseAlertCard = ({ alert, onMarkComplete, onScheduleReminder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Bug" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{alert?.title}</h3>
            <p className="text-sm text-muted-foreground">{alert?.cropType} • {alert?.affectedArea}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSeverityColor(alert?.severity)}`}>
          <Icon name={getRiskIcon(alert?.severity)} size={12} />
          <span>{alert?.severity?.charAt(0)?.toUpperCase() + alert?.severity?.slice(1)} Risk</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-error" />
              <span className="text-sm font-medium text-card-foreground">Threat Type</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{alert?.threatType}</p>
            <p className="text-xs text-muted-foreground">{alert?.scientificName}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-error" />
              <span className="text-sm font-medium text-card-foreground">Action Required</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{alert?.actionRequired}</p>
            <p className="text-xs text-muted-foreground">Immediate attention needed</p>
          </div>
        </div>

        {alert?.identificationImage && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-card-foreground mb-3">Identification Image</h4>
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={alert?.identificationImage}
                alt={`${alert?.threatType} identification`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Symptoms to Look For</h4>
              <div className="space-y-2">
                {alert?.symptoms?.map((symptom, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-muted/30 rounded-lg">
                    <Icon name="Eye" size={16} className="text-error mt-0.5" />
                    <p className="text-sm text-card-foreground">{symptom}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Treatment Recommendations</h4>
              <div className="space-y-3">
                {alert?.treatments?.map((treatment, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-card-foreground">{treatment?.method}</h5>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        treatment?.effectiveness === 'high' ? 'bg-success/20 text-success' :
                        treatment?.effectiveness === 'medium'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {treatment?.effectiveness} effectiveness
                      </span>
                    </div>
                    <p className="text-sm text-card-foreground mb-2">{treatment?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Dosage: {treatment?.dosage}</span>
                      <span>Duration: {treatment?.duration}</span>
                      <span>Cost: ₹{treatment?.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Preventive Measures</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {alert?.preventiveMeasures?.map((measure, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-success/5 rounded-lg">
                    <Icon name="Shield" size={16} className="text-success" />
                    <p className="text-sm text-card-foreground">{measure}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Weather Impact</h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-card-foreground">{alert?.weatherImpact}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={14} className="text-error" />
              <span className="text-xs text-muted-foreground">AI Confidence:</span>
              <span className="text-xs font-medium text-card-foreground">{alert?.confidence}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} className="text-error" />
              <span className="text-xs text-muted-foreground">Detected:</span>
              <span className="text-xs font-medium text-card-foreground">{alert?.detectedDate}</span>
            </div>
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
              onClick={() => onScheduleReminder(alert?.id)}
            >
              <Icon name="Bell" size={16} />
              Remind Me
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onMarkComplete(alert?.id)}
            >
              <Icon name="Check" size={16} />
              Mark Treated
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDiseaseAlertCard;