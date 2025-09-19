import React, { useState } from 'react';
import axios from 'axios';

const UploadForm: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    axios.post("http://127.0.0.1:5000/map", formData)
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        alert("Map failed! Make sure Flask backend is running.");
        setLoading(false);
      });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>FRA Document OCR</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
        disabled={loading}
      />
      {loading && <p>Processing...</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Information:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadForm;