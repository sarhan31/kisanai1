import React from 'react';

const AuthTabs = ({ activeTab, onTabChange, currentLanguage }) => {
  const content = {
    en: {
      login: 'Sign In',
      register: 'Sign Up'
    },
    hi: {
      login: 'साइन इन',
      register: 'साइन अप'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const tabs = [
    { id: 'login', label: t?.login },
    { id: 'register', label: t?.register }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`
            flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200
            ${activeTab === tab?.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;