import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const FertilizerForm = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const fertilizerTypes = [
    { value: 'urea', label: 'Urea (46-0-0)', description: 'High nitrogen content' },
    { value: 'dap', label: 'DAP (18-46-0)', description: 'Diammonium phosphate' },
    { value: 'mop', label: 'MOP (0-0-60)', description: 'Muriate of potash' },
    { value: 'npk', label: 'NPK Complex', description: 'Balanced fertilizer' },
    { value: 'organic', label: 'Organic Manure', description: 'Natural fertilizer' },
    { value: 'vermicompost', label: 'Vermicompost', description: 'Worm compost' },
    { value: 'biofertilizer', label: 'Bio-fertilizer', description: 'Microbial fertilizer' }
  ];

  const applicationMethods = [
    { value: 'broadcast', label: 'Broadcasting', description: 'Surface spreading' },
    { value: 'drilling', label: 'Drilling', description: 'Placement in rows' },
    { value: 'foliar', label: 'Foliar Spray', description: 'Leaf application' },
    { value: 'fertigation', label: 'Fertigation', description: 'Through irrigation' },
    { value: 'sidedressing', label: 'Side Dressing', description: 'Beside plant rows' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFertilizerApplicationChange = (index, field, value) => {
    const updatedApplications = [...(formData?.fertilizerApplications || [])];
    if (!updatedApplications?.[index]) {
      updatedApplications[index] = {};
    }
    updatedApplications[index][field] = value;
    onUpdate({ fertilizerApplications: updatedApplications });
  };

  const addFertilizerApplication = () => {
    const newApplication = [...(formData?.fertilizerApplications || []), {
      date: '',
      type: '',
      quantity: '',
      method: '',
      cost: '',
      notes: '',
      photos: []
    }];
    onUpdate({ fertilizerApplications: newApplication });
  };

  const removeFertilizerApplication = (index) => {
    const updatedApplications = formData?.fertilizerApplications?.filter((_, i) => i !== index);
    onUpdate({ fertilizerApplications: updatedApplications });
  };

  const handlePhotoUpload = (index, files) => {
    const updatedApplications = [...formData?.fertilizerApplications];
    const photoUrls = Array.from(files)?.map(file => URL.createObjectURL(file));
    updatedApplications[index].photos = [...(updatedApplications?.[index]?.photos || []), ...photoUrls];
    onUpdate({ fertilizerApplications: updatedApplications });
  };

  const removePhoto = (applicationIndex, photoIndex) => {
    const updatedApplications = [...formData?.fertilizerApplications];
    updatedApplications[applicationIndex].photos = updatedApplications?.[applicationIndex]?.photos?.filter((_, i) => i !== photoIndex);
    onUpdate({ fertilizerApplications: updatedApplications });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData?.fertilizerApplications && formData?.fertilizerApplications?.length > 0) {
      formData?.fertilizerApplications?.forEach((app, index) => {
        if (app?.date && !app?.type) {
          newErrors[`type_${index}`] = 'Please select fertilizer type';
        }
        if (app?.date && (!app?.quantity || app?.quantity <= 0)) {
          newErrors[`quantity_${index}`] = 'Please enter valid quantity';
        }
      });
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
          <Icon name="Beaker" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Fertilizer Management</h2>
          <p className="text-sm text-muted-foreground">Record fertilizer applications and costs</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-card-foreground">Fertilizer Applications</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addFertilizerApplication}
            iconName="Plus"
            iconPosition="left"
          >
            Add Application
          </Button>
        </div>

        {formData?.fertilizerApplications && formData?.fertilizerApplications?.length > 0 ? (
          <div className="space-y-6">
            {formData?.fertilizerApplications?.map((application, index) => (
              <div key={index} className="bg-muted rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-card-foreground">Application {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFertilizerApplication(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Application Date"
                    type="date"
                    value={application?.date}
                    onChange={(e) => handleFertilizerApplicationChange(index, 'date', e?.target?.value)}
                    max={new Date()?.toISOString()?.split('T')?.[0]}
                    required
                  />

                  <Select
                    label="Fertilizer Type"
                    options={fertilizerTypes}
                    value={application?.type}
                    onChange={(value) => handleFertilizerApplicationChange(index, 'type', value)}
                    error={errors?.[`type_${index}`]}
                    searchable
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Quantity (kg/acre)"
                    type="number"
                    value={application?.quantity}
                    onChange={(e) => handleFertilizerApplicationChange(index, 'quantity', parseFloat(e?.target?.value))}
                    error={errors?.[`quantity_${index}`]}
                    min="0"
                    step="0.1"
                    placeholder="e.g., 50"
                    required
                  />

                  <Select
                    label="Application Method"
                    options={applicationMethods}
                    value={application?.method}
                    onChange={(value) => handleFertilizerApplicationChange(index, 'method', value)}
                  />

                  <Input
                    label="Cost (₹)"
                    type="number"
                    value={application?.cost}
                    onChange={(e) => handleFertilizerApplicationChange(index, 'cost', parseFloat(e?.target?.value))}
                    min="0"
                    placeholder="e.g., 1200"
                  />
                </div>

                <Input
                  label="Notes"
                  type="text"
                  value={application?.notes}
                  onChange={(e) => handleFertilizerApplicationChange(index, 'notes', e?.target?.value)}
                  placeholder="Weather conditions, soil moisture, observations"
                  className="mb-4"
                />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-card-foreground">
                    Application Photos
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(index, e?.target?.files)}
                      className="hidden"
                      id={`photo-upload-${index}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`photo-upload-${index}`)?.click()}
                      iconName="Camera"
                      iconPosition="left"
                    >
                      Add Photos
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {application?.photos?.length || 0} photos uploaded
                    </span>
                  </div>

                  {application?.photos && application?.photos?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {application?.photos?.map((photo, photoIndex) => (
                        <div key={photoIndex} className="relative group">
                          <Image
                            src={photo}
                            alt={`Fertilizer application ${index + 1} photo ${photoIndex + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhoto(index, photoIndex)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Beaker" size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-lg mb-2">No fertilizer applications recorded</p>
            <p className="text-sm">Click "Add Application" to start recording fertilizer usage</p>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-border">
          <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
            Previous
          </Button>
          <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
            Next: Additional Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FertilizerForm;