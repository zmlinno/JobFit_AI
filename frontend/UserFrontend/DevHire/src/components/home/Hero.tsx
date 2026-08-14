import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { useJobStore } from '../../store/jobStore';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const { totalCount } = useJobs({ autoFetch: false });
  const { searchJobs } = useJobs({ autoFetch: false });
  const navigate = useNavigate();

  const dreamWords = useMemo(() => ['Dream', 'Perfect', 'Ideal', 'Next', 'Amazing'], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dreamWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dreamWords.length]);

  const popularSearches = useMemo(() => [
    'Frontend Developer',
    'Full Stack',
    'DevOps Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Data Scientist'
  ], []);

  const handleSearch = useCallback(async () => {
    if (searchQuery.trim()) {
      await searchJobs(searchQuery, location);
      navigate('/jobs');
    }
  }, [searchQuery, location, searchJobs, navigate]);

  const handlePopularSearch = useCallback(async (search: string) => {
    setSearchQuery(search);
    await searchJobs(search, location);
    navigate('/jobs');
  }, [location, searchJobs, navigate]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Memoize static content to prevent unnecessary re-renders
  const statsContent = useMemo(() => [
    { value: totalCount > 0 ? totalCount.toLocaleString() : '12,314', label: 'Jobs Available' },
    { value: '94%', label: 'Match Accuracy', color: 'text-green-500' },
    { value: '2.3x', label: 'Faster Hiring', color: 'text-blue-500' },
    { value: '500+', label: 'Top Companies', color: 'text-purple-500' }
  ], [totalCount]);

  const featuresContent = useMemo(() => [
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: 'AI-Powered Matching',
      description: 'Get personalized job recommendations based on your skills, experience, and career preferences',
      bgColor: 'gradient-bg'
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Developer-First',
      description: 'No whiteboard interviews, salary transparency, and real technical assessments that matter',
      bgColor: 'bg-green-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: 'Quality Over Quantity',
      description: 'Curated opportunities from companies that value engineering excellence and innovation',
      bgColor: 'bg-blue-500'
    }
  ], []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 glass-card dark:glass-card-dark rounded-full border border-primary-200 dark:border-primary-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Job Matching Platform
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-8xl text-gray-900 dark:text-white mb-6 leading-tight">
            Find Your{' '}
            <div className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="gradient-text inline-block relative"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {dreamWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
            {' '}Job
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl text-gray-600 dark:text-gray-400">
              with AI Precision
            </span>
          </h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Skip the spray-and-pray approach. Get matched with roles that actually fit your skills, 
            values, and career goals using our advanced AI algorithms.
          </motion.p>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-12"
        >
          {statsContent.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="glass-card dark:glass-card-dark px-6 py-4 rounded-2xl border border-white/20 dark:border-gray-700/50"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`text-3xl font-heading font-bold ${stat.color || 'gradient-text'}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="glass-card dark:glass-card-dark p-3 rounded-3xl border border-white/30 dark:border-gray-700/50 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-3 flex-1 w-full">
                  <Search className="w-6 h-6 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search by role, company, or tech stack..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none py-4"
                  />
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full sm:w-48 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none py-4 border-l border-gray-300 dark:border-gray-600 pl-4"
                  />
                  <motion.button
                    className="gradient-bg text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                  >
                    <Zap className="w-5 h-5" />
                    <span>AI Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((search, index) => (
              <motion.button
                key={search}
                className="px-6 py-3 glass-card dark:glass-card-dark rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 border border-white/20 dark:border-gray-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => handlePopularSearch(search)}
              >
                {search}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {featuresContent.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="glass-card dark:glass-card-dark p-8 rounded-2xl text-center border border-white/20 dark:border-gray-700/50"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <motion.div 
                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="px-8 py-4 gradient-bg text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jobs')}
          >
            <span>Browse Jobs</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            className="px-8 py-4 glass-card dark:glass-card-dark text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border border-white/30 dark:border-gray-700/50 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
          >
            <span>Create Profile</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;