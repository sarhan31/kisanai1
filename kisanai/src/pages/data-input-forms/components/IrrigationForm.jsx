import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const IrrigationForm = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const irrigationMethods = [
    { value: 'flood', label: 'Flood Irrigation', description: 'Traditional flooding method' },
    { value: 'sprinkler', label: 'Sprinkler System', description: 'Overhead water distribution' },
    { value: 'drip', label: 'Drip Irrigation', description: 'Precise water delivery' },
    { value: 'furrow', label: 'Furrow Irrigation', description: 'Channel-based watering' },
    { value: 'basin', label: 'Basin Irrigation', description: 'Enclosed area flooding' }
  ];

  const waterSources = [
    { value: 'borewell', label: 'Borewell', description: 'Underground water source' },
    { value: 'canal', label: 'Canal Water', description: 'Government canal system' },
    { value: 'river', label: 'River/Stream', description: 'Natural water body' },
    { value: 'pond', label: 'Farm Pond', description: 'Rainwater harvesting' },
    { value: 'tubewell', label: 'Tube Well', description: 'Deep water extraction' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleIrrigationScheduleChange = (index, field, value) => {
    const updatedSchedule = [...(formData?.irrigationSchedule || [])];
    if (!updatedSchedule?.[index]) {
      updatedSchedule[index] = {};
    }
    updatedSchedule[index][field] = value;
    onUpdate({ irrigationSchedule: updatedSchedule });
  };

  const addIrrigationEntry = () => {
    const newSchedule = [...(formData?.irrigationSchedule || []), {
      date: '',
      duration: '',
      waterAmount: '',
      notes: ''
    }];
    onUpdate({ irrigationSchedule: newSchedule });
  };

  const removeIrrigationEntry = (index) => {
    const updatedSchedule = formData?.irrigationSchedule?.filter((_, i) => i !== index);
    onUpdate({ irrigationSchedule: updatedSchedule });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.irrigationMethod) newErrors.irrigationMethod = 'Please select irrigation method';
    if (!formData?.waterSource) newErrors.waterSource = 'Please select water source';
    if (!formData?.irrigationFrequency || formData?.irrigationFrequency <= 0) {
      newErrors.irrigationFrequency = 'Please enter valid irrigation frequency';
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
          <Icon name="Droplets" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Irrigation Details</h2>
          <p className="text-sm text-muted-foreground">Water management and irrigation schedule</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Irrigation Method"
            description="Primary irrigation system used"
            options={irrigationMethods}
            value={formData?.irrigationMethod}
            onChange={(value) => handleInputChange('irrigationMethod', value)}
            error={errors?.irrigationMethod}
            required
          />

          <Select
            label="Water Source"
            description="Main source of irrigation water"
            options={waterSources}
            value={formData?.waterSource}
            onChange={(value) => handleInputChange('waterSource', value)}
            error={errors?.waterSource}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Irrigation Frequency (days)"
            type="number"
            description="How often do you irrigate?"
            value={formData?.irrigationFrequency}
            onChange={(e) => handleInputChange('irrigationFrequency', parseInt(e?.target?.value))}
            error={errors?.irrigationFrequency}
            min="1"
            placeholder="e.g., 7"
            required
          />

          <Input
            label="Water Amount (liters/acre)"
            type="number"
            description="Average water per irrigation"
            value={formData?.waterAmount}
            onChange={(e) => handleInputChange('waterAmount', parseInt(e?.target?.value))}
            min="0"
            placeholder="e.g., 1000"
          />

          <Input
            label="Irrigation Duration (hours)"
            type="number"
            description="Duration per irrigation cycle"
            value={formData?.irrigationDuration}
            onChange={(e) => handleInputChange('irrigationDuration', parseFloat(e?.target?.value))}
            min="0"
            step="0.5"
            placeholder="e.g., 2.5"
          />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Automated Irrigation System"
            description="Do you use timer-based or sensor-based automation?"
            checked={formData?.isAutomated || false}
            onChange={(e) => handleInputChange('isAutomated', e?.target?.checked)}
          />

          <Checkbox
            label="Soil Moisture Monitoring"
            description="Do you monitor soil moisture levels?"
            checked={formData?.hasMoistureMonitoring || false}
            onChange={(e) => handleInputChange('hasMoistureMonitoring', e?.target?.checked)}
          />
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-card-foreground">Irrigation Schedule</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addIrrigationEntry}
              iconName="Plus"
              iconPosition="left"
            >
              Add Entry
            </Button>
          </div>

          {formData?.irrigationSchedule && formData?.irrigationSchedule?.length > 0 ? (
            <div className="space-y-4">
              {formData?.irrigationSchedule?.map((entry, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-card-foreground">Entry {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIrrigationEntry(index)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Date"
                      type="date"
                      value={entry?.date}
                      onChange={(e) => handleIrrigationScheduleChange(index, 'date', e?.target?.value)}
                    />
                    <Input
                      label="Duration (hours)"
                      type="number"
                      value={entry?.duration}
                      onChange={(e) => handleIrrigationScheduleChange(index, 'duration', e?.target?.value)}
                      step="0.5"
                      placeholder="2.5"
                    />
                    <Input
                      label="Water Amount (liters)"
                      type="number"
                      value={entry?.waterAmount}
                      onChange={(e) => handleIrrigationScheduleChange(index, 'waterAmount', e?.target?.value)}
                      placeholder="1000"
                    />
                  </div>
                  <Input
                    label="Notes"
                    type="text"
                    value={entry?.notes}
                    onChange={(e) => handleIrrigationScheduleChange(index, 'notes', e?.target?.value)}
                    placeholder="Any observations or special conditions"
                    className="mt-4"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Droplets" size={48} className="mx-auto mb-3 opacity-50" />
              <p>No irrigation entries added yet</p>
              <p className="text-sm">Click "Add Entry" to record irrigation data</p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
            Previous
          </Button>
          <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
            Next: Fertilizer Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IrrigationForm;