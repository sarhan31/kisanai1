import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherSnapshot = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': 'Sun',
      'cloudy': 'Cloud',
      'rainy': 'CloudRain',
      'stormy': 'CloudLightning',
      'partly-cloudy': 'CloudSun'
    };
    return iconMap?.[condition] || 'Sun';
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Weather Snapshot</h3>
        <div className="text-sm text-muted-foreground">
          Last updated: {weatherData?.lastUpdated}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Temperature */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Thermometer" size={24} className="text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {weatherData?.temperature}°C
          </div>
          <div className="text-sm text-muted-foreground">Temperature</div>
          <div className="text-xs text-muted-foreground mt-1">
            Feels like {weatherData?.feelsLike}°C
          </div>
        </div>

        {/* Humidity */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Droplets" size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {weatherData?.humidity}%
          </div>
          <div className="text-sm text-muted-foreground">Humidity</div>
          <div className="text-xs text-muted-foreground mt-1">
            {weatherData?.humidity > 70 ? 'High' : weatherData?.humidity > 40 ? 'Moderate' : 'Low'}
          </div>
        </div>

        {/* Rainfall */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {weatherData?.rainfall}mm
          </div>
          <div className="text-sm text-muted-foreground">Today's Rain</div>
          <div className="text-xs text-muted-foreground mt-1">
            {weatherData?.condition?.replace('-', ' ')}
          </div>
        </div>
      </div>
      {/* Weather Alerts */}
      {weatherData?.alerts && weatherData?.alerts?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">Weather Alerts</h4>
          {weatherData?.alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-3 rounded-lg border ${getAlertBg(alert?.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name="AlertTriangle" 
                  size={16} 
                  className={`mt-0.5 ${getAlertColor(alert?.severity)}`} 
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-card-foreground">
                    {alert?.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Valid until: {alert?.validUntil}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Additional Weather Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <Icon name="Wind" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-card-foreground">
            {weatherData?.windSpeed} km/h
          </div>
          <div className="text-xs text-muted-foreground">Wind Speed</div>
        </div>
        <div className="text-center">
          <Icon name="Eye" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-card-foreground">
            {weatherData?.visibility} km
          </div>
          <div className="text-xs text-muted-foreground">Visibility</div>
        </div>
        <div className="text-center">
          <Icon name="Gauge" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-card-foreground">
            {weatherData?.pressure} hPa
          </div>
          <div className="text-xs text-muted-foreground">Pressure</div>
        </div>
        <div className="text-center">
          <Icon name="Sunrise" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-card-foreground">
            {weatherData?.uvIndex}
          </div>
          <div className="text-xs text-muted-foreground">UV Index</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSnapshot;