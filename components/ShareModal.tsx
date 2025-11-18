
import React from 'react';
import { CopyIcon, TwitterIcon, FacebookIcon, CloseIcon } from './icons';

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

export default ShareModal;
