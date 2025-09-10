import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FertilizerRecommendationCard = ({ recommendation, onMarkComplete, onScheduleReminder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getNutrientColor = (nutrient) => {
    const colors = {
      'Nitrogen': 'bg-blue-100 text-blue-800 border-blue-200',
      'Phosphorus': 'bg-orange-100 text-orange-800 border-orange-200',
      'Potassium': 'bg-green-100 text-green-800 border-green-200',
      'Calcium': 'bg-purple-100 text-purple-800 border-purple-200',
      'Magnesium': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors?.[nutrient] || 'bg-muted text-muted-foreground border-border';
  };

  const getApplicationWindow = (status) => {
    switch (status) {
      case 'optimal': return 'text-success bg-success/10 border-success/20';
      case 'good': return 'text-primary bg-primary/10 border-primary/20';
      case 'fair': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Sprout" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{recommendation?.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation?.cropType} • {recommendation?.growthStage}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getApplicationWindow(recommendation?.applicationWindow)}`}>
          {recommendation?.applicationWindow?.charAt(0)?.toUpperCase() + recommendation?.applicationWindow?.slice(1)} Window
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-accent" />
              <span className="text-sm font-medium text-card-foreground">Application Date</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.applicationDate}</p>
            <p className="text-xs text-muted-foreground">{recommendation?.daysFromNow}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Package" size={16} className="text-accent" />
              <span className="text-sm font-medium text-card-foreground">Total Dosage</span>
            </div>
            <p className="text-lg font-semibold text-card-foreground">{recommendation?.totalDosage}</p>
            <p className="text-xs text-muted-foreground">Per hectare</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-card-foreground mb-3">Nutrient Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recommendation?.nutrients?.map((nutrient, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getNutrientColor(nutrient?.name)}`}>
                <div className="text-center">
                  <p className="text-xs font-medium mb-1">{nutrient?.name}</p>
                  <p className="text-lg font-bold">{nutrient?.amount}</p>
                  <p className="text-xs opacity-80">{nutrient?.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Application Instructions</h4>
              <div className="bg-muted/30 rounded-lg p-4">
                <ul className="space-y-2">
                  {recommendation?.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-medium text-accent-foreground">{index + 1}</span>
                      </div>
                      <p className="text-sm text-card-foreground">{instruction}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Expected Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendation?.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-success/5 rounded-lg">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <p className="text-sm text-card-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-card-foreground mb-2">Cost Estimation</h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground">Estimated Cost:</span>
                  <span className="text-lg font-semibold text-card-foreground">₹{recommendation?.estimatedCost}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Per hectare application</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={14} className="text-accent" />
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

export default FertilizerRecommendationCard;