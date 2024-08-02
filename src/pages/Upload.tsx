import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import ImageUpload from '../components/ImageUpload';

const Upload: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consentToEmail, setConsentToEmail] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('timetables')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading file');
      return;
    }

    const { data } = supabase.storage.from('timetables').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('images').insert({
      url: data.publicUrl,
      email: email,
      consent_to_email: consentToEmail,
    });

    if (insertError) {
      alert('Error saving image information');
      return;
    }

    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)}>뒤로</button>

      <h1 className="text-3xl font-bold mb-4">시간표 업로드</h1>
      <ImageUpload onUpload={handleUpload} />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mt-4 p-2 border rounded"
      />
      <label className="block mt-4">
        <input
          type="checkbox"
          checked={consentToEmail}
          onChange={(e) => setConsentToEmail(e.target.checked)}
        />
        <span className="ml-2">이메일 수신 동의</span>
      </label>
    </div>
  );
};

export default Upload;
