# RecycLink - Waste Segregation App

A clean full-stack application for AI-powered waste classification.

## Project Structure

- `backend/`: Flask API with CORS and ML prediction logic.
- `frontend/`: React application built with Vite.
- `backup_old/`: (Optional) Move your previous files here to keep the root clean.

## Prerequisites

- Python 3.x
- Node.js & npm

## Getting Started

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```
The API will be available at `http://localhost:5000`.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173` (or the port Vite provides).

## Features

- **Image Upload**: Upload waste images for classification.
- **Real-time Preview**: See the image before submitting.
- **AI Classification**: Dummy ML placeholder (returns Plastic @ 92%).
- **Responsive UI**: Clean, premium design for mobile and desktop.

## Backend API

### POST /predict
Accepts a `multipart/form-data` file upload.
Returns:
```json
{
  "class": "Plastic",
  "confidence": 0.92,
  "message": "Waste classified successfully"
}
```
