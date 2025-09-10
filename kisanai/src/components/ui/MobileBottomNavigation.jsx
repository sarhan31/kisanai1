import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/farmer-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'AI Tips',
      path: '/ai-recommendations',
      icon: 'Brain'
    },
    {
      label: 'Data Entry',
      path: '/data-input-forms',
      icon: 'FileText'
    },
    {
      label: 'Analytics',
      path: '/performance-analytics',
      icon: 'BarChart3'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-modal lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems?.map((item) => {
          const isActive = isActivePath(item?.path);
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center justify-center p-2 min-w-0 flex-1
                transition-all duration-200 ease-out
                ${isActive ? 'text-primary' : 'text-muted-foreground'}
              `}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span className={`text-xs font-medium truncate ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item?.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;