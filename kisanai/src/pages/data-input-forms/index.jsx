import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileBottomNavigation from '../../components/ui/MobileBottomNavigation';
import ChatbotWidget from '../../components/ui/ChatbotWidget';
import FormProgress from './components/FormProgress';
import CropDetailsForm from './components/CropDetailsForm';
import IrrigationForm from './components/IrrigationForm';
import FertilizerForm from './components/FertilizerForm';
import AdditionalDataForm from './components/AdditionalDataForm';
import ReviewSubmitForm from './components/ReviewSubmitForm';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataInputForms = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Crop Details
    cropType: '',
    variety: '',
    sowingDate: '',
    season: '',
    fieldArea: '',
    expectedHarvest: '',
    cropNotes: '',
    
    // Irrigation Details
    irrigationMethod: '',
    waterSource: '',
    irrigationFrequency: '',
    waterAmount: '',
    irrigationDuration: '',
    isAutomated: false,
    hasMoistureMonitoring: false,
    irrigationSchedule: [],
    
    // Fertilizer Details
    fertilizerApplications: [],
    
    // Additional Data
    soilPreparation: '',
    preparationCost: '',
    preparationDate: '',
    seedRate: '',
    seedCost: '',
    germinationRate: '',
    seedTreatments: [],
    pestManagement: '',
    pesticideApplications: '',
    pestControlCost: '',
    weatherCondition: '',
    totalRainfall: '',
    extremeWeatherDays: '',
    challenges: '',
    successFactors: '',
    futurePlans: ''
  });

  const steps = [
    {
      id: 1,
      title: 'Crop Details',
      description: 'Basic crop information',
      icon: 'Sprout'
    },
    {
      id: 2,
      title: 'Irrigation',
      description: 'Water management data',
      icon: 'Droplets'
    },
    {
      id: 3,
      title: 'Fertilizer',
      description: 'Fertilizer applications',
      icon: 'Beaker'
    },
    {
      id: 4,
      title: 'Additional',
      description: 'Extra farm data',
      icon: 'FileText'
    },
    {
      id: 5,
      title: 'Review',
      description: 'Review and submit',
      icon: 'Eye'
    }
  ];

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('kisanai-form-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Auto-save form data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('kisanai-form-data', JSON.stringify(formData));
  }, [formData]);

  const handleFormUpdate = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (finalData) => {
    // Clear saved form data after successful submission
    localStorage.removeItem('kisanai-form-data');
    
    // Here you would typically send data to your API
    console.log('Form submitted with data:', finalData);
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
      window.location.href = '/farmer-dashboard';
    }, 2000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CropDetailsForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <IrrigationForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <FertilizerForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <AdditionalDataForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ReviewSubmitForm
            formData={formData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const clearFormData = () => {
    if (window.confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
      setFormData({
        cropType: '',
        variety: '',
        sowingDate: '',
        season: '',
        fieldArea: '',
        expectedHarvest: '',
        cropNotes: '',
        irrigationMethod: '',
        waterSource: '',
        irrigationFrequency: '',
        waterAmount: '',
        irrigationDuration: '',
        isAutomated: false,
        hasMoistureMonitoring: false,
        irrigationSchedule: [],
        fertilizerApplications: [],
        soilPreparation: '',
        preparationCost: '',
        preparationDate: '',
        seedRate: '',
        seedCost: '',
        germinationRate: '',
        seedTreatments: [],
        pestManagement: '',
        pesticideApplications: '',
        pestControlCost: '',
        weatherCondition: '',
        totalRainfall: '',
        extremeWeatherDays: '',
        challenges: '',
        successFactors: '',
        futurePlans: ''
      });
      setCurrentStep(1);
      localStorage.removeItem('kisanai-form-data');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`
        pt-16 pb-20 lg:pb-6 transition-all duration-300
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Data Input Forms</h1>
                  <p className="text-muted-foreground">
                    Record your farm data for personalized AI recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFormData}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear Form
                </Button>
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Save" size={16} />
                  <span>Auto-saved</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Time</p>
                    <p className="font-semibold text-card-foreground">10-15 minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Security</p>
                    <p className="font-semibold text-card-foreground">Encrypted & Safe</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Wifi" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Offline Support</p>
                    <p className="font-semibold text-card-foreground">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Progress */}
          <FormProgress 
            currentStep={currentStep}
            totalSteps={steps?.length}
            steps={steps}
          />

          {/* Form Content */}
          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          {/* Help Section */}
          <div className="bg-muted/50 rounded-lg border border-border p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-card-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Having trouble filling out the form? Our support team is here to help you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                    Call Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
                    User Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNavigation />
      <ChatbotWidget />
    </div>
  );
};

export default DataInputForms;