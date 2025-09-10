import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CropDetailsForm = ({ formData, onUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const cropOptions = [
    { value: 'rice', label: 'Rice (धान)', description: 'Paddy cultivation' },
    { value: 'wheat', label: 'Wheat (गेहूं)', description: 'Winter crop' },
    { value: 'cotton', label: 'Cotton (कपास)', description: 'Cash crop' },
    { value: 'sugarcane', label: 'Sugarcane (गन्ना)', description: 'Long duration crop' },
    { value: 'maize', label: 'Maize (मक्का)', description: 'Kharif crop' },
    { value: 'soybean', label: 'Soybean (सोयाबीन)', description: 'Oilseed crop' },
    { value: 'groundnut', label: 'Groundnut (मूंगफली)', description: 'Legume crop' },
    { value: 'tomato', label: 'Tomato (टमाटर)', description: 'Vegetable crop' },
    { value: 'onion', label: 'Onion (प्याज)', description: 'Bulb crop' },
    { value: 'potato', label: 'Potato (आलू)', description: 'Tuber crop' }
  ];

  const varietyOptions = {
    rice: [
      { value: 'basmati', label: 'Basmati', description: 'Premium aromatic rice' },
      { value: 'ir64', label: 'IR-64', description: 'High yielding variety' },
      { value: 'pusa44', label: 'Pusa-44', description: 'Early maturing' }
    ],
    wheat: [
      { value: 'hd2967', label: 'HD-2967', description: 'High protein content' },
      { value: 'pusa3085', label: 'Pusa-3085', description: 'Disease resistant' },
      { value: 'raj4037', label: 'Raj-4037', description: 'Drought tolerant' }
    ],
    cotton: [
      { value: 'bt', label: 'Bt Cotton', description: 'Genetically modified' },
      { value: 'desi', label: 'Desi Cotton', description: 'Traditional variety' }
    ]
  };

  const seasonOptions = [
    { value: 'kharif', label: 'Kharif (खरीफ)', description: 'Monsoon season (Jun-Oct)' },
    { value: 'rabi', label: 'Rabi (रबी)', description: 'Winter season (Nov-Apr)' },
    { value: 'zaid', label: 'Zaid (जायद)', description: 'Summer season (Apr-Jun)' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.cropType) newErrors.cropType = 'Please select a crop type';
    if (!formData?.variety) newErrors.variety = 'Please select a variety';
    if (!formData?.sowingDate) newErrors.sowingDate = 'Please enter sowing date';
    if (!formData?.season) newErrors.season = 'Please select growing season';
    if (!formData?.fieldArea || formData?.fieldArea <= 0) newErrors.fieldArea = 'Please enter valid field area';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const currentVarieties = formData?.cropType ? varietyOptions?.[formData?.cropType] || [] : [];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Sprout" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Crop Details</h2>
          <p className="text-sm text-muted-foreground">Basic information about your crop</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Crop Type"
            description="Select the main crop you are growing"
            options={cropOptions}
            value={formData?.cropType}
            onChange={(value) => handleInputChange('cropType', value)}
            error={errors?.cropType}
            searchable
            required
          />

          <Select
            label="Variety"
            description="Choose the specific variety"
            options={currentVarieties}
            value={formData?.variety}
            onChange={(value) => handleInputChange('variety', value)}
            error={errors?.variety}
            disabled={!formData?.cropType}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Sowing Date"
            type="date"
            description="When did you sow the seeds?"
            value={formData?.sowingDate}
            onChange={(e) => handleInputChange('sowingDate', e?.target?.value)}
            error={errors?.sowingDate}
            max={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />

          <Select
            label="Growing Season"
            description="Select the agricultural season"
            options={seasonOptions}
            value={formData?.season}
            onChange={(value) => handleInputChange('season', value)}
            error={errors?.season}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Field Area (Acres)"
            type="number"
            description="Total cultivated area"
            value={formData?.fieldArea}
            onChange={(e) => handleInputChange('fieldArea', parseFloat(e?.target?.value))}
            error={errors?.fieldArea}
            min="0.1"
            step="0.1"
            placeholder="e.g., 2.5"
            required
          />

          <Input
            label="Expected Harvest Date"
            type="date"
            description="Estimated harvest date"
            value={formData?.expectedHarvest}
            onChange={(e) => handleInputChange('expectedHarvest', e?.target?.value)}
            min={formData?.sowingDate}
          />
        </div>

        <Input
          label="Additional Notes"
          type="text"
          description="Any special conditions or observations"
          value={formData?.cropNotes}
          onChange={(e) => handleInputChange('cropNotes', e?.target?.value)}
          placeholder="e.g., Organic farming, intercropping with legumes"
        />

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
            Next: Irrigation Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsForm;