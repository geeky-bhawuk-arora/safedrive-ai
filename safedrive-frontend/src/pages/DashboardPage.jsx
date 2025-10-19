import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import VideoFeed from '../components/VideoFeed/VideoFeed';
import SteeringChart from '../components/SensorCharts/SteeringChart';
import AlertPanel from '../components/AlertPanel/AlertPanel';
import Card from '../components/common/Card';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [driverState, setDriverState] = useState('alert');
  const [perclos, setPerclos] = useState(12);
  const [steeringData, setSteeringData] = useState(
    Array.from({ length: 20 }, () => Math.random() * 5 + 2)
  );

  const overlayData = {
    eyeStatus: 'Open',
    mouthStatus: 'Closed (0%)',
    headPose: 'Forward'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const simulateFatigue = () => {
    setDriverState('drowsy');
    setPerclos(45);
    setSteeringData(Array.from({ length: 20 }, () => Math.random() * 15 + 5));
    
    setTimeout(() => {
      setDriverState('danger');
      setPerclos(65);
    }, 3000);
  };

  const resetSystem = () => {
    setDriverState('alert');
    setPerclos(12);
    setSteeringData(Array.from({ length: 20 }, () => Math.random() * 5 + 2));
  };

  const getStatusClass = () => {
    if (driverState === 'alert') return 'bg-green-500/20 text-green-400 border-green-500';
    if (driverState === 'drowsy') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
    return 'bg-red-500/20 text-red-400 border-red-500';
  };

  const getStatusText = () => {
    if (driverState === 'alert') return '🟢 ALERT';
    if (driverState === 'drowsy') return '🟡 DROWSY';
    return '🔴 DANGER';
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">SafeDrive AI Dashboard</h1>
              <p className="text-sm text-slate-400">Logged in as {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full font-semibold border-2 ${getStatusClass()}`}>
              {getStatusText()}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoFeed overlayData={overlayData} />
            <SteeringChart data={steeringData} />
          </div>

          <div className="space-y-6">
            <Card title="📊 Metrics">
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">PERCLOS</p>
                  <p className="text-3xl font-bold text-teal-400">{perclos}%</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">HRV</p>
                  <p className="text-3xl font-bold text-teal-400">65ms</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Steering</p>
                  <p className="text-3xl font-bold text-teal-400">Stable</p>
                </div>
              </div>
            </Card>

            <AlertPanel 
              status={driverState}
              onSimulate={simulateFatigue}
              onReset={resetSystem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;