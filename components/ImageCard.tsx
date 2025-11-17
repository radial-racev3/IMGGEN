
import React, { useState } from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon, ShareIcon, DeleteIcon, LoadingIcon } from './icons';
import ShareModal from './ShareModal';

interface ImageCardProps {
  image: GeneratedImage;
  onDelete: (id: string) => void;
  onNotify: (message: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete, onNotify }) => {
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

  const getAspectRatioClass = (ratio: string) => {
    switch(ratio) {
      case "16:9": return "aspect-[16/9]";
      case "9:16": return "aspect-[9/16]";
      case "4:3": return "aspect-[4/3]";
      case "3:4": return "aspect-[3/4]";
      default: return "aspect-square";
    }
  };

  return (
    <>
      <div className={`group relative overflow-hidden rounded-2xl shadow-lg ${getAspectRatioClass(image.aspectRatio)}`}>
        {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <LoadingIcon className="h-8 w-8 text-gray-500 animate-spin" />
            </div>
        )}
        <img
          src={imageUrl}
          alt={image.prompt}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-gray-200 font-semibold line-clamp-2">{image.prompt}</p>
          <div className="flex justify-end items-center mt-3 space-x-2">
            <button onClick={handleDownload} className="p-2 rounded-full bg-black/50 hover:bg-purple-600 transition-colors" aria-label="Download">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full bg-black/50 hover:bg-purple-600 transition-colors" aria-label="Share">
              <ShareIcon className="h-5 w-5" />
            </button>
            <button onClick={() => onDelete(image.id)} className="p-2 rounded-full bg-black/50 hover:bg-red-500 transition-colors" aria-label="Delete">
              <DeleteIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <ShareModal image={image} onClose={() => setIsModalOpen(false)} onNotify={onNotify} />}
    </>
  );
};

export default ImageCard;
