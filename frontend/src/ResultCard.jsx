const categoryColors = {
    plastic: '#3b82f6',
    organic: '#22c55e',
    paper: '#f59e0b',
    metal: '#6b7280',
    ewaste: '#ef4444',
}

const categoryEmojis = {
    plastic: '🧴',
    organic: '🌿',
    paper: '📄',
    metal: '🔩',
    ewaste: '💻',
}

export default function ResultCard({ result }) {
    const category = result.category?.toLowerCase() || 'unknown'
    const color = categoryColors[category] || '#22c55e'
    const emoji = categoryEmojis[category] || '♻️'
    const confidence = Math.round((result.confidence || 0) * 100)

    return (
        <div className="result-card">
            <div className="category-badge" style={{ backgroundColor: color }}>
                {emoji} {result.category}
            </div>
            <div className="confidence-section">
                <p>Confidence</p>
                <div className="confidence-bar">
                    <div className="confidence-fill"
                        style={{ width: `${confidence}%`, backgroundColor: color }}>
                    </div>
                </div>
                <span>{confidence}%</span>
            </div>
            <div className="instructions">
                <h3>📋 Disposal Instructions</h3>
                <p>{result.instructions || 'Dispose responsibly.'}</p>
            </div>
            <div className="eco-tip">
                <span>🌍 Eco Tip</span>
                <p>{result.eco_tip || 'Every correct disposal counts!'}</p>
            </div>
        </div>
    )
}