import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useJobStore } from './store/jobStore';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';

function App() {
  const { themeMode } = useJobStore();

  useEffect(() => {
    // Apply theme classes based on current theme mode
    const html = document.documentElement;
    html.classList.remove('dark', 'blackwhite');
    
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else if (themeMode === 'blackwhite') {
      html.classList.add('blackwhite');
    }
  }, [themeMode]);

  // Ensure theme is applied immediately on app load
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else if (themeMode === 'blackwhite') {
      html.classList.add('blackwhite');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes (No Layout) */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main App Routes (With Layout) */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/jobs" element={
          <Layout>
            <Jobs />
          </Layout>
        } />
        
        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;