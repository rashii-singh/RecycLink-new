import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import BackButton from './components/BackButton'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Result from './pages/Result'
import DashboardPage from './pages/DashboardPage'
import ThresholdPage from './pages/ThresholdPage'
import RequestPickup from './pages/RequestPickup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Help from './pages/Help'
import DisposalCenters from './pages/DisposalCenters'
import SellRecyclables from './pages/SellRecyclables'
import CollectorDashboard from './pages/CollectorDashboard'
import EcoRiderDashboard from './pages/EcoRiderDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { LocationProvider } from './context/LocationContext'
import './App.css'

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const { currentUser } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const location = useLocation();
  const showSidebar = currentUser && location.pathname !== '/login';

  return (
    <div className="app-container">
      {showSidebar && (
        <Sidebar 
          isOpen={isMobileSidebarOpen} 
          onClose={() => setIsMobileSidebarOpen(false)} 
        />
      )}
      <div className={`app-content ${showSidebar ? 'with-sidebar' : ''}`}>
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <BackButton />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/threshold" element={<ProtectedRoute><ThresholdPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/request-pickup" element={<ProtectedRoute><RequestPickup /></ProtectedRoute>} />
          <Route path="/disposal-centers" element={<ProtectedRoute><DisposalCenters /></ProtectedRoute>} />
          <Route path="/sell" element={<ProtectedRoute><SellRecyclables /></ProtectedRoute>} />
          <Route path="/collector-dashboard" element={<ProtectedRoute><CollectorDashboard /></ProtectedRoute>} />
          <Route path="/eco-rider-dashboard" element={<ProtectedRoute><EcoRiderDashboard /></ProtectedRoute>} />
        </Routes>
        <BottomNav />
        <Chatbot />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <LocationProvider>
            <Router>
              <AppContent />
            </Router>
          </LocationProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App