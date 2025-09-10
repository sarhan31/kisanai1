import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSection = ({ content }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate('/user-authentication', { state: { selectedRole: role } });
  };

  const handleGoogleAuth = () => {
    // Google OAuth placeholder
    console.log('Google OAuth integration placeholder');
    navigate('/user-authentication');
  };

  const roles = [
    {
      type: 'farmer',
      title: content?.registration?.farmer?.title,
      description: content?.registration?.farmer?.description,
      icon: 'Sprout',
      color: 'bg-primary text-primary-foreground',
      benefits: content?.registration?.farmer?.benefits
    },
    {
      type: 'expert',
      title: content?.registration?.expert?.title,
      description: content?.registration?.expert?.description,
      icon: 'GraduationCap',
      color: 'bg-secondary text-secondary-foreground',
      benefits: content?.registration?.expert?.benefits
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {content?.registration?.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content?.registration?.sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {roles?.map((role) => (
            <div
              key={role?.type}
              className="bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 border border-border p-8 group cursor-pointer"
              onClick={() => handleRoleSelection(role?.type)}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full ${role?.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={role?.icon} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {role?.title}
                </h3>
                <p className="text-muted-foreground">
                  {role?.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {role?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {content?.registration?.getStarted}
              </Button>
            </div>
          ))}
        </div>

        {/* Alternative Sign-in Options */}
        <div className="max-w-md mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                {content?.registration?.orContinueWith}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={handleGoogleAuth}
            className="w-full mb-4"
            iconName="Chrome"
            iconPosition="left"
          >
            {content?.registration?.continueWithGoogle}
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground text-sm">
              {content?.registration?.alreadyHaveAccount}{' '}
            </span>
            <button
              onClick={() => navigate('/user-authentication')}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {content?.registration?.signIn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;