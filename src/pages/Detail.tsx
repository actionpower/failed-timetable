import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { Image } from '../types';
import ImageDetail from '../components/ImageDetail';
import { useNavigate } from 'react-router-dom';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';

const Detail: React.FC = () => {
  const [image, setImage] = useState<Image | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchImage();
  }, [id]);

  const fetchImage = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching image:', error);
    } else {
      setImage(data);
    }
  };

  const handleLike = async () => {
    if (!image) return;

    const fingerprint = await getCurrentBrowserFingerPrint();

    const { data, error } = await supabase.rpc('add_like_and_update_count', {
      p_image_id: image.id,
      p_device_id: fingerprint,
    });

    if (!data) {
      alert('이미 오늘은 좋아요를 눌렀음.');
      return;
    }

    if (error) {
      console.error('Error liking image:', error);
    } else {
      setImage({ ...image, likes_count: image.likes_count + 1 });
    }
  };

  if (!image) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)}>뒤로</button>
      <h1 className="text-3xl font-bold mb-4">시간표 상세</h1>
      <ImageDetail image={image} onLike={handleLike} />
    </div>
  );
};

export default Detail;
