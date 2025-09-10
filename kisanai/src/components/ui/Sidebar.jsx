import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/farmer-dashboard',
      icon: 'LayoutDashboard',
      description: 'Farm overview and insights'
    },
    {
      label: 'AI Recommendations',
      path: '/ai-recommendations',
      icon: 'Brain',
      description: 'Smart farming guidance'
    },
    {
      label: 'Data Entry',
      path: '/data-input-forms',
      icon: 'FileText',
      description: 'Record farm activities'
    },
    {
      label: 'Analytics',
      path: '/performance-analytics',
      icon: 'BarChart3',
      description: 'Performance insights'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] bg-card border-r border-border shadow-card
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:static lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    <path d="M12 16C12 18.21 10.21 20 8 20C5.79 20 4 18.21 4 16C4 13.79 5.79 12 8 12C10.21 12 12 13.79 12 16Z" />
                    <path d="M20 16C20 18.21 18.21 20 16 20C13.79 20 12 18.21 12 16C12 13.79 13.79 12 16 12C18.21 12 20 13.79 20 16Z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">KisanAI</h2>
                  <p className="text-xs text-muted-foreground">Smart Farming</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hidden lg:flex"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              return (
                <div key={item?.path} className="relative group">
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left
                      transition-all duration-200 ease-out
                      ${isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-card-foreground hover:bg-muted hover:text-card-foreground'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item?.label}</p>
                        <p className={`text-xs truncate ${
                          isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {item?.description}
                        </p>
                      </div>
                    )}
                  </button>
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-modal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                      <p className="font-medium text-sm text-popover-foreground">{item?.label}</p>
                      <p className="text-xs text-muted-foreground">{item?.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/settings')}
                >
                  <Icon name="Settings" size={16} className="mr-3" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/help')}
                >
                  <Icon name="HelpCircle" size={16} className="mr-3" />
                  Help & Support
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" size="icon" className="w-full">
                  <Icon name="Settings" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="w-full">
                  <Icon name="HelpCircle" size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Icon name="Menu" size={20} />
      </Button>
    </>
  );
};

export default Sidebar;