
import React, { useState, FormEvent } from 'react';
import useAuth from '../hooks/useAuth';
import { LogoIcon } from './icons';

const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password cannot be empty.');
      return;
    }

    let success = false;
    if (isLogin) {
      success = login(username, password);
      if (!success) {
        setError('Invalid username or password.');
      }
    } else {
      success = register(username, password);
      if (!success) {
        setError('Username already taken.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-500/20 p-3 rounded-full mb-4">
              <LogoIcon className="h-10 w-10 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-100">AI Image Studio</h1>
            <p className="text-gray-400 mt-2">
              {isLogin ? 'Welcome back to your creative space' : 'Create an account to start generating'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                placeholder="e.g., CreativeCat"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-purple-600/20"
            >
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold text-purple-400 hover:text-purple-300 ml-1">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
