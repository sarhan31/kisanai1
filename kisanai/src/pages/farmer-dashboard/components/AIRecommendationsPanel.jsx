import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIRecommendationsPanel = ({ recommendations }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: 'Brain' },
    { id: 'irrigation', label: 'Irrigation', icon: 'Droplets' },
    { id: 'fertilizer', label: 'Fertilizer', icon: 'Beaker' },
    { id: 'pest', label: 'Pest Control', icon: 'Bug' },
    { id: 'harvest', label: 'Harvest', icon: 'Scissors' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'irrigation': 'Droplets',
      'fertilizer': 'Beaker',
      'pest': 'Bug',
      'harvest': 'Scissors',
      'planting': 'Sprout',
      'soil': 'Mountain'
    };
    return iconMap?.[category?.toLowerCase()] || 'Lightbulb';
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === selectedCategory);

  const toggleExpanded = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Smart insights for your farm</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Updated: {new Date()?.toLocaleDateString()}
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Recommendations List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredRecommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getCategoryIcon(recommendation?.category)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-card-foreground">
                      {recommendation?.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(recommendation?.priority)}`}>
                      {recommendation?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {recommendation?.description}
                  </p>
                  
                  {/* Confidence and Timing */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={14} className={getConfidenceColor(recommendation?.confidence)} />
                      <span className={`text-sm ${getConfidenceColor(recommendation?.confidence)}`}>
                        {recommendation?.confidence}% confidence
                      </span>
                    </div>
                    {recommendation?.timing && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {recommendation?.timing}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2">
                    {recommendation?.actions && recommendation?.actions?.map((action, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-lg hover:bg-primary/20 transition-smooth"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => toggleExpanded(recommendation?.id)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon 
                  name={expandedCard === recommendation?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
            </div>

            {/* Expanded Details */}
            {expandedCard === recommendation?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                {recommendation?.details && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-card-foreground">Detailed Instructions</h5>
                    <div className="space-y-2">
                      {recommendation?.details?.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <p className="text-sm text-card-foreground">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {recommendation?.expectedOutcome && (
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                      <div>
                        <h6 className="font-medium text-success text-sm">Expected Outcome</h6>
                        <p className="text-sm text-success/80 mt-1">
                          {recommendation?.expectedOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {recommendation?.resources && recommendation?.resources?.length > 0 && (
                  <div className="mt-4">
                    <h6 className="font-medium text-card-foreground text-sm mb-2">Required Resources</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {recommendation?.resources?.map((resource, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Package" size={14} />
                          <span>{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredRecommendations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium text-card-foreground mb-2">No recommendations found</h4>
          <p className="text-sm text-muted-foreground">
            Try selecting a different category or check back later for new insights.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsPanel;