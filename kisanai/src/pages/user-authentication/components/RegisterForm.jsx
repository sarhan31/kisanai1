import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegisterForm = ({ currentLanguage, onLanguageChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    language: currentLanguage
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const content = {
    en: {
      title: 'Create Account',
      subtitle: 'Join KisanAI to revolutionize your farming',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a strong password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      roleLabel: 'Select Role',
      rolePlaceholder: 'Choose your role',
      languageLabel: 'Preferred Language',
      languagePlaceholder: 'Select your language',
      createAccountButton: 'Create Account',
      orText: 'Or continue with',
      googleButton: 'Continue with Google',
      roles: {
        farmer: 'Farmer',
        expert: 'Agricultural Expert'
      },
      languages: {
        en: 'English',
        hi: 'हिंदी (Hindi)',
        gu: 'ગુજરાતી (Gujarati)',
        pa: 'ਪੰਜਾਬੀ (Punjabi)',
        or: 'ଓଡ଼ିଆ (Odia)'
      },
      passwordStrength: {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong'
      },
      errors: {
        name: 'Name is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        password: 'Password must be at least 8 characters',
        confirmPassword: 'Passwords do not match',
        role: 'Please select your role',
        language: 'Please select your preferred language'
      }
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'अपनी खेती में क्रांति लाने के लिए KisanAI में शामिल हों',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      phoneLabel: 'फोन नंबर',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'एक मजबूत पासवर्ड बनाएं',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      roleLabel: 'भूमिका चुनें',
      rolePlaceholder: 'अपनी भूमिका चुनें',
      languageLabel: 'पसंदीदा भाषा',
      languagePlaceholder: 'अपनी भाषा चुनें',
      createAccountButton: 'खाता बनाएं',
      orText: 'या इसके साथ जारी रखें',
      googleButton: 'Google के साथ जारी रखें',
      roles: {
        farmer: 'किसान',
        expert: 'कृषि विशेषज्ञ'
      },
      languages: {
        en: 'English',
        hi: 'हिंदी (Hindi)',
        gu: 'ગુજરાતી (Gujarati)',
        pa: 'ਪੰਜਾਬੀ (Punjabi)',
        or: 'ଓଡ଼ିଆ (Odia)'
      },
      passwordStrength: {
        weak: 'कमजोर',
        fair: 'ठीक',
        good: 'अच्छा',
        strong: 'मजबूत'
      },
      errors: {
        name: 'नाम आवश्यक है',
        email: 'कृपया एक वैध ईमेल पता दर्ज करें',
        phone: 'कृपया एक वैध फोन नंबर दर्ज करें',
        password: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
        confirmPassword: 'पासवर्ड मेल नहीं खाते',
        role: 'कृपया अपनी भूमिका चुनें',
        language: 'कृपया अपनी पसंदीदा भाषा चुनें'
      }
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const roleOptions = [
    { value: 'farmer', label: t?.roles?.farmer },
    { value: 'expert', label: t?.roles?.expert }
  ];

  const languageOptions = [
    { value: 'en', label: t?.languages?.en },
    { value: 'hi', label: t?.languages?.hi },
    { value: 'gu', label: t?.languages?.gu },
    { value: 'pa', label: t?.languages?.pa },
    { value: 'or', label: t?.languages?.or }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 1) return t?.passwordStrength?.weak;
    if (strength <= 2) return t?.passwordStrength?.fair;
    if (strength <= 3) return t?.passwordStrength?.good;
    return t?.passwordStrength?.strong;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-destructive';
    if (strength <= 2) return 'bg-warning';
    if (strength <= 3) return 'bg-primary';
    return 'bg-success';
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (name === 'language') {
      onLanguageChange(value);
    }
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'language') {
      onLanguageChange(value);
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = t?.errors?.name;
    }
    
    if (!formData?.email) {
      newErrors.email = t?.errors?.email;
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = t?.errors?.email;
    }
    
    if (!formData?.phone) {
      newErrors.phone = t?.errors?.phone;
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = t?.errors?.phone;
    }
    
    if (!formData?.password || formData?.password?.length < 8) {
      newErrors.password = t?.errors?.password;
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = t?.errors?.confirmPassword;
    }
    
    if (!formData?.role) {
      newErrors.role = t?.errors?.role;
    }
    
    if (!formData?.language) {
      newErrors.language = t?.errors?.language;
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
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: formData?.email,
        name: formData?.name,
        phone: formData?.phone,
        role: formData?.role,
        language: formData?.language,
        isAuthenticated: true
      }));
      
      // Navigate to dashboard
      navigate('/farmer-dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleGoogleRegister = () => {
    // Mock Google OAuth
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'farmer',
        language: currentLanguage,
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={t?.nameLabel}
          type="text"
          name="name"
          placeholder={t?.namePlaceholder}
          value={formData?.name}
          onChange={handleInputChange}
          error={errors?.name}
          required
        />

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
          label={t?.phoneLabel}
          type="tel"
          name="phone"
          placeholder={t?.phonePlaceholder}
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
        />

        <div>
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
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
            </div>
          )}
        </div>

        <Input
          label={t?.confirmPasswordLabel}
          type="password"
          name="confirmPassword"
          placeholder={t?.confirmPasswordPlaceholder}
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />

        <Select
          label={t?.roleLabel}
          placeholder={t?.rolePlaceholder}
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleSelectChange('role', value)}
          error={errors?.role}
          required
        />

        <Select
          label={t?.languageLabel}
          placeholder={t?.languagePlaceholder}
          options={languageOptions}
          value={formData?.language}
          onChange={(value) => handleSelectChange('language', value)}
          error={errors?.language}
          required
        />

        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {t?.createAccountButton}
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
          onClick={handleGoogleRegister}
          iconName="Chrome"
          iconPosition="left"
          className="mt-4 h-12"
        >
          {t?.googleButton}
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;