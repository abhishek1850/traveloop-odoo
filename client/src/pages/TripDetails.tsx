import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { MapPin, Calendar as CalendarIcon, Wallet, Plus, Luggage, Navigation } from 'lucide-react';

interface TripDetailsData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  stops: any[];
  budget: any;
  packingItems: any[];
}

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<TripDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        console.error('Failed to fetch trip details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (isLoading) {
    return <div className="max-w-7xl mx-auto p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;
  }

  if (!trip) {
    return <div className="max-w-7xl mx-auto p-8 text-center">Trip not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-64 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-sm font-medium mb-3">
            <CalendarIcon size={16} />
            <span>{format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{trip.name}</h1>
          <p className="text-white/80 max-w-2xl">{trip.description || 'No description provided'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit mb-8">
        {[
          { id: 'itinerary', icon: <Navigation size={18} />, label: 'Itinerary' },
          { id: 'budget', icon: <Wallet size={18} />, label: 'Budget' },
          { id: 'packing', icon: <Luggage size={18} />, label: 'Packing List' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'itinerary' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <MapPin className="mr-2 text-primary-500" /> Stops & Activities
                </h2>
                <button className="flex items-center space-x-1 text-sm bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-3 py-1.5 rounded-lg hover:bg-primary-200 transition-colors">
                  <Plus size={16} /> <span>Add Stop</span>
                </button>
              </div>

              {trip.stops && trip.stops.length > 0 ? (
                <div className="space-y-4">
                  {/* Stops list will go here */}
                </div>
              ) : (
                <div className="glass rounded-2xl p-8 text-center border-dashed border-2 border-slate-300 dark:border-slate-700">
                  <p className="text-slate-500 mb-4">No stops added yet.</p>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-md">
                    Add First Stop
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'budget' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Budget Overview</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-500 text-sm font-medium mb-1">Total Estimated</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">${trip.budget?.totalEstimated || 0}</p>
                </div>
                {/* Additional budget details */}
              </div>
            </motion.div>
          )}

          {activeTab === 'packing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Packing List</h2>
              <p className="text-slate-500">Feature coming soon.</p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Trip Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} Days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Destinations</span>
                <span className="font-medium text-slate-900 dark:text-white">{trip.stops?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
