import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage: string | null;
  budget: {
    totalEstimated: number;
  } | null;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trips');
        setTrips(res.data);
      } catch (error) {
        console.error('Failed to fetch trips', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Hello, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 mt-2">Ready for your next adventure?</p>
        </div>
        <div className="mt-6 md:mt-0">
          <Link 
            to="/create-trip"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center text-slate-800 dark:text-slate-200">
          <MapPin className="mr-2 text-secondary-500" /> Your Trips
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center border-dashed border-2 border-slate-300 dark:border-slate-700">
            <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-primary-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No trips planned yet</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Your itinerary awaits! Start planning your first dream vacation today.
            </p>
            <Link 
              to="/create-trip"
              className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700"
            >
              <span>Create a trip</span>
              <Plus size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/trips/${trip.id}`} className="block">
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                    {trip.coverImage ? (
                      <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                        <MapPin size={48} className="text-primary-500/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400">
                      {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} days
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{trip.name}</h3>
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>{format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <DollarSign size={16} className="text-emerald-500" />
                        <span className="font-medium text-sm ml-1">${trip.budget?.totalEstimated || 0}</span>
                      </div>
                      <span className="text-sm font-medium text-primary-600 group-hover:underline">View Trip &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
