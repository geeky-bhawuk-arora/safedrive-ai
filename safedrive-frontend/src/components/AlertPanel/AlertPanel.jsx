import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const AlertPanel = ({ status, onSimulate, onReset }) => {
  const alertConfig = {
    alert: {
      icon: CheckCircle,
      title: 'System Active',
      message: 'Driver wellness monitoring is active. Drive safely!',
      color: 'text-green-400'
    },
    drowsy: {
      icon: AlertTriangle,
      title: 'Fatigue Detected',
      message: 'High eye closure detected. Please consider taking a break.',
      color: 'text-yellow-400'
    },
    danger: {
      icon: AlertTriangle,
      title: 'CRITICAL: Pull Over',
      message: 'Severe fatigue detected. Please pull over safely and rest immediately.',
      color: 'text-red-400'
    }
  };

  const config = alertConfig[status] || alertConfig.alert;
  const Icon = config.icon;

  return (
    <Card>
      <div className="flex items-center gap-4 mb-6">
        <Icon className={`w-12 h-12 ${config.color}`} />
        <div>
          <h3 className={`text-xl font-bold ${config.color}`}>{config.title}</h3>
          <p className="text-slate-400 text-sm">{config.message}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onSimulate} className="flex-1">
          Simulate Fatigue
        </Button>
        <Button onClick={onReset} variant="secondary" className="flex-1">
          Reset System
        </Button>
      </div>
    </Card>
  );
};

export default AlertPanel;