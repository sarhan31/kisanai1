import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CropRotationCard = ({ recommendation, onMarkComplete, onScheduleReminder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeasonColor = (season) => {
    switch (season) {
      case 'Kharif': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rabi': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Zaid': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getBenefitIcon = (type) => {
    switch (type) {
      case 'yield': return 'TrendingUp';
      case 'soil': return 'Layers';
      case 'pest': return 'Shield';
      case 'water': return 'Droplets';
      default: return 'CheckCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="RotateCcw" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{recommendation?.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation?.currentCrop} → {recommendation?.nextCrop}</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
          {recommendation?.rotationCycle} Year Cycle
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-card-foreground">Next Planting</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.nextPlantingDate}</p>
            <p className="text-xs text-muted-foreground">{recommendation?.timeToPlant}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-card-foreground">Expected Yield Boost</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">+{recommendation?.yieldIncrease}%</p>
            <p className="text-xs text-muted-foreground">Compared to monocropping</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-card-foreground mb-3">Seasonal Rotation Plan</h4>
          <div className="space-y-3">
            {recommendation?.rotationPlan?.map((season, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getSeasonColor(season?.season)}`}>
                    {season?.season}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{season?.crop}</p>
                    <p className="text-xs text-muted-foreground">{season?.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{season?.expectedYield}</p>
                  <p className="text-xs text-muted-foreground">per hectare</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Companion Crops</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {recommendation?.companionCrops?.map((crop, index) => (
                  <div key={index} className="p-3 bg-success/5 border border-success/20 rounded-lg text-center">
                    <p className="font-medium text-card-foreground text-sm">{crop?.name}</p>
                    <p className="text-xs text-muted-foreground">{crop?.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Soil Health Benefits</h4>
              <div className="space-y-2">
                {recommendation?.soilBenefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
                    <Icon name={getBenefitIcon(benefit?.type)} size={16} className="text-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{benefit?.title}</p>
                      <p className="text-xs text-muted-foreground">{benefit?.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-secondary">+{benefit?.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Implementation Timeline</h4>
              <div className="space-y-3">
                {recommendation?.timeline?.map((phase, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-medium text-secondary-foreground">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-card-foreground">{phase?.phase}</h5>
                        <span className="text-xs text-muted-foreground">{phase?.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{phase?.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Start: {phase?.startDate}</span>
                        <span>Cost: ₹{phase?.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Economic Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Investment Required</p>
                  <p className="text-lg font-semibold text-card-foreground">₹{recommendation?.totalInvestment}</p>
                </div>
                <div className="bg-success/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Expected Returns</p>
                  <p className="text-lg font-semibold text-success">₹{recommendation?.expectedReturns}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">ROI</p>
                  <p className="text-lg font-semibold text-primary">{recommendation?.roi}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={14} className="text-secondary" />
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
              Plan Adopted
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRotationCard;