import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Clock, DollarSign, ExternalLink, Flame } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { useJobStore } from '../../store/jobStore';
import { Job } from '../../types';
import { formatDistanceToNow } from 'date-fns';

const HotJobs: React.FC = () => {
  const { jobs } = useJobStore();
  const [hotJobs, setHotJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Always show at least 3 hot jobs by marking some as hot if needed
    let filtered = jobs.filter(job => job.isHot || job.featured || (job.aiMatchScore && job.aiMatchScore > 85));
    
    // If we don't have enough hot jobs, mark the top jobs as hot
    if (filtered.length < 3) {
      const topJobs = jobs
        .sort((a, b) => {
          // Sort by AI match score, then featured, then date
          if (a.aiMatchScore && b.aiMatchScore) return b.aiMatchScore - a.aiMatchScore;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        })
        .slice(0, 3)
        .map(job => ({ ...job, isHot: true })); // Mark as hot
      
      filtered = topJobs;
    }
    
    // Sort and limit to 6 jobs
    const sorted = filtered
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.aiMatchScore && b.aiMatchScore) return b.aiMatchScore - a.aiMatchScore;
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      })
      .slice(0, 6);
    
    setHotJobs(sorted);
  }, [jobs]);

  const formatSalary = (salary: Job['salary']) => {
    if (!salary.min && !salary.max) return 'Competitive';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    if (salary.min && salary.max) {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
    } else if (salary.min) {
      return `${formatter.format(salary.min)}+`;
    }
    return 'Competitive';
  };

  const handleJobClick = (job: Job) => {
    if (job.externalUrl) {
      window.open(job.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">
              🔥 Hot Jobs Right Now
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The most in-demand positions from top companies. These roles are getting lots of attention!
          </p>
        </motion.div>

        {/* Hot Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleJobClick(job)}
            >
              <div className="glass-card dark:glass-card-dark p-6 rounded-xl h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {job.companyLogo && (
                      <img 
                        src={job.companyLogo} 
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Hot Badge */}
                  <div className="flex flex-col items-end space-y-2">
                    <motion.div
                      className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Flame className="w-3 h-3" />
                      <span>Hot</span>
                    </motion.div>
                    
                    {job.aiMatchScore && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>{job.aiMatchScore}% Match</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.remote ? 'Remote' : job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatSalary(job.salary)}
                    </span>
                  </div>

                  {/* Tech Stack Preview */}
                  {job.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {job.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{job.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {job.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                </p>

                {/* Apply Button */}
                <motion.div
                  className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
                    {job.type.replace('-', ' ')}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-primary-500 dark:text-primary-400 font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Jobs Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/jobs'}
          >
            View All {jobs.length} Jobs
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HotJobs;