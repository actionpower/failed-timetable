import React from 'react';
import { Image, SortOrder } from '../types';
import { Link } from 'react-router-dom';

interface ImageGridProps {
  images: Image[];
  sortOrder: SortOrder;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, sortOrder }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <Link to={`/detail/${image.id}`} key={image.id} className="block">
          <div className="border rounded-lg overflow-hidden">
            <img src={image.url} alt="Timetable" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500">Likes: {image.likes_count}</p>
              <p className="text-sm text-gray-500">
                {new Date(image.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ImageGrid;