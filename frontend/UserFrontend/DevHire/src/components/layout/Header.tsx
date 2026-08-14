import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useJobs } from '../../hooks/useJobs';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, user, setUser, themeMode } = useJobStore();
  const { searchJobs } = useJobs({ autoFetch: false });
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for dynamic effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchJobs(searchQuery);
      navigate('/jobs');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getHeaderClasses = () => {
    const base = "sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300";
    
    switch (themeMode) {
      case 'light':
        return `${base} bg-white/90 border-gray-200 text-gray-900`;
      case 'dark':
        return `${base} bg-gray-900/90 border-gray-700 text-white`;
      default:
        return `${base} bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-700`;
    }
  };

  const getInputClasses = () => {
    const base = "w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm";
    
    switch (themeMode) {
      case 'light':
        return `${base} border border-gray-200 text-gray-900 placeholder-gray-500`;
      case 'dark':
        return `${base} border border-gray-600 text-white placeholder-gray-400`;
      default:
        return `${base} border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`;
    }
  };

  return (
    <motion.header 
      className={getHeaderClasses()}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between transition-all duration-300"
          animate={{ 
            height: scrolled ? '64px' : '80px',
            paddingTop: scrolled ? '8px' : '16px',
            paddingBottom: scrolled ? '8px' : '16px'
          }}
        >
          {/* Logo - Enlarges when scrolled */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 dark:border-gray-700/50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            animate={{
              scale: scrolled ? 1.1 : 1,
              padding: scrolled ? '12px 16px' : '8px 16px'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="gradient-bg rounded-lg flex items-center justify-center"
              animate={{
                width: scrolled ? '40px' : '32px',
                height: scrolled ? '40px' : '32px'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-heading font-bold text-white text-lg">D</span>
            </motion.div>
            <motion.span 
              className="font-heading font-bold gradient-text"
              animate={{
                fontSize: scrolled ? '24px' : '20px'
              }}
              transition={{ duration: 0.3 }}
            >
              DevHire
            </motion.span>
          </motion.div>

          {/* Desktop Search Bar - Separate box */}
          <motion.form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-1 max-w-2xl mx-8"
            animate={{
              scale: scrolled ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={getInputClasses()}
              />
            </div>
          </motion.form>

          {/* Desktop Actions - Separate boxes */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle - Separate box */}
            <motion.div
              className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-2 border border-white/20 dark:border-gray-700/50"
              animate={{
                scale: scrolled ? 1.1 : 1,
                padding: scrolled ? '12px' : '8px'
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: scrolled ? 1.15 : 1.05, y: -2 }}
            >
              <DarkModeToggle />
            </motion.div>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <motion.div 
                    className="flex items-center space-x-3 px-4 py-2 cursor-pointer transition-all duration-200 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                    animate={{
                      scale: scrolled ? 1.1 : 1,
                      padding: scrolled ? '12px 16px' : '8px 16px'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="bg-primary-500 rounded-full flex items-center justify-center"
                      animate={{
                        width: scrolled ? '40px' : '32px',
                        height: scrolled ? '40px' : '32px'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white font-medium text-sm">
                        {getInitials(user.name)}
                      </span>
                    </motion.div>
                    <motion.span 
                      className="font-medium text-gray-900 dark:text-white"
                      animate={{
                        fontSize: scrolled ? '16px' : '14px'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {user.name}
                    </motion.span>
                  </motion.div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors rounded-lg mx-2"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button 
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: scrolled ? 1.1 : 1,
                    padding: scrolled ? '12px 16px' : '8px 16px'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 gradient-bg text-white border border-primary-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: scrolled ? 1.1 : 1,
                    padding: scrolled ? '12px 16px' : '8px 16px'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 rounded-xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: scrolled ? 1.1 : 1,
              padding: scrolled ? '12px' : '8px'
            }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={getInputClasses()}
                  />
                </div>
              </form>

              {/* Mobile Actions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                  <DarkModeToggle />
                </div>

                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={() => navigate('/login')}
                      className="w-full px-4 py-3 font-medium text-primary-600 dark:text-primary-400 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => navigate('/signup')}
                      className="w-full px-4 py-3 font-medium rounded-xl gradient-bg text-white"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;