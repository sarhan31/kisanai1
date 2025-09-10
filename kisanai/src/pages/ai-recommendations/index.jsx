import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileBottomNavigation from '../../components/ui/MobileBottomNavigation';
import ChatbotWidget from '../../components/ui/ChatbotWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IrrigationScheduleCard from './components/IrrigationScheduleCard';
import FertilizerRecommendationCard from './components/FertilizerRecommendationCard';
import PestDiseaseAlertCard from './components/PestDiseaseAlertCard';
import CropRotationCard from './components/CropRotationCard';
import RecommendationFilters from './components/RecommendationFilters';

const AIRecommendations = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    status: [],
    time: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for irrigation recommendations
  const irrigationRecommendations = [
    {
      id: 'irr-1',
      title: 'Morning Irrigation Schedule',
      cropType: 'Wheat',
      urgency: 'high',
      nextIrrigation: 'Tomorrow 6:00 AM',
      timeRemaining: 'In 14 hours',
      waterAmount: '25 mm',
      soilMoisture: 35,
      confidence: 92,
      schedule: [
        { date: 'Dec 11, 2024', time: '6:00 AM', amount: '25 mm', duration: '2 hours' },
        { date: 'Dec 14, 2024', time: '6:00 AM', amount: '20 mm', duration: '1.5 hours' },
        { date: 'Dec 17, 2024', time: '6:00 AM', amount: '30 mm', duration: '2.5 hours' }
      ],
      weatherNote: 'Clear skies expected for next 3 days. Optimal irrigation conditions with minimal evaporation loss.'
    },
    {
      id: 'irr-2',
      title: 'Drip Irrigation Optimization',
      cropType: 'Tomato',
      urgency: 'medium',
      nextIrrigation: 'Dec 12, 2024 7:00 AM',
      timeRemaining: 'In 2 days',
      waterAmount: '15 mm',
      soilMoisture: 45,
      confidence: 88,
      schedule: [
        { date: 'Dec 12, 2024', time: '7:00 AM', amount: '15 mm', duration: '1 hour' },
        { date: 'Dec 15, 2024', time: '7:00 AM', amount: '18 mm', duration: '1.2 hours' }
      ],
      weatherNote: 'Light rainfall expected on Dec 13. Adjust schedule accordingly to prevent overwatering.'
    }
  ];

  // Mock data for fertilizer recommendations
  const fertilizerRecommendations = [
    {
      id: 'fert-1',
      title: 'NPK Application for Growth Stage',
      cropType: 'Rice',
      growthStage: 'Tillering Stage',
      applicationWindow: 'optimal',
      applicationDate: 'Dec 12, 2024',
      daysFromNow: 'In 2 days',
      totalDosage: '120 kg/ha',
      confidence: 94,
      nutrients: [
        { name: 'Nitrogen', amount: '60', unit: 'kg/ha' },
        { name: 'Phosphorus', amount: '30', unit: 'kg/ha' },
        { name: 'Potassium', amount: '30', unit: 'kg/ha' }
      ],
      instructions: [
        'Apply fertilizer in the morning between 6-8 AM for better absorption',
        'Ensure soil moisture is adequate before application',
        'Mix fertilizer with soil to depth of 5-7 cm',
        'Water lightly after application to activate nutrients'
      ],
      benefits: [
        'Enhanced tillering and root development',
        'Improved nutrient uptake efficiency',
        'Better resistance to environmental stress',
        'Increased grain filling potential'
      ],
      estimatedCost: '2,400'
    },
    {
      id: 'fert-2',
      title: 'Organic Compost Application',
      cropType: 'Wheat',
      growthStage: 'Vegetative Stage',
      applicationWindow: 'good',
      applicationDate: 'Dec 15, 2024',
      daysFromNow: 'In 5 days',
      totalDosage: '5 tons/ha',
      confidence: 87,
      nutrients: [
        { name: 'Nitrogen', amount: '2.5', unit: '%' },
        { name: 'Phosphorus', amount: '1.2', unit: '%' },
        { name: 'Potassium', amount: '1.8', unit: '%' },
        { name: 'Calcium', amount: '3.2', unit: '%' }
      ],
      instructions: [
        'Spread compost evenly across the field',
        'Incorporate into soil using light tillage',
        'Apply during cool hours to prevent nutrient loss',
        'Ensure compost is well-decomposed before application'
      ],
      benefits: [
        'Improved soil organic matter content',
        'Enhanced water retention capacity',
        'Better soil structure and aeration',
        'Slow-release nutrient availability'
      ],
      estimatedCost: '3,200'
    }
  ];

  // Mock data for pest and disease alerts
  const pestDiseaseAlerts = [
    {
      id: 'pest-1',
      title: 'Brown Plant Hopper Infestation',
      cropType: 'Rice',
      affectedArea: '2.5 hectares',
      severity: 'critical',
      threatType: 'Brown Plant Hopper',
      scientificName: 'Nilaparvata lugens',
      actionRequired: 'Within 24 hours',
      confidence: 96,
      detectedDate: 'Dec 9, 2024',
      identificationImage: 'https://images.pexels.com/photos/8518309/pexels-photo-8518309.jpeg?auto=compress&cs=tinysrgb&w=800',
      symptoms: [
        'Yellowing and browning of rice leaves starting from tips',
        'Stunted plant growth and reduced tillering',
        'Honeydew secretion on leaf surfaces',
        'Presence of small brown insects on plant stems'
      ],
      treatments: [
        {
          method: 'Imidacloprid Spray',
          effectiveness: 'high',
          description: 'Systemic insecticide effective against sucking pests',
          dosage: '0.5 ml/liter',
          duration: '7-10 days',
          cost: '800'
        },
        {
          method: 'Neem Oil Application',
          effectiveness: 'medium',
          description: 'Organic treatment with repellent properties',
          dosage: '5 ml/liter',
          duration: '5-7 days',
          cost: '400'
        }
      ],
      preventiveMeasures: [
        'Maintain proper plant spacing for air circulation',
        'Remove alternate host plants from field borders',
        'Use yellow sticky traps for early detection',
        'Apply balanced fertilization to avoid excessive nitrogen'
      ],
      weatherImpact: 'High humidity and warm temperatures (25-30°C) favor rapid multiplication. Current weather conditions are conducive to pest development.'
    }
  ];

  // Mock data for crop rotation recommendations
  const cropRotationRecommendations = [
    {
      id: 'rot-1',
      title: 'Rice-Wheat-Legume Rotation',
      currentCrop: 'Rice',
      nextCrop: 'Wheat',
      rotationCycle: '3',
      nextPlantingDate: 'Dec 20, 2024',
      timeToPlant: 'In 10 days',
      yieldIncrease: '15',
      confidence: 91,
      rotationPlan: [
        { season: 'Kharif', crop: 'Rice', duration: 'Jun-Oct', expectedYield: '4.5 tons/ha' },
        { season: 'Rabi', crop: 'Wheat', duration: 'Dec-Apr', expectedYield: '3.8 tons/ha' },
        { season: 'Zaid', crop: 'Mung Bean', duration: 'May-Jul', expectedYield: '1.2 tons/ha' }
      ],
      companionCrops: [
        { name: 'Mustard', benefit: 'Pest deterrent' },
        { name: 'Coriander', benefit: 'Soil improvement' },
        { name: 'Fenugreek', benefit: 'Nitrogen fixation' }
      ],
      soilBenefits: [
        { type: 'soil', title: 'Nitrogen Fixation', description: 'Legumes add natural nitrogen', improvement: '25%' },
        { type: 'yield', title: 'Yield Stability', description: 'Reduced pest and disease pressure', improvement: '18%' },
        { type: 'water', title: 'Water Efficiency', description: 'Improved soil water retention', improvement: '12%' }
      ],
      timeline: [
        {
          phase: 'Land Preparation',
          duration: '10 days',
          startDate: 'Dec 10, 2024',
          description: 'Field clearing, plowing, and soil preparation',
          estimatedCost: '5,000'
        },
        {
          phase: 'Wheat Sowing',
          duration: '5 days',
          startDate: 'Dec 20, 2024',
          description: 'Seed treatment, sowing, and initial irrigation',
          estimatedCost: '8,000'
        },
        {
          phase: 'Crop Management',
          duration: '120 days',
          startDate: 'Dec 25, 2024',
          description: 'Regular monitoring, fertilization, and pest control',
          estimatedCost: '15,000'
        }
      ],
      totalInvestment: '28,000',
      expectedReturns: '45,000',
      roi: '61'
    }
  ];

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Get all recommendations based on category and filters
  const getAllRecommendations = () => {
    let allRecommendations = [];

    if (activeCategory === 'all' || activeCategory === 'irrigation') {
      allRecommendations?.push(...irrigationRecommendations?.map(item => ({ ...item, type: 'irrigation' })));
    }
    if (activeCategory === 'all' || activeCategory === 'fertilizer') {
      allRecommendations?.push(...fertilizerRecommendations?.map(item => ({ ...item, type: 'fertilizer' })));
    }
    if (activeCategory === 'all' || activeCategory === 'pest') {
      allRecommendations?.push(...pestDiseaseAlerts?.map(item => ({ ...item, type: 'pest' })));
    }
    if (activeCategory === 'all' || activeCategory === 'rotation') {
      allRecommendations?.push(...cropRotationRecommendations?.map(item => ({ ...item, type: 'rotation' })));
    }

    // Apply search filter
    if (searchQuery) {
      allRecommendations = allRecommendations?.filter(item =>
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.cropType?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    return allRecommendations;
  };

  const handleMarkComplete = (id) => {
    console.log('Marking recommendation as complete:', id);
    // Implementation for marking recommendation as complete
  };

  const handleScheduleReminder = (id) => {
    console.log('Scheduling reminder for:', id);
    // Implementation for scheduling reminder
  };

  const handleClearFilters = () => {
    setActiveFilters({
      priority: [],
      status: [],
      time: []
    });
  };

  const filteredRecommendations = getAllRecommendations();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Recommendations - KisanAI</title>
        <meta name="description" content="Get personalized AI-powered agricultural recommendations for irrigation, fertilization, pest control, and crop rotation to optimize your farm productivity." />
      </Helmet>
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Recommendations</h1>
                <p className="text-muted-foreground">Personalized agricultural guidance powered by artificial intelligence</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search recommendations by crop type, category, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                />
              </div>
              <Button variant="outline" size="default">
                <Icon name="Filter" size={20} />
                <span className="hidden sm:inline ml-2">Advanced Filters</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <RecommendationFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Urgent Actions</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-6">
            {filteredRecommendations?.length > 0 ? (
              filteredRecommendations?.map((recommendation) => {
                switch (recommendation?.type) {
                  case 'irrigation':
                    return (
                      <IrrigationScheduleCard
                        key={recommendation?.id}
                        recommendation={recommendation}
                        onMarkComplete={handleMarkComplete}
                        onScheduleReminder={handleScheduleReminder}
                      />
                    );
                  case 'fertilizer':
                    return (
                      <FertilizerRecommendationCard
                        key={recommendation?.id}
                        recommendation={recommendation}
                        onMarkComplete={handleMarkComplete}
                        onScheduleReminder={handleScheduleReminder}
                      />
                    );
                  case 'pest':
                    return (
                      <PestDiseaseAlertCard
                        key={recommendation?.id}
                        alert={recommendation}
                        onMarkComplete={handleMarkComplete}
                        onScheduleReminder={handleScheduleReminder}
                      />
                    );
                  case 'rotation':
                    return (
                      <CropRotationCard
                        key={recommendation?.id}
                        recommendation={recommendation}
                        onMarkComplete={handleMarkComplete}
                        onScheduleReminder={handleScheduleReminder}
                      />
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">No Recommendations Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `No recommendations match your search for "${searchQuery}"`
                    : 'No recommendations available for the selected filters'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    handleClearFilters();
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredRecommendations?.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                <Icon name="RefreshCw" size={20} />
                Load More Recommendations
              </Button>
            </div>
          )}
        </div>
      </main>
      <MobileBottomNavigation />
      <ChatbotWidget />
    </div>
  );
};

export default AIRecommendations;