
import React from 'react';
import useAuth, { AuthProvider } from './hooks/useAuth.js';
import LoginScreen from './components/LoginScreen.js';
import MainApp from './components/MainApp.js';

const AppContent = () => {
  const { user } = useAuth();

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-900 text-gray-100 font-sans' },
    user ? React.createElement(MainApp, null) : React.createElement(LoginScreen, null)
  );
};

const App = () => {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(AppContent, null)
  );
};

export default App;