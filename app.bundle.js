
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- START OF components/icons.js ---
const LogoIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' },
    React.createElement('path', { d: 'M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm3.41 12.59L12 11.17l-3.41 3.42-1.42-1.42L10.59 10 7.17 6.59l1.42-1.42L12 8.17l3.41-3.42 1.42 1.42L13.41 10l3.42 3.41-1.42 1.42z' })
  );

const LogoutIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' })
  );

const GenerateIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 3m5 5l-3-3m-4 12l3-3m-5-5l3 3M12 21a9 9 0 110-18 9 9 0 010 18z' })
  );

const LoadingIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' },
    React.createElement('circle', { className: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', strokeWidth: '4' }),
    React.createElement('path', { className: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' })
  );

const DownloadIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' })
  );

const ShareIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' })
  );

const DeleteIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
  );

const CopyIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' })
  );

const TwitterIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, viewBox: '0 0 24 24', fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg' },
    React.createElement('path', { d: 'M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.99-2.08z' })
  );

const FacebookIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, viewBox: '0 0 24 24', fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg' },
    React.createElement('path', { d: 'M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02s10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM16.5 12.06h-2.25v6h-3V12.06H9.5v-2.25h1.75V8.81c0-1.73 1.07-2.67 2.6-2.67.74 0 1.38.05 1.56.08v2.16h-1.28c-.84 0-1 .4-1 .98v1.27h2.25l-.28 2.25z' })
  );

const CloseIcon = ({ className }) =>
  React.createElement(
    'svg',
    { className: className, xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M6 18L18 6M6 6l12 12' })
  );

// --- START OF services/geminiService.js ---
const generateImages = async (prompt, numberOfImages, aspectRatio) => {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyB_GbARd5JzPeXmM1VPQwKZFH9tZa5PfDE" });

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: numberOfImages,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => img.image.imageBytes);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error generating images with Gemini:", error);
    throw new Error("Failed to generate images. Please check the console for details.");
  }
};

// --- START OF components/ErrorBoundary.js ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return React.createElement(
        'div',
        { style: { padding: '2rem', color: '#fca5a5', backgroundColor: '#450a0a', minHeight: '100vh', fontFamily: 'monospace', lineHeight: '1.6' } },
        React.createElement('h1', { style: { fontSize: '1.5rem', marginBottom: '1rem', color: '#f87171' } }, 'Application Error'),
        React.createElement('p', { style: { color: '#fda4af', marginBottom: '1rem'} }, 'An error occurred in a component. See details below:'),
        React.createElement(
          'pre',
          { style: { backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem' } },
          this.state.error && this.state.error.toString(),
          React.createElement('br', null),
          this.state.errorInfo && this.state.errorInfo.componentStack
        )
      );
    }
    return this.props.children;
  }
}

// --- START OF components/ShareModal.js ---
const ShareModal = ({ image, onClose, onNotify }) => {
  const pageUrl = window.location.href;
  const shareText = `Check out this image I generated with AI Image Studio! Prompt: "${image.prompt}"`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText + ` #AIImageStudio`);
    onNotify('Copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(twitterUrl, '_blank');
  };
  
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
  };

  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4', onClick: onClose },
    React.createElement(
      'div',
      { className: 'bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg mx-auto shadow-2xl shadow-purple-500/10 p-6 relative animate-fade-in-scale', onClick: e => e.stopPropagation() },
      React.createElement(
        'button',
        { onClick: onClose, className: 'absolute top-4 right-4 text-gray-400 hover:text-white', 'aria-label': 'Close modal' },
        React.createElement(CloseIcon, { className: 'h-6 w-6' })
      ),
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Share this Creation'),
      React.createElement(
        'div',
        { className: 'mb-4 rounded-lg overflow-hidden' },
        React.createElement('img', { src: `data:image/jpeg;base64,${image.imageData}`, alt: image.prompt, className: 'w-full h-auto object-contain max-h-64' })
      ),
      React.createElement(
        'p',
        { className: 'bg-gray-900/50 p-3 rounded-lg text-gray-300 text-sm mb-4' },
        React.createElement('span', { className: 'font-semibold text-gray-200' }, 'Prompt:'),
        ` ${image.prompt}`
      ),
      React.createElement(
        'div',
        { className: 'space-y-3' },
        React.createElement(
          'button',
          { onClick: copyToClipboard, className: 'w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors' },
          React.createElement(CopyIcon, { className: 'h-5 w-5' }),
          React.createElement('span', null, 'Copy Share Text')
        ),
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-3' },
          React.createElement(
            'button',
            { onClick: shareOnTwitter, className: 'w-full flex items-center justify-center space-x-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white font-semibold py-3 px-4 rounded-lg transition-colors' },
            React.createElement(TwitterIcon, { className: 'h-5 w-5' }),
            React.createElement('span', null, 'Share on Twitter')
          ),
          React.createElement(
            'button',
            { onClick: shareOnFacebook, className: 'w-full flex items-center justify-center space-x-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-3 px-4 rounded-lg transition-colors' },
            React.createElement(FacebookIcon, { className: 'h-5 w-5' }),
            React.createElement('span', null, 'Share on Facebook')
          )
        )
      )
    )
  );
};

