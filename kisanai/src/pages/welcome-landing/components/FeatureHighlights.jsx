import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureHighlights = ({ content }) => {
  const features = [
    {
      icon: 'Brain',
      title: content?.features?.aiPrediction?.title,
      description: content?.features?.aiPrediction?.description,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?w=400&h=300&fit=crop',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: 'Cloud',
      title: content?.features?.weatherMonitoring?.title,
      description: content?.features?.weatherMonitoring?.description,
      image: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg?w=400&h=300&fit=crop',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      icon: 'Leaf',
      title: content?.features?.soilHealth?.title,
      description: content?.features?.soilHealth?.description,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      color: 'bg-accent/10 text-accent'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {content?.features?.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content?.features?.sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl shadow-card hover:shadow-modal transition-all duration-300 border border-border overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-lg ${feature?.color} flex items-center justify-center`}>
                  <Icon name={feature?.icon} size={24} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
                
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                  <span>{content?.features?.learnMore}</span>
                  <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;