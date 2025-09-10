import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIRecommendations from './pages/ai-recommendations';
import FarmerDashboard from './pages/farmer-dashboard';
import WelcomeLanding from './pages/welcome-landing';
import UserAuthentication from './pages/user-authentication';
import DataInputForms from './pages/data-input-forms';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIRecommendations />} />
        <Route path="/ai-recommendations" element={<AIRecommendations />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/welcome-landing" element={<WelcomeLanding />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/data-input-forms" element={<DataInputForms />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