// --- START OF components/ImageCard.js ---
const ImageCard = ({ image, onDelete, onNotify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageUrl = `data:image/jpeg;base64,${image.imageData}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${image.prompt.substring(0, 20).replace(/ /g, '_')}-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify('Image downloaded!');
  };

  const getAspectRatioClass = (ratio) => {
    switch(ratio) {
      case "16:9": return "aspect-[16/9]";
      case "9:16": return "aspect-[9/16]";
      case "4:3": return "aspect-[4/3]";
      case "3:4": return "aspect-[3/4]";
      default: return "aspect-square";
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: `group relative overflow-hidden rounded-2xl shadow-lg ${getAspectRatioClass(image.aspectRatio)}` },
      !isImageLoaded && React.createElement(
        'div',
        { className: "absolute inset-0 bg-gray-800 flex items-center justify-center" },
        React.createElement(LoadingIcon, { className: "h-8 w-8 text-gray-500 animate-spin" })
      ),
      React.createElement('img', {
        src: imageUrl,
        alt: image.prompt,
        className: `w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`,
        onLoad: () => setIsImageLoaded(true),
      }),
      React.createElement('div', { className: 'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' }),
      React.createElement(
        'div',
        { className: 'absolute bottom-0 left-0 p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300' },
        React.createElement('p', { className: 'text-sm text-gray-200 font-semibold line-clamp-2' }, image.prompt),
        React.createElement(
          'div',
          { className: 'flex justify-end items-center mt-3 space-x-2' },
          React.createElement(
            'button',
            { onClick: handleDownload, className: 'p-2 rounded-full bg-black/50 hover:bg-purple-600 transition-colors', 'aria-label': 'Download' },
            React.createElement(DownloadIcon, { className: 'h-5 w-5' })
          ),
          React.createElement(
            'button',
            { onClick: () => setIsModalOpen(true), className: 'p-2 rounded-full bg-black/50 hover:bg-purple-600 transition-colors', 'aria-label': 'Share' },
            React.createElement(ShareIcon, { className: 'h-5 w-5' })
          ),
          React.createElement(
            'button',
            { onClick: () => onDelete(image.id), className: 'p-2 rounded-full bg-black/50 hover:bg-red-500 transition-colors', 'aria-label': 'Delete' },
            React.createElement(DeleteIcon, { className: 'h-5 w-5' })
          )
        )
      )
    ),
    isModalOpen && React.createElement(ShareModal, { image: image, onClose: () => setIsModalOpen(false), onNotify: onNotify })
  );
};

// --- START OF hooks/useAuth.js ---
const AuthContext = createContext(null);
const USERS_KEY = 'ai_image_gen_users';
const GALLERIES_KEY = 'ai_image_gen_galleries';
const CURRENT_USER_KEY = 'ai_image_gen_current_user';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, pass) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username] && users[username] === pass) {
      const loggedInUser = { username };
      setUser(loggedInUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = (username, pass) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username]) {
      return false; // User already exists
    }
    users[username] = pass;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getGalleries = useCallback(() => {
    return JSON.parse(localStorage.getItem(GALLERIES_KEY) || '{}');
  }, []);
  
  const saveGalleries = useCallback((galleries) => {
    localStorage.setItem(GALLERIES_KEY, JSON.stringify(galleries));
  }, []);

  const saveImage = useCallback((image) => {
    if (!user) return;
    const galleries = getGalleries();
    if (!galleries[user.username]) {
      galleries[user.username] = [];
    }
    const newImage = {
      ...image,
      id: `img-${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    };
    galleries[user.username].unshift(newImage); // Add to the beginning
    saveGalleries(galleries);
  }, [user, getGalleries, saveGalleries]);

  const getImages = useCallback(() => {
    if (!user) return [];
    const galleries = getGalleries();
    return galleries[user.username] || [];
  }, [user, getGalleries]);
  
  const deleteImage = useCallback((id) => {
    if(!user) return;
    const galleries = getGalleries();
    if (galleries[user.username]) {
      galleries[user.username] = galleries[user.username].filter((img) => img.id !== id);
      saveGalleries(galleries);
    }
  }, [user, getGalleries, saveGalleries]);

  return React.createElement(
    AuthContext.Provider,
    {
      value: { user, login, register, logout, saveImage, getImages, deleteImage },
    },
    children
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- START OF components/LoginScreen.js ---
const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
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

  return React.createElement(
    'div',
    { className: 'flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4' },
    React.createElement(
      'div',
      { className: 'w-full max-w-md mx-auto' },
      React.createElement(
        'div',
        { className: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-8' },
        React.createElement(
          'div',
          { className: 'text-center mb-8' },
          React.createElement(
            'div',
            { className: 'inline-block bg-purple-500/20 p-3 rounded-full mb-4' },
            React.createElement(LogoIcon, { className: 'h-10 w-10 text-purple-400' })
          ),
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-100' }, 'AI Image Studio'),
          React.createElement(
            'p',
            { className: 'text-gray-400 mt-2' },
            isLogin ? 'Welcome back to your creative space' : 'Create an account to start generating'
          )
        ),
        React.createElement(
          'form',
          { onSubmit: handleSubmit, className: 'space-y-6' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { className: 'text-sm font-medium text-gray-400 block mb-2', htmlFor: 'username' },
              'Username'
            ),
            React.createElement('input', {
              id: 'username',
              type: 'text',
              value: username,
              onChange: (e) => setUsername(e.target.value),
              className: 'w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition',
              placeholder: 'e.g., CreativeCat',
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { className: 'text-sm font-medium text-gray-400 block mb-2', htmlFor: 'password' },
              'Password'
            ),
            React.createElement('input', {
              id: 'password',
              type: 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: 'w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition',
              placeholder: '••••••••',
            })
          ),
          error && React.createElement('p', { className: 'text-red-400 text-sm text-center' }, error),
          React.createElement(
            'button',
            {
              type: 'submit',
              className: 'w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-purple-600/20',
            },
            isLogin ? 'Log In' : 'Create Account'
          )
        ),
        React.createElement(
          'p',
          { className: 'text-center text-gray-400 mt-6 text-sm' },
          isLogin ? "Don't have an account?" : 'Already have an account?',
          React.createElement(
            'button',
            { onClick: () => { setIsLogin(!isLogin); setError(''); }, className: 'font-semibold text-purple-400 hover:text-purple-300 ml-1' },
            isLogin ? 'Sign Up' : 'Log In'
          )
        )
      )
    )
  );
};

// --- START OF components/MainApp.js ---
const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const imageCounts = [1, 2, 3, 4];

const MainApp = () => {
  const { user, logout, saveImage, getImages, deleteImage } = useAuth();
  const [images, setImages] = useState(getImages());
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [numImages, setNumImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const newImageDatas = await generateImages(prompt, numImages, aspectRatio);
      newImageDatas.forEach(imageData => {
        saveImage({ prompt, aspectRatio, imageData });
      });
      setImages(getImages());
      setPrompt('');
      showNotification(`${newImageDatas.length} new image(s) generated!`);
    } catch (e) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback((id) => {
    deleteImage(id);
    setImages(getImages());
    showNotification('Image deleted.');
  }, [deleteImage, getImages]);

  const renderGalleryContent = () => {
    if (isLoading) {
      return React.createElement(
        'div',
        { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4' },
        Array.from({ length: numImages }).map((_, index) =>
          React.createElement('div', { key: index, className: 'aspect-square bg-gray-800 rounded-lg animate-pulse' })
        )
      );
    }
    
    if (images.length > 0) {
      return React.createElement(
        'div',
        { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
        images.map(image =>
          React.createElement(ImageCard, { key: image.id, image: image, onDelete: handleDelete, onNotify: showNotification })
        )
      );
    }

    // Not loading and no images
    return React.createElement(
      'div',
      { className: 'flex flex-col items-center justify-center text-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl py-20' },
      React.createElement(GenerateIcon, { className: 'h-16 w-16 text-gray-500 mb-4' }),
      React.createElement('h3', { className: 'text-xl font-semibold' }, 'Your gallery is empty'),
      React.createElement('p', { className: 'text-gray-400 mt-1' }, 'Start by creating your first image!')
    );
  };

  return React.createElement(
    'div',
    { className: 'flex flex-col min-h-screen bg-gray-900' },
    notification && React.createElement(
      'div',
      { className: 'fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out' },
      notification
    ),
    React.createElement(
      'header',
      { className: 'sticky top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 z-10 px-4 sm:px-6 lg:px-8' },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between h-16' },
        React.createElement(
          'div',
          { className: 'flex items-center space-x-3' },
          React.createElement(LogoIcon, { className: 'h-8 w-8 text-purple-400' }),
          React.createElement('span', { className: 'text-xl font-bold' }, 'AI Image Studio')
        ),
        React.createElement(
          'div',
          { className: 'flex items-center space-x-4' },
          React.createElement(
            'span',
            { className: 'text-gray-400 hidden sm:block' },
            'Welcome, ',
            React.createElement('span', { className: 'font-bold text-gray-200' }, user?.username)
          ),
          React.createElement(
            'button',
            {
              onClick: logout,
              className: 'flex items-center space-x-2 bg-gray-700 hover:bg-red-500/80 text-white font-semibold py-2 px-3 rounded-lg transition-colors',
              'aria-label': 'Logout',
            },
            React.createElement(LogoutIcon, { className: 'h-5 w-5' }),
            React.createElement('span', { className: 'hidden md:inline' }, 'Logout')
          )
        )
      )
    ),
    React.createElement(
      'main',
      { className: 'flex-grow container mx-auto p-4 sm:p-6 lg:p-8' },
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 lg:grid-cols-12 gap-8' },
        React.createElement(
          'div',
          { className: 'lg:col-span-4 xl:col-span-3' },
          React.createElement(
            'div',
            { className: 'sticky top-24 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6' },
            React.createElement('h2', { className: 'text-2xl font-bold' }, 'Create your vision'),
            React.createElement(
              'div',
              null,
              React.createElement('label', { htmlFor: 'prompt', className: 'block text-sm font-medium text-gray-400 mb-2' }, 'Prompt'),
              React.createElement('textarea', {
                id: 'prompt',
                rows: 4,
                value: prompt,
                onChange: (e) => setPrompt(e.target.value),
                className: 'w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition',
                placeholder: 'e.g., A cinematic shot of a raccoon in a library, epic lighting',
              })
            ),
            React.createElement(
              'div',
              null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-400 mb-2' }, 'Aspect Ratio'),
              React.createElement(
                'div',
                { className: 'grid grid-cols-3 gap-2' },
                aspectRatios.map(ratio =>
                  React.createElement(
                    'button',
                    { key: ratio, onClick: () => setAspectRatio(ratio), className: `py-2 px-1 text-xs sm:text-sm font-semibold rounded-lg transition ${aspectRatio === ratio ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}` },
                    ratio
                  )
                )
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-400 mb-2' }, 'Number of Images'),
              React.createElement(
                'div',
                { className: 'grid grid-cols-4 gap-2' },
                imageCounts.map(count =>
                  React.createElement(
                    'button',
                    { key: count, onClick: () => setNumImages(count), className: `py-2 px-1 text-sm font-semibold rounded-lg transition ${numImages === count ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}` },
                    count
                  )
                )
              )
            ),
            error && React.createElement('p', { className: 'text-red-400 text-sm' }, error),
            React.createElement(
              'button',
              {
                onClick: handleGenerate,
                disabled: isLoading,
                className: 'w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-purple-600/20 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed',
              },
              isLoading
                ? React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(LoadingIcon, { className: 'h-5 w-5 mr-2 animate-spin' }),
                    'Generating...'
                  )
                : React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(GenerateIcon, { className: 'h-5 w-5 mr-2' }),
                    'Generate'
                  )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'lg:col-span-8 xl:col-span-9' },
          React.createElement(
            'div',
            { className: 'mb-4' },
            React.createElement('h2', { className: 'text-2xl font-bold' }, 'Your Gallery'),
            React.createElement('p', { className: 'text-gray-400' }, `${images.length} image(s) created`)
          ),
          renderGalleryContent()
        )
      )
    )
  );
};

// --- START OF App.js ---
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

// --- START OF index.js ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      ErrorBoundary,
      null,
      React.createElement(App, null)
    )
  )
);
