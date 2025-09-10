import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = ({ content }) => {
  const certifications = [
    {
      name: content?.trustSignals?.certifications?.iso,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop',
      description: content?.trustSignals?.certifications?.isoDesc
    },
    {
      name: content?.trustSignals?.certifications?.government,
      logo: 'https://images.pexels.com/photos/8815071/pexels-photo-8815071.jpeg?w=120&h=80&fit=crop',
      description: content?.trustSignals?.certifications?.governmentDesc
    },
    {
      name: content?.trustSignals?.certifications?.agriculture,
      logo: 'https://images.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_960_720.jpg?w=120&h=80&fit=crop',
      description: content?.trustSignals?.certifications?.agricultureDesc
    }
  ];

  const testimonials = [
    {
      name: "राजेश कुमार",
      location: "पंजाब",
      role: content?.trustSignals?.testimonials?.farmer,
      rating: 5,
      comment: content?.trustSignals?.testimonials?.testimonial1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      crop: content?.trustSignals?.testimonials?.wheatFarmer
    },
    {
      name: "प्रिया शर्मा",
      location: "गुजरात",
      role: content?.trustSignals?.testimonials?.farmer,
      rating: 5,
      comment: content?.trustSignals?.testimonials?.testimonial2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      crop: content?.trustSignals?.testimonials?.cottonFarmer
    },
    {
      name: "अमित पटेल",
      location: "महाराष्ट्र",
      role: content?.trustSignals?.testimonials?.expert,
      rating: 5,
      comment: content?.trustSignals?.testimonials?.testimonial3,
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      crop: content?.trustSignals?.testimonials?.agriculturalExpert
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {content?.trustSignals?.certificationsTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content?.trustSignals?.certificationsDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-card border border-border p-6 text-center hover:shadow-modal transition-shadow"
              >
                <div className="w-20 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={cert?.logo}
                    alt={cert?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  {cert?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {content?.trustSignals?.testimonialsTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content?.trustSignals?.testimonialsDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl shadow-card border border-border p-6 hover:shadow-modal transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial?.crop} • {testimonial?.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{testimonial?.comment}"
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {testimonial?.location}
                    <span className="mx-2">•</span>
                    <Icon name="User" size={12} className="mr-1" />
                    {testimonial?.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">{content?.trustSignals?.metrics?.activeFarmers}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">{content?.trustSignals?.metrics?.accuracy}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">{content?.trustSignals?.metrics?.experts}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{content?.trustSignals?.metrics?.support}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;