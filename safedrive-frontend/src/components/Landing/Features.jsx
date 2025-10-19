import React from 'react';
import { Eye, Heart, Gauge, AlertTriangle } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-slate-800/50 backdrop-blur-lg border border-teal-500/20 rounded-xl hover:border-teal-500/50 transition-all group">
    <div className="w-14 h-14 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
      <Icon className="w-8 h-8 text-teal-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Eye Tracking",
      description: "PERCLOS analysis detects microsleeps and drowsiness in real-time"
    },
    {
      icon: Heart,
      title: "HRV Monitoring",
      description: "Heart rate variability tracks stress and fatigue levels"
    },
    {
      icon: Gauge,
      title: "Steering Analysis",
      description: "Detects erratic driving patterns and lane deviation"
    },
    {
      icon: AlertTriangle,
      title: "Smart Alerts",
      description: "Progressive warnings with audio-visual feedback"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Powered by <span className="text-teal-400">Multi-Sensor Fusion</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;