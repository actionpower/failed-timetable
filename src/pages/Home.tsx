import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Image, SortOrder } from '../types';
import ImageGrid from '../components/ImageGrid';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('likes');
  const navigate = useNavigate();
  useEffect(() => {
    fetchImages();
  }, [sortOrder]);

  const fetchImages = async () => {
    let query = supabase
      .from('images')
      .select('*')
      .order(sortOrder === 'likes' ? 'likes_count' : 'created_at', {
        ascending: false,
      })
      .limit(20);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data || []);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">망한 시간표 경진대회</h1>
      <button onClick={() => navigate('/upload')}>업로드</button>
      <div className="mb-4">
        <button
          className={`mr-2 ${sortOrder === 'likes' ? 'font-bold' : ''}`}
          onClick={() => setSortOrder('likes')}
        >
          좋아요 순
        </button>
        <button
          className={sortOrder === 'recent' ? 'font-bold' : ''}
          onClick={() => setSortOrder('recent')}
        >
          최신순
        </button>
      </div>
      <ImageGrid images={images} sortOrder={sortOrder} />
    </div>
  );
};

export default Home;
