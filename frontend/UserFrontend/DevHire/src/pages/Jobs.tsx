import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Filter as FilterIcon } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';
import JobDetail from '../components/jobs/JobDetail';

const Jobs: React.FC = () => {
  const { loading, error, refetch } = useJobs();
  const [showError, setShowError] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error Banner */}
      {showError && error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300 text-sm md:text-base">
              {error.includes('API') ? 'API temporarily unavailable. Showing sample data.' : error}
            </span>
          </div>
          <motion.button
            onClick={refetch}
            className="flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </motion.button>
        </motion.div>
      )}

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center space-x-2 px-4 py-2 glass-card dark:glass-card-dark rounded-lg w-full justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <motion.div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMobileFilters(false)}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-lg">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-lg glass-card dark:glass-card-dark"
                >
                  ✕
                </button>
              </div>
              <JobFilters />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          className="flex items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-gray-600 dark:text-gray-400">Loading jobs...</span>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className="grid lg:grid-cols-12 gap-4 md:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <JobFilters />
          </div>

          {/* Job List */}
          <div className="lg:col-span-5">
            <JobList />
          </div>

          {/* Job Detail - Hidden on mobile when no job selected */}
          <div className="hidden lg:block lg:col-span-4">
            <JobDetail />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Jobs;