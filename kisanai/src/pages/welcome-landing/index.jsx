import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import RegistrationSection from './components/RegistrationSection';
import TrustSignals from './components/TrustSignals';
import LanguageSelector from './components/LanguageSelector';

const WelcomeLanding = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  // Multi-language content
  const content = {
    en: {
      hero: {
        badge: "AI-Powered Agriculture",
        title: "Smart Farming for",
        subtitle: "Better Harvests",
        description: "Harness the power of artificial intelligence to optimize your crop yields, monitor weather patterns, and make data-driven farming decisions that increase productivity and reduce risks.",
        primaryButton: "Get Started Free",
        secondaryButton: "Watch Demo",
        stats: {
          farmers: "Active Farmers",
          accuracy: "Prediction Accuracy",
          support: "Expert Support"
        },
        floatingCards: {
          yield: "Yield Increase",
          aiPowered: "AI Powered"
        }
      },
      features: {
        sectionTitle: "Powerful Features for Modern Farming",
        sectionDescription: "Discover how our AI-driven platform transforms traditional farming with cutting-edge technology and expert insights.",
        aiPrediction: {
          title: "AI Yield Prediction",
          description: "Get accurate crop yield forecasts using machine learning algorithms trained on historical data, weather patterns, and soil conditions."
        },
        weatherMonitoring: {
          title: "Weather Monitoring",
          description: "Real-time weather tracking with alerts for extreme conditions, helping you make timely decisions to protect your crops."
        },
        soilHealth: {
          title: "Soil Health Analysis",
          description: "Monitor soil pH, moisture, and nutrient levels with detailed analytics to optimize fertilizer usage and crop rotation."
        },
        learnMore: "Learn More"
      },
      registration: {
        sectionTitle: "Choose Your Role",
        sectionDescription: "Join thousands of farmers and experts who are revolutionizing agriculture with AI-powered insights.",
        farmer: {
          title: "I\'m a Farmer",
          description: "Get personalized recommendations for your crops",
          benefits: [
            "AI-powered yield predictions",
            "Weather alerts and forecasts",
            "Soil health monitoring",
            "Irrigation scheduling",
            "Pest and disease alerts"
          ]
        },
        expert: {
          title: "I\'m an Expert",
          description: "Help farmers with your agricultural expertise",
          benefits: [
            "Monitor multiple farms",
            "Provide expert consultations",
            "Access advanced analytics",
            "Collaborate with farmers",
            "Share best practices"
          ]
        },
        getStarted: "Get Started",
        orContinueWith: "Or continue with",
        continueWithGoogle: "Continue with Google",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign In"
      },
      trustSignals: {
        certificationsTitle: "Trusted & Certified",
        certificationsDescription: "Our platform meets the highest standards of quality and security for agricultural technology.",
        certifications: {
          iso: "ISO 27001 Certified",
          isoDesc: "Information security management",
          government: "Government Approved",
          governmentDesc: "Ministry of Agriculture recognition",
          agriculture: "AgTech Certified",
          agricultureDesc: "Agricultural technology standards"
        },
        testimonialsTitle: "What Farmers Say",
        testimonialsDescription: "Real stories from farmers who have transformed their agricultural practices with KisanAI.",
        testimonials: {
          farmer: "Farmer",
          expert: "Agricultural Expert",
          wheatFarmer: "Wheat Farmer",
          cottonFarmer: "Cotton Farmer",
          agriculturalExpert: "Agricultural Expert",
          testimonial1: "KisanAI helped me increase my wheat yield by 30% last season. The weather alerts saved my crops from unexpected rainfall.",
          testimonial2: "The soil health monitoring feature is amazing. I now know exactly when and how much fertilizer to use for optimal cotton growth.",
          testimonial3: "As an agricultural consultant, KisanAI helps me provide better guidance to farmers across multiple regions with data-driven insights."
        },
        metrics: {
          activeFarmers: "Active Farmers",
          accuracy: "Prediction Accuracy",
          experts: "Agricultural Experts",
          support: "Support Available"
        }
      },
      languageSelector: {
        selectLanguage: "Select Language"
      }
    },
    hi: {
      hero: {
        badge: "एआई-संचालित कृषि",
        title: "बेहतर फसल के लिए",
        subtitle: "स्मार्ट खेती",
        description: "अपनी फसल की पैदावार को अनुकूलित करने, मौसम के पैटर्न की निगरानी करने और डेटा-संचालित खेती के निर्णय लेने के लिए कृत्रिम बुद्धिमत्ता की शक्ति का उपयोग करें।",
        primaryButton: "मुफ्त शुरुआत करें",
        secondaryButton: "डेमो देखें",
        stats: {
          farmers: "सक्रिय किसान",
          accuracy: "भविष्यवाणी सटीकता",
          support: "विशेषज्ञ सहायता"
        },
        floatingCards: {
          yield: "उत्पादन वृद्धि",
          aiPowered: "एआई संचालित"
        }
      },
      features: {
        sectionTitle: "आधुनिक खेती के लिए शक्तिशाली सुविधाएं",
        sectionDescription: "जानें कि कैसे हमारा एआई-संचालित प्लेटफॉर्म अत्याधुनिक तकनीक के साथ पारंपरिक खेती को बदल देता है।",
        aiPrediction: {
          title: "एआई उत्पादन भविष्यवाणी",
          description: "ऐतिहासिक डेटा, मौसम पैटर्न और मिट्टी की स्थिति पर प्रशिक्षित मशीन लर्निंग एल्गोरिदम का उपयोग करके सटीक फसल उत्पादन पूर्वानुमान प्राप्त करें।"
        },
        weatherMonitoring: {
          title: "मौसम निगरानी",
          description: "चरम स्थितियों के लिए अलर्ट के साथ वास्तविक समय मौसम ट्रैकिंग, आपकी फसलों की सुरक्षा के लिए समय पर निर्णय लेने में मदद करता है।"
        },
        soilHealth: {
          title: "मिट्टी स्वास्थ्य विश्लेषण",
          description: "उर्वरक उपयोग और फसल चक्रण को अनुकूलित करने के लिए विस्तृत विश्लेषण के साथ मिट्टी के पीएच, नमी और पोषक तत्वों के स्तर की निगरानी करें।"
        },
        learnMore: "और जानें"
      },
      registration: {
        sectionTitle: "अपनी भूमिका चुनें",
        sectionDescription: "हजारों किसानों और विशेषज्ञों से जुड़ें जो एआई-संचालित अंतर्दृष्टि के साथ कृषि में क्रांति ला रहे हैं।",
        farmer: {
          title: "मैं एक किसान हूं",
          description: "अपनी फसलों के लिए व्यक्तिगत सिफारिशें प्राप्त करें",
          benefits: [
            "एआई-संचालित उत्पादन भविष्यवाणियां",
            "मौसम अलर्ट और पूर्वानुमान",
            "मिट्टी स्वास्थ्य निगरानी",
            "सिंचाई शेड्यूलिंग",
            "कीट और रोग अलर्ट"
          ]
        },
        expert: {
          title: "मैं एक विशेषज्ञ हूं",
          description: "अपनी कृषि विशेषज्ञता से किसानों की मदद करें",
          benefits: [
            "कई खेतों की निगरानी करें",
            "विशेषज्ञ परामर्श प्रदान करें",
            "उन्नत विश्लेषण तक पहुंच",
            "किसानों के साथ सहयोग करें",
            "सर्वोत्तम प्रथाओं को साझा करें"
          ]
        },
        getStarted: "शुरुआत करें",
        orContinueWith: "या जारी रखें",
        continueWithGoogle: "Google के साथ जारी रखें",
        alreadyHaveAccount: "पहले से खाता है?",
        signIn: "साइन इन करें"
      },
      trustSignals: {
        certificationsTitle: "विश्वसनीय और प्रमाणित",
        certificationsDescription: "हमारा प्लेटफॉर्म कृषि प्रौद्योगिकी के लिए गुणवत्ता और सुरक्षा के उच्चतम मानकों को पूरा करता है।",
        certifications: {
          iso: "ISO 27001 प्रमाणित",
          isoDesc: "सूचना सुरक्षा प्रबंधन",
          government: "सरकारी अनुमोदित",
          governmentDesc: "कृषि मंत्रालय की मान्यता",
          agriculture: "एग्रीटेक प्रमाणित",
          agricultureDesc: "कृषि प्रौद्योगिकी मानक"
        },
        testimonialsTitle: "किसान क्या कहते हैं",
        testimonialsDescription: "उन किसानों की वास्तविक कहानियां जिन्होंने KisanAI के साथ अपनी कृषि प्रथाओं को बदल दिया है।",
        testimonials: {
          farmer: "किसान",
          expert: "कृषि विशेषज्ञ",
          wheatFarmer: "गेहूं किसान",
          cottonFarmer: "कपास किसान",
          agriculturalExpert: "कृषि विशेषज्ञ",
          testimonial1: "KisanAI ने मुझे पिछले सीजन में अपनी गेहूं की उत्पादन 30% बढ़ाने में मदद की। मौसम अलर्ट ने मेरी फसलों को अप्रत्याशित बारिश से बचाया।",
          testimonial2: "मिट्टी स्वास्थ्य निगरानी सुविधा अद्भुत है। अब मैं जानता हूं कि कपास की इष्टतम वृद्धि के लिए कब और कितना उर्वरक उपयोग करना है।",
          testimonial3: "एक कृषि सलाहकार के रूप में, KisanAI मुझे डेटा-संचालित अंतर्दृष्टि के साथ कई क्षेत्रों के किसानों को बेहतर मार्गदर्शन प्रदान करने में मदद करता है।"
        },
        metrics: {
          activeFarmers: "सक्रिय किसान",
          accuracy: "भविष्यवाणी सटीकता",
          experts: "कृषि विशेषज्ञ",
          support: "सहायता उपलब्ध"
        }
      },
      languageSelector: {
        selectLanguage: "भाषा चुनें"
      }
    }
  };

  // Get current language content, fallback to English
  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>KisanAI - Smart Farming Solutions | AI-Powered Agriculture</title>
        <meta name="description" content="Transform your farming with AI-powered crop yield predictions, weather monitoring, and soil health analysis. Join thousands of farmers using KisanAI for better harvests." />
        <meta name="keywords" content="smart farming, AI agriculture, crop prediction, weather monitoring, soil health, farming technology, KisanAI" />
        <meta property="og:title" content="KisanAI - Smart Farming Solutions" />
        <meta property="og:description" content="AI-powered agricultural platform for crop yield prediction and farming optimization" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/welcome-landing" />
      </Helmet>
      {/* Fixed Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          content={currentContent}
        />
      </div>
      {/* Main Content */}
      <main>
        <HeroSection 
          currentLanguage={currentLanguage}
          content={currentContent}
        />
        
        <FeatureHighlights 
          content={currentContent}
        />
        
        <RegistrationSection 
          content={currentContent}
        />
        
        <TrustSignals 
          content={currentContent}
        />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  <path d="M12 16C12 18.21 10.21 20 8 20C5.79 20 4 18.21 4 16C4 13.79 5.79 12 8 12C10.21 12 12 13.79 12 16Z" />
                  <path d="M20 16C20 18.21 18.21 20 16 20C13.79 20 12 18.21 12 16C12 13.79 13.79 12 16 12C18.21 12 20 13.79 20 16Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">KisanAI</h3>
                <p className="text-sm text-muted-foreground">Smart Farming Solutions</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} KisanAI. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Empowering farmers with AI technology
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeLanding;