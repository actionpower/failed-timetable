import React from 'react';
import { Image } from '../types';

interface ImageDetailProps {
  image: Image;
  onLike: () => void;
}

const ImageDetail: React.FC<ImageDetailProps> = ({ image, onLike }) => {
  return (
    <div>
      <img src={image.url} alt="Timetable" className="w-full max-w-2xl mx-auto" />
      <div className="mt-4">
        <p>Likes: {image.likes_count}</p>
        <p>Uploaded: {new Date(image.created_at).toLocaleDateString()}</p>
        <button onClick={onLike} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          좋아요
        </button>
      </div>
    </div>
  );
};

export default ImageDetail;