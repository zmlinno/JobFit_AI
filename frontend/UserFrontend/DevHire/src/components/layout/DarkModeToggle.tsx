import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';

const DarkModeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useJobStore();

  const isLight = themeMode === 'light';

  return (
    <div className="relative">
      <motion.button
        onClick={toggleTheme}
        className="relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      >
        {/* Background Track */}
        <div className="absolute inset-1 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-blue-800 rounded-full"
            animate={{
              x: isLight ? '0%' : '100%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Moving Toggle Button */}
        <motion.div
          className="relative w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
          animate={{
            x: isLight ? 0 : 32,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Icon with smooth transition */}
          <motion.div
            className="relative w-4 h-4"
            animate={{
              rotate: isLight ? 0 : 180,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isLight ? 1 : 0,
                scale: isLight ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-4 h-4 text-yellow-500" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isLight ? 0 : 1,
                scale: isLight ? 0.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-4 h-4 text-blue-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isLight 
              ? '0 0 20px rgba(251, 191, 36, 0.5)' 
              : '0 0 20px rgba(59, 130, 246, 0.5)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isLight ? 'bg-yellow-400' : 'bg-blue-400'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.button>

      {/* Theme Labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        <motion.span 
          className={isLight ? 'text-yellow-600 font-medium' : ''}
          animate={{ scale: isLight ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Light
        </motion.span>
        <motion.span 
          className={!isLight ? 'text-blue-400 font-medium' : ''}
          animate={{ scale: !isLight ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Dark
        </motion.span>
      </div>
    </div>
  );
};

export default DarkModeToggle;