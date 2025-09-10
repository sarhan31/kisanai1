import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-card-foreground">Form Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full flex justify-between">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div
                key={step?.id}
                className={`flex flex-col items-center -mt-1 ${
                  index === 0 ? 'ml-0' : index === steps?.length - 1 ? 'mr-0' : ''
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? 'bg-primary border-primary'
                      : isCurrent
                      ? 'bg-primary border-primary' :'bg-card border-muted-foreground'
                  }`}
                >
                  {isCompleted && (
                    <Icon name="Check" size={10} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Step Labels */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={step?.id}
              className={`text-center p-2 rounded-lg transition-all duration-200 ${
                isCurrent ? 'bg-primary/10' : ''
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                <Icon
                  name={step?.icon}
                  size={16}
                  className={`${
                    isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </div>
              <p
                className={`text-xs font-medium ${
                  isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step?.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                {step?.description}
              </p>
            </div>
          );
        })}
      </div>
      {/* Current Step Info */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name={steps?.[currentStep - 1]?.icon} size={16} className="text-primary" />
          <span className="font-medium text-card-foreground">
            {steps?.[currentStep - 1]?.title}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {steps?.[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
};

export default FormProgress;