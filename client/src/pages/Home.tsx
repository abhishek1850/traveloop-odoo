import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CreditCard, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white"
        >
          Travel planning made{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
            intelligently simple.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-600 dark:text-slate-400"
        >
          Build personalized multi-city itineraries, manage your travel budget, and organize your packing list all in one beautiful platform.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link to="/register" className="px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1">
            Start Planning For Free
          </Link>
          <Link to="/login" className="px-8 py-3.5 text-base font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 rounded-xl transition-all hover:-translate-y-1">
            View Live Demo
          </Link>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin className="text-secondary-500" size={32} />,
              title: 'Multi-City Itineraries',
              desc: 'Easily plan complex trips with our drag-and-drop timeline builder.'
            },
            {
              icon: <CreditCard className="text-primary-500" size={32} />,
              title: 'Smart Budgeting',
              desc: 'Keep track of all your expenses with automated visualizations.'
            },
            {
              icon: <Sparkles className="text-pink-500" size={32} />,
              title: 'Curated Activities',
              desc: 'Discover and add the best things to do in every destination.'
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="glass p-8 rounded-2xl text-left"
            >
              <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
