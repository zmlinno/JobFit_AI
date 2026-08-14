import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'login' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles for auth pages
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-background" />
      
      {/* Morphing Shapes */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="morphing-shape" />
        <div className="morphing-shape" />
        <div className="morphing-shape" />
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 glass-card dark:glass-card-dark px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to DevHire</span>
          </motion.button>

          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">D</span>
            </div>
            <span className="font-heading font-bold text-xl gradient-text">DevHire</span>
          </motion.div>

          {/* Switch Auth Type */}
          <motion.button
            onClick={() => navigate(type === 'login' ? '/signup' : '/login')}
            className="glass-card dark:glass-card-dark px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === 'login' ? 'Create Account' : 'Sign In'}
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.h1 
                className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="AI-Powered Matching"
                description="Get personalized job recommendations based on your skills and preferences"
                delay={0.6}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Developer-First Platform"
                description="No whiteboard interviews, salary transparency, and real technical assessments"
                delay={0.8}
              />
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Quality Over Quantity"
                description="Curated opportunities from companies that value engineering excellence"
                delay={1.0}
              />
            </div>

            {/* Stats */}
            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-heading font-bold gradient-text">12,314</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-green-500">94%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-blue-500">2.3x</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faster Hiring</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card dark:glass-card-dark p-8 rounded-2xl">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="flex items-start space-x-4 glass-card dark:glass-card-dark p-4 rounded-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.02, x: 4 }}
    >
      <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default AuthLayout;