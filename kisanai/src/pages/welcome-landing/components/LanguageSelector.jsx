import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="font-medium text-card-foreground hidden sm:inline">
          {currentLang?.nativeName}
        </span>
        <span className="font-medium text-card-foreground sm:hidden">
          {currentLang?.code?.toUpperCase()}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50 py-2">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {content?.languageSelector?.selectLanguage}
            </p>
          </div>
          
          {languages?.map((language) => (
            <button
              key={language?.code}
              onClick={() => handleLanguageSelect(language?.code)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted transition-colors ${
                currentLanguage === language?.code ? 'bg-primary/10 text-primary' : 'text-popover-foreground'
              }`}
            >
              <span className="text-lg">{language?.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{language?.nativeName}</div>
                <div className="text-xs text-muted-foreground">{language?.name}</div>
              </div>
              {currentLanguage === language?.code && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;