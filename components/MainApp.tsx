
import React, { useState, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { generateImages } from '../services/geminiService';
import { LogoIcon, LogoutIcon, GenerateIcon, LoadingIcon } from './icons';
import ImageCard from './ImageCard';

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
          isLoading && React.createElement(
            'div',
            { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4' },
            Array.from({ length: numImages }).map((_, index) =>
              React.createElement('div', { key: index, className: 'aspect-square bg-gray-800 rounded-lg animate-pulse' })
            )
          ),
          images.length > 0
            ? React.createElement(
                'div',
                { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
                images.map(image =>
                  React.createElement(ImageCard, { key: image.id, image: image, onDelete: handleDelete, onNotify: showNotification })
                )
              )
            : !isLoading && React.createElement(
                'div',
                { className: 'flex flex-col items-center justify-center text-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl py-20' },
                React.createElement(GenerateIcon, { className: 'h-16 w-16 text-gray-500 mb-4' }),
                React.createElement('h3', { className: 'text-xl font-semibold' }, 'Your gallery is empty'),
                React.createElement('p', { className: 'text-gray-400 mt-1' }, 'Start by creating your first image!')
              )
        )
      )
    )
  );
};

export default MainApp;
