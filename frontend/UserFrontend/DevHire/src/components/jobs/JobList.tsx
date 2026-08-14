import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Clock } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import JobCard from './JobCard';

const JobList: React.FC = () => {
  const { filteredJobs, selectedJob, setSelectedJob } = useJobStore();

  // Sort jobs by relevance (AI match score, featured status, date)
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    // Featured jobs first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by AI match score
    if (a.aiMatchScore && b.aiMatchScore) {
      if (a.aiMatchScore !== b.aiMatchScore) return b.aiMatchScore - a.aiMatchScore;
    }
    
    // Then by hot jobs
    if (a.isHot && !b.isHot) return -1;
    if (!a.isHot && b.isHot) return 1;
    
    // Finally by date
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  const featuredCount = filteredJobs.filter(job => job.featured).length;
  const hotCount = filteredJobs.filter(job => job.isHot).length;
  const avgMatchScore = filteredJobs.reduce((sum, job) => sum + (job.aiMatchScore || 0), 0) / filteredJobs.length;

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="glass-card dark:glass-card-dark p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl text-gray-900 dark:text-white">
            {filteredJobs.length} Jobs Found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Sort by:</span>
            <select className="bg-transparent border-none outline-none font-medium text-primary-500">
              <option>Relevance</option>
              <option>Date Posted</option>
              <option>Salary</option>
              <option>Company</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        {filteredJobs.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-secondary-500 mb-1">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">{Math.round(avgMatchScore)}%</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Avg Match</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-orange-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{hotCount}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Hot Jobs</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">{featuredCount}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Featured</div>
            </div>
          </div>
        )}
      </div>

      {/* Job Cards */}
      <AnimatePresence mode="popLayout">
        {sortedJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            layout
          >
            <JobCard
              job={job}
              isSelected={selectedJob?.id === job.id}
              onClick={() => setSelectedJob(job)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredJobs.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default JobList;