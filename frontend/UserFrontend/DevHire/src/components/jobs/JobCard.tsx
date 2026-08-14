import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Zap, Star, Shield, Users, ExternalLink, Bookmark, Heart } from 'lucide-react';
import { Job } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { useJobStore } from '../../store/jobStore';

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onClick }) => {
  const { user, saveJob, unsaveJob, likeJob, unlikeJob, isJobSaved, isJobLiked } = useJobStore();

  const formatSalary = (salary: Job['salary']) => {
    if (!salary.min && !salary.max) return 'Salary not specified';
    
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
    } else if (salary.max) {
      return `Up to ${formatter.format(salary.max)}`;
    }
    
    return 'Competitive salary';
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.externalUrl) {
      window.open(job.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    
    if (isJobLiked(job.id)) {
      unlikeJob(job.id);
    } else {
      likeJob(job.id);
    }
  };

  const isSaved = user ? isJobSaved(job.id) : false;
  const isLiked = user ? isJobLiked(job.id) : false;

  return (
    <motion.div
      className={`
        p-6 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden
        ${isSelected 
          ? 'glass-card dark:glass-card-dark ring-2 ring-primary-500 shadow-xl scale-[1.02]' 
          : 'glass-card dark:glass-card-dark hover:shadow-xl hover:scale-[1.01]'
        }
        ${job.featured ? 'border-2 border-primary-200 dark:border-primary-800' : 'border border-gray-200 dark:border-gray-700'}
      `}
      onClick={onClick}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Featured Gradient Overlay */}
      {job.featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3 flex-1">
          {job.companyLogo && (
            <motion.img 
              src={job.companyLogo} 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium truncate">
              {job.company}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {user && (
            <>
              <motion.button
                onClick={handleLikeClick}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-500' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                onClick={handleSaveClick}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isSaved 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-500' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-blue-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.aiMatchScore && (
          <motion.div
            className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-xs font-medium"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-3 h-3" />
            <span>{job.aiMatchScore}% Match</span>
          </motion.div>
        )}
        
        {job.featured && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-secondary-500 rounded-full text-white text-xs font-medium">
            <Star className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
        
        {job.isHot && (
          <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-medium animate-pulse-soft">
            🔥 Hot
          </div>
        )}

        {job.noWhiteboard && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
            <Shield className="w-3 h-3" />
            <span>No Whiteboard</span>
          </div>
        )}

        {job.diversityFriendly && (
          <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
            <Users className="w-3 h-3" />
            <span>Diversity Friendly</span>
          </div>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.remote ? 'Remote' : job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium text-green-600 dark:text-green-400">
              {formatSalary(job.salary)}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        {job.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {job.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{job.techStack.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
        {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
            {job.type.replace('-', ' ')}
          </span>
          {job.remote && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
              Remote
            </span>
          )}
        </div>
        
        <motion.button
          className="px-4 py-2 gradient-bg text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyClick}
        >
          <span>Apply Now</span>
          <ExternalLink className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default JobCard;