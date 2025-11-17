
import React, { useState, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { generateImages } from '../services/geminiService';
import type { GeneratedImage } from '../types';
import { LogoIcon, LogoutIcon, GenerateIcon, LoadingIcon, DeleteIcon } from './icons';
import ImageCard from './ImageCard';

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const imageCounts = [1, 2, 3, 4];

const MainApp: React.FC = () => {
  const { user, logout, saveImage, getImages, deleteImage } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>(getImages());
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [numImages, setNumImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
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
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback((id: string) => {
    deleteImage(id);
    setImages(getImages());
    showNotification('Image deleted.');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteImage, getImages]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold">AI Image Studio</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 hidden sm:block">Welcome, <span className="font-bold text-gray-200">{user?.username}</span></span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-red-500/80 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
              aria-label="Logout"
            >
              <LogoutIcon className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6">
              <h2 className="text-2xl font-bold">Create your vision</h2>
              
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">Prompt</label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="e.g., A cinematic shot of a raccoon in a library, epic lighting"
                />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
                 <div className="grid grid-cols-3 gap-2">
                   {aspectRatios.map(ratio => (
                     <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 px-1 text-xs sm:text-sm font-semibold rounded-lg transition ${aspectRatio === ratio ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{ratio}</button>
                   ))}
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Number of Images</label>
                <div className="grid grid-cols-4 gap-2">
                  {imageCounts.map(count => (
                    <button key={count} onClick={() => setNumImages(count)} className={`py-2 px-1 text-sm font-semibold rounded-lg transition ${numImages === count ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{count}</button>
                  ))}
                </div>
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-purple-600/20 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <LoadingIcon className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <GenerateIcon className="h-5 w-5 mr-2" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Your Gallery</h2>
              <p className="text-gray-400">{images.length} image(s) created</p>
            </div>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {Array.from({ length: numImages }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
                ))}
              </div>
            )}
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map(image => (
                  <ImageCard key={image.id} image={image} onDelete={handleDelete} onNotify={showNotification} />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="flex flex-col items-center justify-center text-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-2xl py-20">
                  <GenerateIcon className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold">Your gallery is empty</h3>
                  <p className="text-gray-400 mt-1">Start by creating your first image!</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainApp;
