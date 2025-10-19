import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../common/Button';

const Hero = ({ onGetStarted }) => {
  return (
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
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={onGetStarted} icon={ChevronRight}>
            Get Started
          </Button>
          <Button variant="secondary">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;