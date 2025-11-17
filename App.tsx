
import React from 'react';
import useAuth from './hooks/useAuth';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import { AuthProvider } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {user ? <MainApp /> : <LoginScreen />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
