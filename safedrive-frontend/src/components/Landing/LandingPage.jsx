import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-400" />
            <span className="text-2xl font-bold text-white">SafeDrive AI</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>

      <Hero onGetStarted={() => navigate('/login')} />
      <Features />

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-teal-500/20">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          © 2025 SafeDrive AI. Real-Time Driver Wellness Monitoring System.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;