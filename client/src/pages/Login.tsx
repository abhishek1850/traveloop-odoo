import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plane, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('demo@traveloop.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      // Demo Mode Fallback for Hackathon (if DB is disconnected)
      if (email === 'demo@traveloop.com' && password === 'password123') {
        console.warn('Backend connection failed. Falling back to Demo Mode.');
        login('demo-token-123', { 
          id: 'demo-user-1', 
          name: 'Demo Traveler', 
          email: 'demo@traveloop.com',
          avatar: 'https://i.pravatar.cc/150?u=demo'
        });
        navigate('/dashboard');
      } else {
        setError(err.response?.data?.error || 'Failed to login. Please ensure the backend is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-2xl w-14 h-14 flex items-center justify-center mb-4">
            <Plane size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-slate-500 mt-2">Enter your details to access your trips</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
