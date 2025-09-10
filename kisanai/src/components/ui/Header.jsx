import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  const notifications = [
    {
      id: 1,
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in your area tomorrow',
      time: '2 hours ago',
      type: 'warning'
    },
    {
      id: 2,
      title: 'AI Recommendation',
      message: 'Optimal time for fertilizer application detected',
      time: '4 hours ago',
      type: 'success'
    },
    {
      id: 3,
      title: 'Data Sync Complete',
      message: 'Your farm data has been successfully updated',
      time: '1 day ago',
      type: 'info'
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
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
            <h1 className="text-xl font-semibold text-foreground">KisanAI</h1>
            <p className="text-xs text-muted-foreground">Smart Farming Solutions</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search crops, recommendations, analytics..."
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationOpen(false)}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">
                {languages?.find(lang => lang?.code === language)?.flag}
              </span>
              <span className="hidden sm:inline text-sm">
                {languages?.find(lang => lang?.code === language)?.name}
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsProfileOpen(false);
              }}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {notifications?.length}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.type === 'warning' ? 'bg-warning' :
                          notification?.type === 'success' ? 'bg-success' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-popover-foreground">
                            {notification?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon">
            <Icon name="Sun" size={20} />
          </Button>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationOpen(false);
              }}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground">Farmer</p>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-popover-foreground">Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">rajesh@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-3">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-3">
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-3">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted transition-smooth flex items-center space-x-3"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;