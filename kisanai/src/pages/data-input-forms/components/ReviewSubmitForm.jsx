import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ReviewSubmitForm = ({ formData, onPrevious, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Call parent submit handler
    setTimeout(() => {
      onSubmit(formData);
    }, 1500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  if (submitSuccess) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">
          Data Submitted Successfully!
        </h2>
        <p className="text-muted-foreground mb-6">
          Your farm data has been recorded and will be used to improve AI recommendations.
        </p>
        <div className="bg-success/10 rounded-lg p-4 mb-6">
          <p className="text-success font-medium">
            Thank you for contributing to smarter farming!
          </p>
          <p className="text-sm text-success/80 mt-1">
            You'll receive updated AI recommendations based on this data within 24 hours.
          </p>
        </div>
        <Button onClick={() => window.location.href = '/farmer-dashboard'}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Eye" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Review & Submit</h2>
          <p className="text-sm text-muted-foreground">Verify your data before submission</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Crop Details Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
            <Icon name="Sprout" size={16} />
            <span>Crop Details</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Crop Type:</span>
              <span className="ml-2 font-medium">{formData?.cropType || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Variety:</span>
              <span className="ml-2 font-medium">{formData?.variety || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Sowing Date:</span>
              <span className="ml-2 font-medium">{formatDate(formData?.sowingDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Field Area:</span>
              <span className="ml-2 font-medium">
                {formData?.fieldArea ? `${formData?.fieldArea} acres` : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Season:</span>
              <span className="ml-2 font-medium">{formData?.season || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Expected Harvest:</span>
              <span className="ml-2 font-medium">{formatDate(formData?.expectedHarvest)}</span>
            </div>
          </div>
          {formData?.cropNotes && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-muted-foreground">Notes:</span>
              <p className="mt-1 text-sm">{formData?.cropNotes}</p>
            </div>
          )}
        </div>

        {/* Irrigation Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
            <Icon name="Droplets" size={16} />
            <span>Irrigation Details</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Method:</span>
              <span className="ml-2 font-medium">{formData?.irrigationMethod || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Water Source:</span>
              <span className="ml-2 font-medium">{formData?.waterSource || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Frequency:</span>
              <span className="ml-2 font-medium">
                {formData?.irrigationFrequency ? `Every ${formData?.irrigationFrequency} days` : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Water Amount:</span>
              <span className="ml-2 font-medium">
                {formData?.waterAmount ? `${formData?.waterAmount} L/acre` : 'Not specified'}
              </span>
            </div>
          </div>
          {formData?.irrigationSchedule && formData?.irrigationSchedule?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-muted-foreground">Schedule Entries:</span>
              <span className="ml-2 font-medium">{formData?.irrigationSchedule?.length} records</span>
            </div>
          )}
        </div>

        {/* Fertilizer Summary */}
        {formData?.fertilizerApplications && formData?.fertilizerApplications?.length > 0 && (
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
              <Icon name="Beaker" size={16} />
              <span>Fertilizer Applications</span>
            </h3>
            <div className="space-y-3">
              {formData?.fertilizerApplications?.map((app, index) => (
                <div key={index} className="bg-card rounded p-3 border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 font-medium">{formatDate(app?.date)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="ml-2 font-medium">{app?.type || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="ml-2 font-medium">
                        {app?.quantity ? `${app?.quantity} kg/acre` : 'Not specified'}
                      </span>
                    </div>
                  </div>
                  {app?.cost && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="ml-2 font-medium">{formatCurrency(app?.cost)}</span>
                    </div>
                  )}
                  {app?.photos && app?.photos?.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">
                        {app?.photos?.length} photos attached
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Data Summary */}
        {(formData?.soilPreparation || formData?.seedRate || formData?.pestManagement || formData?.weatherCondition) && (
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Additional Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {formData?.soilPreparation && (
                <div>
                  <span className="text-muted-foreground">Soil Preparation:</span>
                  <span className="ml-2 font-medium">{formData?.soilPreparation}</span>
                </div>
              )}
              {formData?.seedRate && (
                <div>
                  <span className="text-muted-foreground">Seed Rate:</span>
                  <span className="ml-2 font-medium">{formData?.seedRate} kg/acre</span>
                </div>
              )}
              {formData?.pestManagement && (
                <div>
                  <span className="text-muted-foreground">Pest Management:</span>
                  <span className="ml-2 font-medium">{formData?.pestManagement}</span>
                </div>
              )}
              {formData?.weatherCondition && (
                <div>
                  <span className="text-muted-foreground">Weather Condition:</span>
                  <span className="ml-2 font-medium">{formData?.weatherCondition}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Data Quality Score */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-medium text-primary mb-2 flex items-center space-x-2">
            <Icon name="BarChart3" size={16} />
            <span>Data Quality Assessment</span>
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completeness</span>
              <span className="text-sm font-medium text-primary">85%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your data quality is excellent! This will help generate more accurate AI recommendations.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Upload"
            iconPosition="right"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Data'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitForm;