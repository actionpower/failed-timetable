import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Image, SortOrder } from '../types';

export const useSupabase = (sortOrder: SortOrder) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, [sortOrder]);

  const fetchImages = async () => {
    setLoading(true);
    let query = supabase
      .from('images')
      .select('*')
      .order(sortOrder === 'likes' ? 'likes_count' : 'created_at', {
        ascending: false,
      })
      .limit(20);

    const { data, error } = await query;

    if (error) {
      setError(error.message);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  return { images, loading, error, refetch: fetchImages };
};
