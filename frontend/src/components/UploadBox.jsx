import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function UploadBox({ onUpload, loading }) {
    const [preview, setPreview] = useState(null)
    const [dragging, setDragging] = useState(false)
    const cameraRef = useRef()
    const galleryRef = useRef()
    const { t } = useLanguage()

    const handleFile = (file) => {
        if (!file) return
        setPreview(URL.createObjectURL(file))
        onUpload(file)
    }

    return (
        <div className="upload-section">
            <div
                className={`upload-box ${dragging ? 'dragging' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    handleFile(e.dataTransfer.files[0])
                }}
            >
                {preview ? (
                    <img src={preview} alt="Preview" className="preview-img" onClick={() => galleryRef.current.click()} style={{ cursor: 'pointer' }} />
                ) : (
                    <div className="upload-placeholder">
                        <span className="upload-icon">📸</span>
                        <p>{t('Upload Image')}</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
                            <button type="button" className="button" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={(e) => { e.stopPropagation(); cameraRef.current.click(); }}>Open Camera</button>
                            <button type="button" className="button" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={(e) => { e.stopPropagation(); galleryRef.current.click(); }}>Gallery / Files</button>
                        </div>
                        <span style={{ marginTop: '15px', display: 'block' }}>Supports JPG, PNG</span>
                    </div>
                )}
                <input
                    ref={cameraRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFile(e.target.files[0])}
                />
                <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFile(e.target.files[0])}
                />
            </div>
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Analyzing your waste...</p>
                </div>
            )}
        </div>
    )
}