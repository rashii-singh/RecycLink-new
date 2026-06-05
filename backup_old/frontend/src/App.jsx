import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(' https://recyclink-77tg.onrender.com', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to connect to backend. Make sure the Flask server is running at http://localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>RecycLink</h1>
        <p className="subtitle">AI-Powered Waste Segregation</p>
      </header>

      <main className="main-card">
        <div className="upload-section" onClick={() => document.getElementById('fileInput').click()}>
          <p>{file ? file.name : "Click or Drag to Upload Waste Image"}</p>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        <button
          className="button"
          onClick={handleUpload}
          disabled={loading || !file}
          style={{ marginTop: '1.5rem' }}
        >
          {loading ? "Analyzing..." : "Classify Waste"}
        </button>

        {loading && <div className="loading-spinner">Processing image...</div>}

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="result-section">
            <h3>Prediction Result</h3>
            <p><strong>Category:</strong> {result.class}</p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
            <p><em>{result.message}</em></p>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '2rem', color: '#888', fontSize: '0.9rem' }}>
        &copy; 2026 RecycLink. Built for a cleaner planet.
      </footer>
    </div>
  );
}

export default App;
