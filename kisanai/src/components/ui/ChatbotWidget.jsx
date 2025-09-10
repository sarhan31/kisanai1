import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your KisanAI assistant. How can I help you with your farming today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { label: 'Weather Forecast', icon: 'Cloud' },
    { label: 'Crop Recommendations', icon: 'Sprout' },
    { label: 'Pest Control', icon: 'Bug' },
    { label: 'Irrigation Tips', icon: 'Droplets' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: 'Thank you for your question! Based on your farm data, I recommend checking the weather conditions and soil moisture levels. Would you like me to provide specific guidance for your crops?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action?.label);
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-card border border-border rounded-lg shadow-modal flex flex-col animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-primary-foreground">KisanAI Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-card-foreground'
                  }`}
                >
                  <p className="text-sm">{message?.message}</p>
                  <p className={`text-xs mt-1 ${
                    message?.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {messages?.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions?.map((action) => (
                  <button
                    key={action?.label}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center space-x-2 p-2 text-xs bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
                  >
                    <Icon name={action?.icon} size={14} />
                    <span>{action?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about farming, weather, crops..."
                className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputMessage?.trim()}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Chat Toggle Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-modal bg-primary hover:bg-primary/90"
      >
        <Icon name={isOpen ? "X" : "MessageCircle"} size={24} className="text-primary-foreground" />
      </Button>
    </div>
  );
};

export default ChatbotWidget;