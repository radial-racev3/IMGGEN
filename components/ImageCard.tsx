
import React, { useState } from 'react';
import { DownloadIcon, ShareIcon, DeleteIcon, LoadingIcon } from './icons';
import ShareModal from './ShareModal';

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

export default ImageCard;
