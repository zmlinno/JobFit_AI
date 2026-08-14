import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Mail, Send, Zap, Users, TrendingUp, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const personalLinks = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: 'mailto:lisan5abay@gmail.com', 
      label: 'Email',
      text: 'lisan5abay@gmail.com'
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: 'https://github.com/lisan-5', 
      label: 'GitHub',
      text: 'GitHub Profile'
    },
    { 
      icon: <Send className="w-5 h-5" />, 
      href: 'https://t.me/ligator', 
      label: 'Telegram',
      text: 'Telegram'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Get matched with jobs that fit your skills and preferences'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Developer-First',
      description: 'No whiteboard interviews, salary transparency, real assessments'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Quality Over Quantity',
      description: 'Curated opportunities from companies that value engineering'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-xl">D</span>
                </div>
                <span className="font-heading font-bold text-2xl gradient-text">DevHire</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                The AI-powered job platform built specifically for developers. 
                Find your next opportunity with companies that value engineering excellence.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-heading font-semibold text-lg text-white mb-6">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <motion.button
                    onClick={() => navigate('/jobs')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    Browse Jobs
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    Create Profile
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    AI Matching
                  </motion.button>
                </div>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    For Companies
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    About Us
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 4 }}
                  >
                    Contact
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <motion.div
              className="flex items-center space-x-2 mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gray-400">
                © {currentYear} DevHire. Made by
              </span>
              <span className="text-primary-400 font-semibold">Lisanegebriel Abay Kebedew</span>
              <span className="text-gray-400">for developers.</span>
            </motion.div>

            {/* Personal Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {personalLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  aria-label={link.label}
                  title={link.text}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;