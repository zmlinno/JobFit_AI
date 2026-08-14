import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactButton: React.FC = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      {/* Floating Contact Button */}
      <motion.div
        className="fixed top-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1,
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          duration: 0.8 
        }}
      >
        <motion.button
          onClick={() => setIsContactFormOpen(true)}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Contact the Developer"
        >
          {/* Main Button */}
          <div className="w-14 h-14 gradient-bg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <Code className="w-7 h-7 text-white" />
            </motion.div>

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ 
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </div>

          {/* Tooltip */}
          <motion.div
            className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
            initial={{ x: 10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            <div className="glass-card dark:glass-card-dark px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Developer
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Let's connect!
              </div>
            </div>
            
            {/* Arrow */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/70 dark:border-l-gray-800/70 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
          </motion.div>

          {/* Notification Dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  );
};

export default ContactButton;