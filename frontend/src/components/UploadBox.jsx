import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function UploadBox({ onUpload, loading }) {
    const [preview, setPreview] = useState(null)
    const [dragging, setDragging] = useState(false)
    const inputRef = useRef()
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
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    handleFile(e.dataTransfer.files[0])
                }}
            >
                {preview ? (
                    <img src={preview} alt="Preview" className="preview-img" />
                ) : (
                    <div className="upload-placeholder">
                        <span className="upload-icon">📸</span>
                        <p>{t('Upload Image')}</p>
                        <span>Supports JPG, PNG</span>
                    </div>
                )}
                <input
                    ref={inputRef}
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