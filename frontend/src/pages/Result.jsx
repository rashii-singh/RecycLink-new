import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'

export default function Result() {
    const [result, setResult] = useState(null)
    const [image, setImage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem('recyclink_result')
        const img = localStorage.getItem('recyclink_image')
        if (!data) { navigate('/'); return }
        setResult(JSON.parse(data))
        setImage(img)
    }, [])

    if (!result) return null

    return (
        <div className="page">
            <h2 className="page-title">🔍 Analysis Result</h2>
            <div className="result-layout">
                {image && <img src={image} alt="Waste" className="result-image" />}
                <ResultCard result={result} />
            </div>
            <button className="btn-secondary" onClick={() => navigate('/')}>
                ♻️ Scan Another Item
            </button>
        </div>
    )
}