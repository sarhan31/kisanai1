import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdditionalDataForm = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const soilPreparationMethods = [
    { value: 'plowing', label: 'Plowing', description: 'Traditional tillage' },
    { value: 'harrowing', label: 'Harrowing', description: 'Soil breaking and leveling' },
    { value: 'rotavator', label: 'Rotavator', description: 'Mechanical soil preparation' },
    { value: 'zero_tillage', label: 'Zero Tillage', description: 'No-till farming' },
    { value: 'minimum_tillage', label: 'Minimum Tillage', description: 'Reduced soil disturbance' }
  ];

  const pestManagementOptions = [
    { value: 'ipm', label: 'Integrated Pest Management', description: 'Holistic approach' },
    { value: 'organic', label: 'Organic Methods', description: 'Natural pest control' },
    { value: 'chemical', label: 'Chemical Pesticides', description: 'Synthetic pest control' },
    { value: 'biological', label: 'Biological Control', description: 'Natural predators' },
    { value: 'cultural', label: 'Cultural Practices', description: 'Crop rotation, timing' }
  ];

  const weatherConditions = [
    { value: 'normal', label: 'Normal', description: 'Typical weather patterns' },
    { value: 'drought', label: 'Drought', description: 'Below normal rainfall' },
    { value: 'excess_rain', label: 'Excess Rainfall', description: 'Above normal rainfall' },
    { value: 'hailstorm', label: 'Hailstorm', description: 'Hail damage occurred' },
    { value: 'frost', label: 'Frost', description: 'Cold weather damage' },
    { value: 'cyclone', label: 'Cyclone/Storm', description: 'Severe weather events' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field, value, checked) => {
    const currentArray = formData?.[field] || [];
    if (checked) {
      onUpdate({ [field]: [...currentArray, value] });
    } else {
      onUpdate({ [field]: currentArray?.filter(item => item !== value) });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation - most fields are optional for additional data
    if (formData?.seedRate && formData?.seedRate <= 0) {
      newErrors.seedRate = 'Please enter valid seed rate';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Additional Farm Data</h2>
          <p className="text-sm text-muted-foreground">Optional details for better AI recommendations</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Soil Preparation Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Shovel" size={18} />
            <span>Soil Preparation</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Primary Preparation Method"
              description="Main soil preparation technique"
              options={soilPreparationMethods}
              value={formData?.soilPreparation}
              onChange={(value) => handleInputChange('soilPreparation', value)}
            />

            <Input
              label="Preparation Cost (₹/acre)"
              type="number"
              description="Total cost for soil preparation"
              value={formData?.preparationCost}
              onChange={(e) => handleInputChange('preparationCost', parseFloat(e?.target?.value))}
              min="0"
              placeholder="e.g., 2000"
            />
          </div>

          <Input
            label="Preparation Date"
            type="date"
            description="When was soil preparation completed?"
            value={formData?.preparationDate}
            onChange={(e) => handleInputChange('preparationDate', e?.target?.value)}
          />
        </div>

        {/* Seed Details Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Sprout" size={18} />
            <span>Seed Details</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Seed Rate (kg/acre)"
              type="number"
              description="Quantity of seeds used"
              value={formData?.seedRate}
              onChange={(e) => handleInputChange('seedRate', parseFloat(e?.target?.value))}
              error={errors?.seedRate}
              min="0"
              step="0.1"
              placeholder="e.g., 25"
            />

            <Input
              label="Seed Cost (₹/kg)"
              type="number"
              description="Cost per kilogram of seeds"
              value={formData?.seedCost}
              onChange={(e) => handleInputChange('seedCost', parseFloat(e?.target?.value))}
              min="0"
              placeholder="e.g., 80"
            />

            <Input
              label="Germination Rate (%)"
              type="number"
              description="Observed germination percentage"
              value={formData?.germinationRate}
              onChange={(e) => handleInputChange('germinationRate', parseInt(e?.target?.value))}
              min="0"
              max="100"
              placeholder="e.g., 85"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-card-foreground">
              Seed Treatment Applied
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Fungicide Treatment"
                checked={formData?.seedTreatments?.includes('fungicide') || false}
                onChange={(e) => handleArrayChange('seedTreatments', 'fungicide', e?.target?.checked)}
              />
              <Checkbox
                label="Insecticide Treatment"
                checked={formData?.seedTreatments?.includes('insecticide') || false}
                onChange={(e) => handleArrayChange('seedTreatments', 'insecticide', e?.target?.checked)}
              />
              <Checkbox
                label="Bio-fertilizer Coating"
                checked={formData?.seedTreatments?.includes('biofertilizer') || false}
                onChange={(e) => handleArrayChange('seedTreatments', 'biofertilizer', e?.target?.checked)}
              />
              <Checkbox
                label="Growth Promoter"
                checked={formData?.seedTreatments?.includes('growth_promoter') || false}
                onChange={(e) => handleArrayChange('seedTreatments', 'growth_promoter', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Pest Management Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Bug" size={18} />
            <span>Pest & Disease Management</span>
          </h3>
          
          <Select
            label="Primary Pest Management Strategy"
            description="Main approach to pest control"
            options={pestManagementOptions}
            value={formData?.pestManagement}
            onChange={(value) => handleInputChange('pestManagement', value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Pesticide Applications"
              type="number"
              description="Number of pesticide sprays"
              value={formData?.pesticideApplications}
              onChange={(e) => handleInputChange('pesticideApplications', parseInt(e?.target?.value))}
              min="0"
              placeholder="e.g., 3"
            />

            <Input
              label="Pest Control Cost (₹)"
              type="number"
              description="Total cost for pest management"
              value={formData?.pestControlCost}
              onChange={(e) => handleInputChange('pestControlCost', parseFloat(e?.target?.value))}
              min="0"
              placeholder="e.g., 1500"
            />
          </div>
        </div>

        {/* Weather Observations Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Cloud" size={18} />
            <span>Weather Observations</span>
          </h3>
          
          <Select
            label="Predominant Weather Condition"
            description="Overall weather pattern during crop cycle"
            options={weatherConditions}
            value={formData?.weatherCondition}
            onChange={(value) => handleInputChange('weatherCondition', value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Total Rainfall (mm)"
              type="number"
              description="Cumulative rainfall received"
              value={formData?.totalRainfall}
              onChange={(e) => handleInputChange('totalRainfall', parseFloat(e?.target?.value))}
              min="0"
              placeholder="e.g., 450"
            />

            <Input
              label="Extreme Weather Days"
              type="number"
              description="Days with adverse weather"
              value={formData?.extremeWeatherDays}
              onChange={(e) => handleInputChange('extremeWeatherDays', parseInt(e?.target?.value))}
              min="0"
              placeholder="e.g., 5"
            />
          </div>
        </div>

        {/* General Notes Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="FileText" size={18} />
            <span>Additional Notes</span>
          </h3>
          
          <Input
            label="Farming Challenges"
            type="text"
            description="Major challenges faced during this crop cycle"
            value={formData?.challenges}
            onChange={(e) => handleInputChange('challenges', e?.target?.value)}
            placeholder="e.g., Water shortage, pest attack, market price fluctuation"
          />

          <Input
            label="Success Factors"
            type="text"
            description="What worked well this season?"
            value={formData?.successFactors}
            onChange={(e) => handleInputChange('successFactors', e?.target?.value)}
            placeholder="e.g., Good seed quality, timely irrigation, effective pest control"
          />

          <Input
            label="Future Plans"
            type="text"
            description="Plans for next crop cycle"
            value={formData?.futurePlans}
            onChange={(e) => handleInputChange('futurePlans', e?.target?.value)}
            placeholder="e.g., Try new variety, install drip irrigation, organic farming"
          />
        </div>

        <div className="flex justify-between pt-6 border-t border-border">
          <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
            Previous
          </Button>
          <Button onClick={handleNext} iconName="Check" iconPosition="right">
            Review & Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDataForm;