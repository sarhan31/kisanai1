import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your KisanAI account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signInButton: 'Sign In',
      orText: 'Or continue with',
      googleButton: 'Continue with Google',
      errors: {
        email: 'Please enter a valid email address',
        password: 'Password is required',
        invalid: 'Invalid email or password'
      }
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने KisanAI खाते में साइन इन करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signInButton: 'साइन इन करें',
      orText: 'या इसके साथ जारी रखें',
      googleButton: 'Google के साथ जारी रखें',
      errors: {
        email: 'कृपया एक वैध ईमेल पता दर्ज करें',
        password: 'पासवर्ड आवश्यक है',
        invalid: 'अमान्य ईमेल या पासवर्ड'
      }
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  // Mock credentials for testing
  const mockCredentials = {
    farmer: { email: 'farmer@kisanai.com', password: 'farmer123' },
    expert: { email: 'expert@kisanai.com', password: 'expert123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = t?.errors?.email;
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = t?.errors?.email;
    }
    
    if (!formData?.password) {
      newErrors.password = t?.errors?.password;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { email, password } = formData;
      
      // Check mock credentials
      const isFarmer = email === mockCredentials?.farmer?.email && password === mockCredentials?.farmer?.password;
      const isExpert = email === mockCredentials?.expert?.email && password === mockCredentials?.expert?.password;
      
      if (isFarmer || isExpert) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email,
          role: isFarmer ? 'farmer' : 'expert',
          name: isFarmer ? 'Rajesh Kumar' : 'Dr. Priya Sharma',
          isAuthenticated: true
        }));
        
        // Navigate to dashboard
        navigate('/farmer-dashboard');
      } else {
        setErrors({ invalid: t?.errors?.invalid });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Mock Google OAuth
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: 'user@gmail.com',
        role: 'farmer',
        name: 'Google User',
        isAuthenticated: true
      }));
      navigate('/farmer-dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t?.title}</h2>
        <p className="text-muted-foreground">{t?.subtitle}</p>
      </div>
      {errors?.invalid && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">{errors?.invalid}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t?.emailLabel}
          type="email"
          name="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <Input
          label={t?.passwordLabel}
          type="password"
          name="password"
          placeholder={t?.passwordPlaceholder}
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label={t?.rememberMe}
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
          >
            {t?.forgotPassword}
          </button>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {t?.signInButton}
        </Button>
      </form>
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">{t?.orText}</span>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          iconName="Chrome"
          iconPosition="left"
          className="mt-4 h-12"
        >
          {t?.googleButton}
        </Button>
      </div>
      {/* Mock Credentials Display */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs">
          <p><strong>Farmer:</strong> farmer@kisanai.com / farmer123</p>
          <p><strong>Expert:</strong> expert@kisanai.com / expert123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;