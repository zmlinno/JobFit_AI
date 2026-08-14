import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Clock, DollarSign, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Stats: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '12,314',
      label: 'Active Jobs',
      description: 'New opportunities added daily',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '2,847',
      label: 'Companies',
      description: 'From startups to Fortune 500',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '94%',
      label: 'Match Rate',
      description: 'AI-powered job matching',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '2.3x',
      label: 'Faster Hiring',
      description: 'Compared to traditional methods',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: '$145k',
      label: 'Avg Salary',
      description: 'For software engineers',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: '67%',
      label: 'Remote Jobs',
      description: 'Work from anywhere',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time insights into the developer job market and our platform's performance.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="glass-card dark:glass-card-dark p-8 rounded-xl text-center h-full transition-all duration-300 group-hover:shadow-2xl">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>

                {/* Value */}
                <motion.div
                  className={`text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Animated Progress Bar */}
                <motion.div
                  className="mt-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.7 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          className="mt-20 glass-card dark:glass-card-dark p-8 lg:p-12 rounded-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4">
              Ready to find your next opportunity?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of developers who have found their dream jobs through our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/jobs')}
              >
                <span>Browse Jobs</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="px-8 py-4 glass-card dark:glass-card-dark text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Create Profile
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;