import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const AuthHeader = ({ currentLanguage, onLanguageChange }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      backToHome: 'Back to Home',
      welcomeTitle: 'Welcome to KisanAI',
      welcomeSubtitle: 'Smart farming solutions powered by artificial intelligence'
    },
    hi: {
      backToHome: 'होम पर वापस जाएं',
      welcomeTitle: 'KisanAI में आपका स्वागत है',
      welcomeSubtitle: 'कृत्रिम बुद्धिमत्ता द्वारा संचालित स्मार्ट खेती समाधान'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  return (
    <div className="w-full">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/welcome-landing')}
          iconName="ArrowLeft"
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          {t?.backToHome}
        </Button>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          {languages?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => onLanguageChange(lang?.code)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${currentLanguage === lang?.code
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <span className="mr-1">{lang?.flag}</span>
              <span className="hidden sm:inline">{lang?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              <path d="M12 16C12 18.21 10.21 20 8 20C5.79 20 4 18.21 4 16C4 13.79 5.79 12 8 12C10.21 12 12 13.79 12 16Z" />
              <path d="M20 16C20 18.21 18.21 20 16 20C13.79 20 12 18.21 12 16C12 13.79 13.79 12 16 12C18.21 12 20 13.79 20 16Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">{t?.welcomeTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">{t?.welcomeSubtitle}</p>
      </div>
    </div>
  );
};

export default AuthHeader;