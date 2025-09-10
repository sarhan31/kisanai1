import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const pageContent = {
    en: {
      title: 'User Authentication - KisanAI',
      description: 'Sign in or create an account to access KisanAI smart farming solutions'
    },
    hi: {
      title: 'उपयोगकर्ता प्रमाणीकरण - KisanAI',
      description: 'KisanAI स्मार्ट खेती समाधान तक पहुंचने के लिए साइन इन करें या खाता बनाएं'
    }
  };

  const t = pageContent?.[currentLanguage] || pageContent?.en;

  return (
    <>
      <Helmet>
        <title>{t?.title}</title>
        <meta name="description" content={t?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <AuthHeader 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Left Side - Illustration/Features */}
              <div className="hidden lg:block lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                  <div className="relative bg-card border border-border rounded-3xl p-8 shadow-modal">
                    <div className="space-y-8">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-primary"
                            fill="currentColor"
                          >
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {currentLanguage === 'hi' ? 'AI-संचालित अंतर्दृष्टि' : 'AI-Powered Insights'}
                        </h3>
                        <p className="text-muted-foreground">
                          {currentLanguage === 'hi' ?'उन्नत मशीन लर्निंग के साथ फसल की पैदावार की भविष्यवाणी करें' :'Predict crop yields with advanced machine learning'
                          }
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-24 h-24 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M3 3v18h18" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {currentLanguage === 'hi' ? 'रीयल-टाइम मॉनिटरिंग' : 'Real-time Monitoring'}
                        </h3>
                        <p className="text-muted-foreground">
                          {currentLanguage === 'hi' ?'मौसम, मिट्टी और फसल की स्थिति को ट्रैक करें' :'Track weather, soil, and crop conditions'
                          }
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-accent"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 12l2 2 4-4" />
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                            <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                            <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {currentLanguage === 'hi' ? 'स्मार्ट सिफारिशें' : 'Smart Recommendations'}
                        </h3>
                        <p className="text-muted-foreground">
                          {currentLanguage === 'hi' ?'व्यक्तिगत कृषि सलाह और अनुकूलन' :'Personalized farming advice and optimization'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Authentication Forms */}
              <div className="w-full lg:w-1/2 max-w-md">
                <div className="bg-card border border-border rounded-2xl shadow-modal p-8">
                  <AuthTabs 
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    currentLanguage={currentLanguage}
                  />

                  {activeTab === 'login' ? (
                    <LoginForm currentLanguage={currentLanguage} />
                  ) : (
                    <RegisterForm 
                      currentLanguage={currentLanguage}
                      onLanguageChange={handleLanguageChange}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage === 'hi' ?'भारत सरकार द्वारा मान्यता प्राप्त कृषि तकनीक' :'Trusted by farmers across India'
                }
              </p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {currentLanguage === 'hi' ? 'सुरक्षित' : 'Secure'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {currentLanguage === 'hi' ? 'तेज़' : 'Fast'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {currentLanguage === 'hi' ? 'विश्वसनीय' : 'Trusted'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuthentication;