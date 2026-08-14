import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, Users, Star, Shield, 
  ExternalLink, Heart, Share2, Bookmark, Zap, Building2 
} from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { formatDistanceToNow } from 'date-fns';

const JobDetail: React.FC = () => {
  const { 
    selectedJob, 
    user, 
    saveJob, 
    unsaveJob, 
    likeJob, 
    unlikeJob, 
    isJobSaved, 
    isJobLiked 
  } = useJobStore();

  if (!selectedJob) {
    return (
      <div className="glass-card dark:glass-card-dark p-8 rounded-xl h-fit">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👆</div>
          <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-2">
            Select a job to view details
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any job card to see the full description and apply
          </p>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: typeof selectedJob.salary) => {
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

  const handleApply = () => {
    if (selectedJob.externalUrl) {
      window.open(selectedJob.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSave = () => {
    if (!user) return;
    
    if (isJobSaved(selectedJob.id)) {
      unsaveJob(selectedJob.id);
    } else {
      saveJob(selectedJob.id);
    }
  };

  const handleLike = () => {
    if (!user) return;
    
    if (isJobLiked(selectedJob.id)) {
      unlikeJob(selectedJob.id);
    } else {
      likeJob(selectedJob.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedJob.title} at ${selectedJob.company}`,
        text: `Check out this job opportunity: ${selectedJob.title} at ${selectedJob.company}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Clean HTML from description
  const cleanDescription = selectedJob.description.replace(/<[^>]*>/g, '');

  const isSaved = user ? isJobSaved(selectedJob.id) : false;
  const isLiked = user ? isJobLiked(selectedJob.id) : false;

  // Determine job source for attribution
  const getJobSource = () => {
    if (selectedJob.id.startsWith('reed_')) return 'Reed';
    if (selectedJob.id.startsWith('jsearch_')) return 'JSearch';
    if (selectedJob.id.startsWith('remoteok_')) return 'RemoteOK';
    if (selectedJob.id.startsWith('glassdoor_')) return 'Glassdoor';
    return 'DevHire';
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedJob.id}
        className="glass-card dark:glass-card-dark p-8 rounded-xl h-fit sticky top-24"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            {selectedJob.companyLogo && (
              <img 
                src={selectedJob.companyLogo} 
                alt={selectedJob.company}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div>
              <h1 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-1">
                {selectedJob.title}
              </h1>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {selectedJob.company}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleLike}
              className={`p-2 rounded-lg glass-card dark:glass-card-dark hover:scale-105 transition-all duration-200 ${
                isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!user}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              onClick={handleSave}
              className={`p-2 rounded-lg glass-card dark:glass-card-dark hover:scale-105 transition-all duration-200 ${
                isSaved ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!user}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              onClick={handleShare}
              className="p-2 rounded-lg glass-card dark:glass-card-dark hover:scale-105 transition-all duration-200 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* User Action Notice */}
        {!user && (
          <motion.div
            className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-medium">Sign in</span> to save jobs, track applications, and get personalized recommendations.
            </p>
          </motion.div>
        )}

        {/* Badges and Stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          {selectedJob.aiMatchScore && (
            <motion.div
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white font-medium"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-4 h-4" />
              <span>{selectedJob.aiMatchScore}% AI Match</span>
            </motion.div>
          )}
          
          {selectedJob.featured && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-secondary-500 rounded-full text-white font-medium">
              <Star className="w-4 h-4" />
              <span>Featured</span>
            </div>
          )}
          
          {selectedJob.noWhiteboard && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full font-medium">
              <Shield className="w-4 h-4" />
              <span>No Whiteboard</span>
            </div>
          )}
          
          {selectedJob.diversityFriendly && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              <Users className="w-4 h-4" />
              <span>Diversity Friendly</span>
            </div>
          )}
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedJob.remote ? 'Remote' : selectedJob.location}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatDistanceToNow(selectedJob.postedAt, { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatSalary(selectedJob.salary)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {selectedJob.type.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <motion.button
          className="w-full py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-6 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApply}
        >
          <span>Apply Now - Quick Apply</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>

        {/* Description */}
        <div className="space-y-6">
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
              Job Description
            </h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {cleanDescription.length > 500 
                ? `${cleanDescription.substring(0, 500)}...` 
                : cleanDescription
              }
            </div>
          </div>

          {/* Requirements */}
          {selectedJob.requirements.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {selectedJob.techStack.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg font-medium text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {selectedJob.benefits.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedJob.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* External Link Notice */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Powered by {getJobSource()} • Click "Apply Now" to visit the original job posting
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobDetail;