import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X, MapPin, Briefcase, Code, DollarSign, Shield, Users } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { techStackOptions, locationOptions } from '../../data/mockData';

const JobFilters: React.FC = () => {
  const { filters, setFilters } = useJobStore();

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const experienceLevels = ['Junior', 'Mid-level', 'Senior', 'Lead', 'Principal'];

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters({ [key]: value });
  };

  const handleArrayFilterToggle = (key: keyof typeof filters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFilters({ [key]: newArray });
  };

  const clearAllFilters = () => {
    setFilters({
      location: [],
      remote: false,
      type: [],
      techStack: [],
      salaryRange: [0, 300000],
      noWhiteboard: false,
      diversityFriendly: false,
      experience: [],
    });
  };

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'boolean' && value) return count + 1;
    return count;
  }, 0);

  return (
    <motion.div
      className="glass-card dark:glass-card-dark p-6 rounded-xl h-fit sticky top-24"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-500" />
          <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">
            Filters
          </h2>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        {activeFiltersCount > 0 && (
          <motion.button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <label className="font-medium text-gray-900 dark:text-white">Location</label>
          </div>
          
          <div className="mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.remote}
                onChange={(e) => handleFilterChange('remote', e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Remote Only</span>
            </label>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {locationOptions.map((location) => (
              <label key={location} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.location.includes(location)}
                  onChange={() => handleArrayFilterToggle('location', location)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <label className="font-medium text-gray-900 dark:text-white">Job Type</label>
          </div>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleArrayFilterToggle('type', type)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {type.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Code className="w-4 h-4 text-gray-500" />
            <label className="font-medium text-gray-900 dark:text-white">Tech Stack</label>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {techStackOptions.map((tech) => (
              <label key={tech} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.techStack.includes(tech)}
                  onChange={() => handleArrayFilterToggle('techStack', tech)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <label className="font-medium text-gray-900 dark:text-white">Salary Range</label>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="300000"
              step="10000"
              value={filters.salaryRange[1]}
              onChange={(e) => handleFilterChange('salaryRange', [filters.salaryRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>${filters.salaryRange[0].toLocaleString()}</span>
              <span>${filters.salaryRange[1].toLocaleString()}+</span>
            </div>
          </div>
        </div>

        {/* Special Filters */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Special Requirements</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.noWhiteboard}
                onChange={(e) => handleFilterChange('noWhiteboard', e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">No Whiteboard Interviews</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.diversityFriendly}
                onChange={(e) => handleFilterChange('diversityFriendly', e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Diversity Friendly</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobFilters;