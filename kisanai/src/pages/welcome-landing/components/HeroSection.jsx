import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ currentLanguage, content }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/user-authentication');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-primary rounded-full"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              {content?.hero?.badge}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {content?.hero?.title}
              <span className="text-primary block mt-2">{content?.hero?.subtitle}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {content?.hero?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={handleGetStarted}
                iconName="ArrowRight"
                iconPosition="right"
                className="px-8"
              >
                {content?.hero?.primaryButton}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/farmer-dashboard')}
                iconName="Play"
                iconPosition="left"
                className="px-8"
              >
                {content?.hero?.secondaryButton}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">{content?.hero?.stats?.farmers}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">{content?.hero?.stats?.accuracy}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">{content?.hero?.stats?.support}</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-modal p-8 border border-border">
              <Image
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
                alt="Smart farming dashboard preview"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-modal">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} />
                  <span className="text-sm font-medium">+25% {content?.hero?.floatingCards?.yield}</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-modal">
                <div className="flex items-center space-x-2">
                  <Icon name="Brain" size={16} />
                  <span className="text-sm font-medium">{content?.hero?.floatingCards?.aiPowered}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;