import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import OnboardingScreen from './screens/OnboardingScreen';
import MeshHomeScreen from './screens/MeshHomeScreen';
import SendMessageScreen from './screens/SendMessageScreen';
import PeerListScreen from './screens/PeerListScreen';
import StressTestScreen from './screens/StressTestScreen';

// Mock localStorage for AsyncStorage
const AsyncStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

function AppRouter() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(seen !== 'true');
      } catch (error) {
        console.log('Error checking onboarding:', error);
        setShowOnboarding(true);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading || showOnboarding === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#020617'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #3B82F6',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/onboarding" 
        element={<OnboardingScreen />} 
      />
      <Route 
        path="/home" 
        element={<MeshHomeScreen />} 
      />
      <Route 
        path="/send" 
        element={<SendMessageScreen />} 
      />
      <Route 
        path="/peers" 
        element={<PeerListScreen />} 
      />
      <Route 
        path="/stress" 
        element={<StressTestScreen />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={showOnboarding ? '/onboarding' : '/home'} replace />} 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

