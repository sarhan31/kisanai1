import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileBottomNavigation from '../../components/ui/MobileBottomNavigation';
import ChatbotWidget from '../../components/ui/ChatbotWidget';
import CropYieldCard from './components/CropYieldCard';
import WeatherSnapshot from './components/WeatherSnapshot';
import SoilHealthMonitoring from './components/SoilHealthMonitoring';
import FarmLocationMap from './components/FarmLocationMap';
import AIRecommendationsPanel from './components/AIRecommendationsPanel';
import QuickNavigationTiles from './components/QuickNavigationTiles';
import AlertNotifications from './components/AlertNotifications';

const FarmerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Mock data for crop yield predictions
  const cropYieldData = [
    {
      id: 1,
      name: "Wheat",
      variety: "HD-2967",
      predictedYield: 4.2,
      confidence: 87,
      trend: 12,
      harvestDate: "Mar 2025",
      trendData: [
        { month: 'Oct', yield: 3.8 },
        { month: 'Nov', yield: 4.0 },
        { month: 'Dec', yield: 4.1 },
        { month: 'Jan', yield: 4.2 },
        { month: 'Feb', yield: 4.3 },
        { month: 'Mar', yield: 4.2 }
      ]
    },
    {
      id: 2,
      name: "Rice",
      variety: "Basmati-1121",
      predictedYield: 5.8,
      confidence: 92,
      trend: 8,
      harvestDate: "Oct 2024",
      trendData: [
        { month: 'Jun', yield: 5.2 },
        { month: 'Jul', yield: 5.4 },
        { month: 'Aug', yield: 5.6 },
        { month: 'Sep', yield: 5.7 },
        { month: 'Oct', yield: 5.8 }
      ]
    },
    {
      id: 3,
      name: "Cotton",
      variety: "Bt-Cotton",
      predictedYield: 2.1,
      confidence: 74,
      trend: -5,
      harvestDate: "Dec 2024",
      trendData: [
        { month: 'Jul', yield: 2.3 },
        { month: 'Aug', yield: 2.2 },
        { month: 'Sep', yield: 2.1 },
        { month: 'Oct', yield: 2.0 },
        { month: 'Nov', yield: 2.1 },
        { month: 'Dec', yield: 2.1 }
      ]
    }
  ];

  // Mock weather data
  const weatherData = {
    temperature: 28,
    feelsLike: 32,
    humidity: 65,
    rainfall: 2.5,
    condition: 'partly-cloudy',
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    uvIndex: 6,
    lastUpdated: '10 mins ago',
    alerts: [
      {
        id: 1,
        title: 'Heavy Rainfall Warning',
        message: 'Expect heavy rainfall in the next 24-48 hours. Consider postponing field activities.',
        severity: 'high',
        validUntil: 'Sep 12, 2025'
      },
      {
        id: 2,
        title: 'High Temperature Alert',
        message: 'Temperature may reach 35°C today. Ensure adequate irrigation for crops.',
        severity: 'medium',
        validUntil: 'Sep 10, 2025'
      }
    ]
  };

  // Mock soil health data
  const soilHealthData = {
    fields: [
      {
        id: 'field-1',
        name: 'North Field',
        ph: 6.8,
        moisture: 55,
        lastTested: 'Sep 5, 2025',
        nutrients: [
          { name: 'Nitrogen', value: 28 },
          { name: 'Phosphorus', value: 22 },
          { name: 'Potassium', value: 180 }
        ],
        recommendations: [
          {
            title: 'Increase Nitrogen Levels',
            description: 'Apply 50kg/hectare of urea fertilizer to boost nitrogen content for better crop growth.',
            priority: 'medium'
          },
          {
            title: 'Monitor pH Levels',
            description: 'pH is slightly alkaline. Consider adding organic matter to balance soil acidity.',
            priority: 'low'
          }
        ]
      },
      {
        id: 'field-2',
        name: 'South Field',
        ph: 7.2,
        moisture: 42,
        lastTested: 'Sep 3, 2025',
        nutrients: [
          { name: 'Nitrogen', value: 35 },
          { name: 'Phosphorus', value: 18 },
          { name: 'Potassium', value: 220 }
        ],
        recommendations: [
          {
            title: 'Improve Irrigation',
            description: 'Soil moisture is below optimal levels. Increase irrigation frequency.',
            priority: 'high'
          }
        ]
      }
    ]
  };

  // Mock farm locations data
  const farmLocations = [
    {
      id: 'loc-1',
      name: 'North Field',
      cropType: 'Wheat',
      area: 5.2,
      soilType: 'Loamy',
      irrigationType: 'Drip',
      status: 'Healthy',
      lastVisited: '2 days ago',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      notes: 'Recently applied fertilizer. Growth looking good.'
    },
    {
      id: 'loc-2',
      name: 'South Field',
      cropType: 'Rice',
      area: 3.8,
      soilType: 'Clay',
      irrigationType: 'Flood',
      status: 'Needs Attention',
      lastVisited: '1 week ago',
      coordinates: { lat: 28.6129, lng: 77.2080 },
      notes: 'Some pest activity observed. Need to monitor closely.'
    },
    {
      id: 'loc-3',
      name: 'East Field',
      cropType: 'Cotton',
      area: 4.5,
      soilType: 'Sandy Loam',
      irrigationType: 'Sprinkler',
      status: 'Critical',
      lastVisited: '3 days ago',
      coordinates: { lat: 28.6149, lng: 77.2100 },
      notes: 'Drought stress visible. Immediate irrigation required.'
    }
  ];

  // Mock AI recommendations data
  const aiRecommendations = [
    {
      id: 'rec-1',
      category: 'irrigation',
      title: 'Optimize Irrigation Schedule',
      description: 'Based on soil moisture and weather forecast, adjust irrigation timing for maximum efficiency.',
      priority: 'high',
      confidence: 89,
      timing: 'Next 2 days',
      actions: ['Schedule irrigation', 'Check soil moisture'],
      details: [
        'Water early morning (5-7 AM) to reduce evaporation',
        'Apply 25mm of water per session',
        'Monitor soil moisture at 15cm depth',
        'Avoid watering during peak sun hours'
      ],
      expectedOutcome: 'Reduce water usage by 20% while maintaining optimal soil moisture levels',
      resources: ['Drip irrigation system', 'Soil moisture sensor', '500L water tank']
    },
    {
      id: 'rec-2',
      category: 'fertilizer',
      title: 'Apply Nitrogen Fertilizer',
      description: 'Nitrogen levels are below optimal range. Apply urea fertilizer to boost crop growth.',
      priority: 'medium',
      confidence: 82,
      timing: 'Within 1 week',
      actions: ['Purchase urea', 'Apply fertilizer', 'Monitor growth'],
      details: [
        'Apply 50kg/hectare of urea (46% N)',
        'Split application into 2 doses',
        'Apply during cool weather conditions',
        'Water immediately after application'
      ],
      expectedOutcome: 'Increase crop yield by 15-20% and improve plant health',
      resources: ['Urea fertilizer (100kg)', 'Spreader equipment', 'Protective gear']
    },
    {
      id: 'rec-3',
      category: 'pest',
      title: 'Monitor for Aphid Infestation',
      description: 'Weather conditions favor aphid development. Implement preventive measures.',
      priority: 'medium',
      confidence: 76,
      timing: 'Immediate',
      actions: ['Field inspection', 'Apply neem oil', 'Set sticky traps'],
      details: [
        'Inspect plants daily for aphid colonies',
        'Apply neem oil spray in evening hours',
        'Use yellow sticky traps to monitor population',
        'Consider beneficial insects if infestation spreads'
      ],
      expectedOutcome: 'Prevent crop damage and maintain healthy plant growth',
      resources: ['Neem oil', 'Sprayer', 'Yellow sticky traps', 'Magnifying glass']
    },
    {
      id: 'rec-4',
      category: 'harvest',
      title: 'Prepare for Wheat Harvest',
      description: 'Wheat crop will be ready for harvest in 3-4 weeks. Start preparation activities.',
      priority: 'low',
      confidence: 94,
      timing: '3-4 weeks',
      actions: ['Book harvester', 'Prepare storage', 'Check moisture'],
      details: [
        'Book combine harvester in advance',
        'Clean and prepare storage facilities',
        'Monitor grain moisture content',
        'Arrange transportation for grain'
      ],
      expectedOutcome: 'Ensure timely harvest with minimal post-harvest losses',
      resources: ['Combine harvester', 'Storage bags', 'Moisture meter', 'Transport vehicle']
    }
  ];

  // Mock alert notifications data
  const alertNotifications = [
    {
      id: 'alert-1',
      type: 'weather',
      severity: 'critical',
      title: 'Severe Weather Warning',
      message: 'Thunderstorm with hail expected tonight. Protect sensitive crops and equipment.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      location: 'All Fields',
      validUntil: 'Sep 11, 2025 6:00 AM',
      read: false,
      actions: [
        'Cover sensitive crops with protective sheets',
        'Secure loose equipment and tools',
        'Check drainage systems for proper water flow',
        'Monitor weather updates regularly'
      ],
      details: 'Strong winds up to 60 km/h with possibility of hail stones. Take immediate protective measures.'
    },
    {
      id: 'alert-2',
      type: 'pest',
      severity: 'high',
      title: 'Pest Activity Detected',
      message: 'Increased aphid activity detected in South Field. Immediate action recommended.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: 'South Field',
      read: false,
      actions: [
        'Apply neem oil spray immediately',
        'Increase field monitoring frequency',
        'Consider biological control agents',
        'Document pest population levels'
      ],
      details: 'Aphid colonies found on 15% of plants. Early intervention can prevent widespread infestation.'
    },
    {
      id: 'alert-3',
      type: 'system',
      severity: 'medium',
      title: 'Irrigation System Maintenance',
      message: 'Scheduled maintenance for drip irrigation system due this week.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      location: 'North Field',
      read: true,
      actions: [
        'Schedule maintenance appointment',
        'Check all drip lines for blockages',
        'Replace worn-out emitters',
        'Test system pressure and flow rates'
      ],
      details: 'Regular maintenance ensures optimal irrigation efficiency and prevents system failures.'
    },
    {
      id: 'alert-4',
      type: 'weather',
      severity: 'low',
      title: 'Favorable Growing Conditions',
      message: 'Optimal temperature and humidity levels expected for the next 5 days.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      location: 'All Fields',
      read: true,
      actions: [
        'Continue regular irrigation schedule',
        'Monitor crop growth progress',
        'Plan field activities for optimal conditions'
      ],
      details: 'Temperature range 22-28°C with 60-70% humidity provides ideal growing conditions.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pb-20 lg:pb-6`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Rajesh! Here's your farm overview for today.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </div>
          </div>

          {/* Crop Yield Predictions */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Crop Yield Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cropYieldData?.map((crop) => (
                <CropYieldCard key={crop?.id} crop={crop} />
              ))}
            </div>
          </section>

          {/* Weather and Alerts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <WeatherSnapshot weatherData={weatherData} />
            <AlertNotifications alerts={alertNotifications} />
          </div>

          {/* Soil Health Monitoring */}
          <section>
            <SoilHealthMonitoring soilData={soilHealthData} />
          </section>

          {/* Farm Location Map */}
          <section>
            <FarmLocationMap farmLocations={farmLocations} />
          </section>

          {/* AI Recommendations */}
          <section>
            <AIRecommendationsPanel recommendations={aiRecommendations} />
          </section>

          {/* Quick Navigation */}
          <section>
            <QuickNavigationTiles />
          </section>
        </div>
      </main>
      <MobileBottomNavigation />
      <ChatbotWidget />
    </div>
  );
};

export default FarmerDashboard;