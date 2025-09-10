import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationFilters = ({ 
  activeCategory, 
  onCategoryChange, 
  activeFilters, 
  onFilterChange,
  onClearFilters 
}) => {
  const categories = [
    { id: 'all', label: 'All Recommendations', icon: 'Grid3X3', count: 12 },
    { id: 'irrigation', label: 'Irrigation', icon: 'Droplets', count: 3 },
    { id: 'fertilizer', label: 'Fertilizer', icon: 'Sprout', count: 4 },
    { id: 'pest', label: 'Pest & Disease', icon: 'Bug', count: 2 },
    { id: 'rotation', label: 'Crop Rotation', icon: 'RotateCcw', count: 3 }
  ];

  const priorityFilters = [
    { id: 'critical', label: 'Critical', color: 'text-error' },
    { id: 'high', label: 'High', color: 'text-warning' },
    { id: 'medium', label: 'Medium', color: 'text-primary' },
    { id: 'low', label: 'Low', color: 'text-success' }
  ];

  const statusFilters = [
    { id: 'pending', label: 'Pending Action' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'completed', label: 'Completed' }
  ];

  const timeFilters = [
    { id: 'today', label: 'Due Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      {/* Category Tabs */}
      <div className="mb-6">
        <h3 className="font-semibold text-card-foreground mb-4">Recommendation Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`
                flex flex-col items-center p-3 rounded-lg border transition-all duration-200
                ${activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-card-foreground border-border hover:bg-muted'
                }
              `}
            >
              <Icon 
                name={category?.icon} 
                size={20} 
                className={activeCategory === category?.id ? 'text-primary-foreground' : 'text-primary'} 
              />
              <span className="text-xs font-medium mt-1">{category?.label}</span>
              <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                activeCategory === category?.id 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-card-foreground">Filters</h4>
          {(activeFilters?.priority?.length > 0 || activeFilters?.status?.length > 0 || activeFilters?.time?.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-card-foreground"
            >
              <Icon name="X" size={14} />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Priority Filter */}
          <div>
            <h5 className="text-sm font-medium text-card-foreground mb-2">Priority Level</h5>
            <div className="space-y-2">
              {priorityFilters?.map((filter) => (
                <label key={filter?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.priority?.includes(filter?.id)}
                    onChange={(e) => {
                      const newPriority = e?.target?.checked
                        ? [...activeFilters?.priority, filter?.id]
                        : activeFilters?.priority?.filter(p => p !== filter?.id);
                      onFilterChange({ ...activeFilters, priority: newPriority });
                    }}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className={`text-sm ${filter?.color}`}>{filter?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h5 className="text-sm font-medium text-card-foreground mb-2">Status</h5>
            <div className="space-y-2">
              {statusFilters?.map((filter) => (
                <label key={filter?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.status?.includes(filter?.id)}
                    onChange={(e) => {
                      const newStatus = e?.target?.checked
                        ? [...activeFilters?.status, filter?.id]
                        : activeFilters?.status?.filter(s => s !== filter?.id);
                      onFilterChange({ ...activeFilters, status: newStatus });
                    }}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-card-foreground">{filter?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div>
            <h5 className="text-sm font-medium text-card-foreground mb-2">Timeline</h5>
            <div className="space-y-2">
              {timeFilters?.map((filter) => (
                <label key={filter?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.time?.includes(filter?.id)}
                    onChange={(e) => {
                      const newTime = e?.target?.checked
                        ? [...activeFilters?.time, filter?.id]
                        : activeFilters?.time?.filter(t => t !== filter?.id);
                      onFilterChange({ ...activeFilters, time: newTime });
                    }}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-card-foreground">{filter?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(activeFilters?.priority?.length > 0 || activeFilters?.status?.length > 0 || activeFilters?.time?.length > 0) && (
        <div className="mt-4 pt-4 border-t border-border">
          <h5 className="text-sm font-medium text-card-foreground mb-2">Active Filters:</h5>
          <div className="flex flex-wrap gap-2">
            {activeFilters?.priority?.map((priority) => (
              <span
                key={`priority-${priority}`}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                <span>Priority: {priority}</span>
                <button
                  onClick={() => {
                    const newPriority = activeFilters?.priority?.filter(p => p !== priority);
                    onFilterChange({ ...activeFilters, priority: newPriority });
                  }}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
            {activeFilters?.status?.map((status) => (
              <span
                key={`status-${status}`}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
              >
                <span>Status: {status}</span>
                <button
                  onClick={() => {
                    const newStatus = activeFilters?.status?.filter(s => s !== status);
                    onFilterChange({ ...activeFilters, status: newStatus });
                  }}
                  className="hover:text-secondary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
            {activeFilters?.time?.map((time) => (
              <span
                key={`time-${time}`}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
              >
                <span>Time: {time}</span>
                <button
                  onClick={() => {
                    const newTime = activeFilters?.time?.filter(t => t !== time);
                    onFilterChange({ ...activeFilters, time: newTime });
                  }}
                  className="hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationFilters;