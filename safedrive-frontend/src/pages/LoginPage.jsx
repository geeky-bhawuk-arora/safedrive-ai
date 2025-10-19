import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      login({ email, role: 'admin' });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 border-2 border-teal-500 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access SafeDrive AI Dashboard</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-teal-500/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@safedrive.ai"
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button 
              type="submit" 
              disabled={isLoading}
              icon={Lock}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
            <p className="text-xs text-teal-300 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-400">Email: admin@safedrive.ai</p>
            <p className="text-xs text-slate-400">Password: demo123</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;