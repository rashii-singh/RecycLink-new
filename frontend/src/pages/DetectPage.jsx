import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import ResultCard from '../components/ResultCard';
import { useLanguage } from '../context/LanguageContext';
import { WASTE_MAPPING } from '../constants/wasteMapping';

export default function DetectPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = async (image) => {
        setLoading(true);
        setResult(null); // Clear previous result before starting new prediction
        try {
            // Send image to backend for prediction
            const formData = new FormData();
            formData.append('file', image);

            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Prediction failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("LOG: API response", data);

            let detectedType = data.category || 'Trash';
            detectedType = String(detectedType).trim();

            // Find case-insensitive match from WASTE_MAPPING keys
            const matchedKey = Object.keys(WASTE_MAPPING).find(
                key => key.toLowerCase() === detectedType.toLowerCase()
            ) || 'Trash';

            const details = WASTE_MAPPING[matchedKey] || WASTE_MAPPING['Trash'];

            console.log("LOG: Frontend Request - Sent file", image.name);
            console.log("LOG: Backend Response - Predicted Class ->", detectedType, "| Confidence ->", data.confidence);
            console.log("LOG: Mapping Selected ->", matchedKey);

            let explanation = details.explanation;
            if (data.top_predictions && data.top_predictions.length > 0) {
                const topList = data.top_predictions
                    .map((pred, i) => `• ${pred.category} — ${pred.confidence}%`)
                    .join('\n');
                explanation = `${details.explanation}\n\n📊 Top Predictions:\n${topList}`;
            }

            const updatedResult = {
                category: matchedKey,
                confidence: data.confidence,
                timestamp: new Date().toISOString(),
                imageUrl: URL.createObjectURL(image),
                explanation: explanation,
                instructions: details.instructions,
                eco_tip: details.ecoTip,
                color: details.hex,
                bin_color: details.color,
                bin_type: details.binType
            };

            console.log("LOG: updated prediction state", updatedResult);
            setResult(updatedResult);
        } catch (error) {
            console.error('Processing failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>AI Waste Detection</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Upload an image of your waste, and our AI will instantly identify it and provide proper disposal instructions.
                </p>
            </div>

            <div className="upload-wrapper responsive-padding" style={{ width: '100%', background: 'var(--accent-green-soft)', padding: '2rem', borderRadius: '32px', border: '1px solid var(--accent-green)22' }}>
                <UploadBox onUpload={handleUpload} loading={loading} />

                {result && (
                    <div className="result-wrapper fade-in-up" style={{ marginTop: '2.5rem' }}>
                        <ResultCard result={result} />
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                    className="button"
                    onClick={() => navigate('/')}
                    style={{ background: 'transparent', border: '2px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.8rem 2rem' }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
