import React from 'react';
import { Shield, Eye, Heart, Gauge, Lock, ChevronRight, CheckCircle, AlertTriangle, Users } from 'lucide-react';

// Landing Page Component
const LandingPage = ({ onGetStarted }) => {
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
            onClick={onGetStarted}
            className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-300 text-sm font-medium">AI-Powered Driver Safety</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Never Drive
            <span className="block bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Drowsy Again
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Real-time driver wellness monitoring using advanced AI, computer vision, and biometric sensors. 
            Stay alert, stay safe, save lives.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-teal-500/30">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {/* <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powered by <span className="text-teal-400">Multi-Sensor Fusion</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Eye Tracking"
              description="PERCLOS analysis detects microsleeps and drowsiness in real-time"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="HRV Monitoring"
              description="Heart rate variability tracks stress and fatigue levels"
            />
            <FeatureCard
              icon={<Gauge className="w-8 h-8" />}
              title="Steering Analysis"
              description="Detects erratic driving patterns and lane deviation"
            />
            <FeatureCard
              icon={<AlertTriangle className="w-8 h-8" />}
              title="Smart Alerts"
              description="Progressive warnings with audio-visual feedback"
            />
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <StatCard number="91%" label="Accident Prevention Rate" />
          <StatCard number="<200ms" label="Alert Response Time" />
          <StatCard number="99.2%" label="Detection Accuracy" />
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Fleet Safety?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Join leading transportation companies using SafeDrive AI
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-white text-teal-600 font-bold rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105"
          >
            Start Free Trial
          </button>
        </div>
      </section> */}

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
