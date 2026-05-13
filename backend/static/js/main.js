document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const loadingState = document.getElementById('loading-state');
    const resultArea = document.getElementById('result-area');
    const resetBtn = document.getElementById('reset-btn');

    // DOM Elements for results
    const imagePreview = document.getElementById('image-preview');
    const categoryBadge = document.getElementById('category-badge');
    const categoryName = document.getElementById('category-name');
    const confidenceValue = document.getElementById('confidence-value');
    const confidenceFill = document.getElementById('confidence-fill');
    const instructionsText = document.getElementById('instructions-text');

    // Category Colors Mapping
    const categoryColors = {
        'Plastic': '#3B82F6', // Blue
        'Organic': '#10B981', // Green
        'Paper': '#EAB308',   // Yellow
        'Metal': '#8B5CF6',   // Purple
        'E-waste': '#EF4444'  // Red
    };

    const categoryIcons = {
        'Plastic': 'ph-recycle',
        'Organic': 'ph-plant',
        'Paper': 'ph-file-text',
        'Metal': 'ph-cube',
        'E-waste': 'ph-plug'
    };

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('dragover');
    }

    function unhighlight() {
        dropZone.classList.remove('dragover');
    }

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle click to browse
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            
            // Validate file type
            if (!file.type.match('image.*')) {
                alert('Please upload an image file (JPG, PNG).');
                return;
            }

            uploadFile(file);
        }
    }

    async function uploadFile(file) {
        // UI transitions
        dropZone.classList.add('hidden');
        loadingState.classList.remove('hidden');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            displayResults(data, URL.createObjectURL(file));

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during classification. Please try again.');
            resetUI();
        }
    }

    function displayResults(data, localImageUrl) {
        // Hide loading
        loadingState.classList.add('hidden');
        
        // Show result area
        resultArea.classList.remove('hidden');

        // Set image preview
        imagePreview.src = localImageUrl;

        // Set category styles
        const category = data.category;
        const color = categoryColors[category] || '#10B981';
        const icon = categoryIcons[category] || 'ph-recycle';
        
        categoryBadge.style.backgroundColor = `${color}20`; // 20% opacity background
        categoryBadge.style.color = color;
        categoryBadge.style.border = `1px solid ${color}40`;
        categoryBadge.innerHTML = `<i class="ph ${icon}"></i> <span id="category-name">${category}</span>`;

        // Set confidence
        confidenceValue.textContent = `${data.confidence}%`;
        confidenceFill.style.backgroundColor = color;
        // Small delay to allow CSS transition to play
        setTimeout(() => {
            confidenceFill.style.width = `${data.confidence}%`;
        }, 100);

        // Set instructions
        instructionsText.textContent = data.instructions;
    }

    function resetUI() {
        resultArea.classList.add('hidden');
        loadingState.classList.add('hidden');
        dropZone.classList.remove('hidden');
        fileInput.value = '';
        confidenceFill.style.width = '0%';
        imagePreview.src = '';
    }

    resetBtn.addEventListener('click', resetUI);
});
