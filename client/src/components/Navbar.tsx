import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Plane, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-2 rounded-xl"
            >
              <Plane size={24} />
            </motion.div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Traveloop
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary-100 dark:bg-primary-900 p-1.5 rounded-full">
                      <User size={18} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-slate-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600">
                  Log in
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md shadow-primary-500/30 transition-all hover:-translate-y-0.5">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
