
import React from 'react';
import type { GeneratedImage } from '../types';
import { CopyIcon, TwitterIcon, FacebookIcon, CloseIcon } from './icons';

interface ShareModalProps {
  image: GeneratedImage;
  onClose: () => void;
  onNotify: (message: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ image, onClose, onNotify }) => {
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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg mx-auto shadow-2xl shadow-purple-500/10 p-6 relative animate-fade-in-scale" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Share this Creation</h2>
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={`data:image/jpeg;base64,${image.imageData}`} alt={image.prompt} className="w-full h-auto object-contain max-h-64" />
        </div>
        <p className="bg-gray-900/50 p-3 rounded-lg text-gray-300 text-sm mb-4">
          <span className="font-semibold text-gray-200">Prompt:</span> {image.prompt}
        </p>
        <div className="space-y-3">
           <button onClick={copyToClipboard} className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            <CopyIcon className="h-5 w-5" />
            <span>Copy Share Text</span>
          </button>
          <div className="grid grid-cols-2 gap-3">
             <button onClick={shareOnTwitter} className="w-full flex items-center justify-center space-x-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              <TwitterIcon className="h-5 w-5" />
              <span>Share on Twitter</span>
            </button>
             <button onClick={shareOnFacebook} className="w-full flex items-center justify-center space-x-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              <FacebookIcon className="h-5 w-5" />
              <span>Share on Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
