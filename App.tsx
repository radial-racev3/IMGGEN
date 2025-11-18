
import React from 'react';
import useAuth from './hooks/useAuth';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import { AuthProvider } from './hooks/useAuth';

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
