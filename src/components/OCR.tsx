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

    axios.post("http://localhost:5000/ocr", formData)
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        alert("OCR failed or backend offline.");
        setLoading(false);
      });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} disabled={loading}/>
      {loading && <p>Processing...</p>}
      {result && (
        <div>
          <h3>Extracted Data + Schemes:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadForm;