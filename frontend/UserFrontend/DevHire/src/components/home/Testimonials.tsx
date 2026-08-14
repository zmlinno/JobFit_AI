import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      company: "Stripe",
      avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "DevHire's AI matching is incredible. It found me a role that perfectly matched my React expertise and remote work preferences. The process was so much better than traditional job boards.",
      rating: 5,
      timeToHire: "2 weeks",
      salaryIncrease: "35%",
      techStack: ["React", "TypeScript", "Node.js"],
      highlight: "AI-Powered Matching"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "DevOps Engineer",
      company: "Shopify",
      avatar: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Finally, a platform that understands what developers actually want. No whiteboard interviews, transparent salary ranges, and companies that value work-life balance. Got my dream job in just 3 weeks!",
      rating: 5,
      timeToHire: "3 weeks",
      salaryIncrease: "42%",
      techStack: ["Kubernetes", "Docker", "AWS"],
      highlight: "No Whiteboard Interviews"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Full Stack Developer",
      company: "Notion",
      avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The AI recommendations were spot-on. Every job suggestion was relevant to my skills and career goals. I love how it filtered out companies with poor engineering culture automatically.",
      rating: 5,
      timeToHire: "1 week",
      salaryIncrease: "28%",
      techStack: ["Vue.js", "Python", "PostgreSQL"],
      highlight: "Smart Filtering"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Backend Engineer",
      company: "Discord",
      avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "DevHire saved me months of job searching. The platform understood my preference for Go and microservices, and matched me with companies doing cutting-edge work. Highly recommended!",
      rating: 5,
      timeToHire: "2 weeks",
      salaryIncrease: "38%",
      techStack: ["Go", "Microservices", "Redis"],
      highlight: "Perfect Tech Match"
    }
  ];

  const stats = [
    { label: "Average Time to Hire", value: "2.1 weeks", icon: "⚡", color: "from-yellow-400 to-orange-500" },
    { label: "Average Salary Increase", value: "35%", icon: "📈", color: "from-green-400 to-emerald-500" },
    { label: "Success Rate", value: "94%", icon: "🎯", color: "from-blue-400 to-cyan-500" },
    { label: "Developer Satisfaction", value: "4.9/5", icon: "⭐", color: "from-purple-400 to-pink-500" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const selectTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentTestimonial(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleJoinDevelopers = () => {
    navigate('/signup');
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">
              Loved by Developers Worldwide
            </h2>
            <Sparkles className="w-8 h-8 text-secondary-500" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of developers who found their dream jobs through our AI-powered platform.
          </p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 glass-card dark:glass-card-dark rounded-xl testimonial-floating"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <motion.div 
                className="text-4xl mb-3"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div 
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 rounded-3xl blur-xl" />
          
          <div className="relative testimonial-glow rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="testimonial-card glass-card dark:glass-card-dark p-8 lg:p-12 rounded-3xl"
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="testimonial-content">
                  {/* Highlight Badge */}
                  <motion.div
                    className="flex items-center justify-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white text-sm font-medium">
                      <Zap className="w-4 h-4" />
                      <span>{currentTestimonialData.highlight}</span>
                    </div>
                  </motion.div>

                  {/* Quote Icon with Animation */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Quote className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Animated Rating */}
                  <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {[...Array(currentTestimonialData.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 360,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Star className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Content with Typewriter Effect */}
                  <motion.blockquote
                    className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    "{currentTestimonialData.content}"
                  </motion.blockquote>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex justify-center space-x-2 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {currentTestimonialData.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.9 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Author with 3D Effect */}
                  <motion.div
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ 
                        scale: 1.1,
                        rotateY: 15,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <img
                        src={currentTestimonialData.avatar}
                        alt={currentTestimonialData.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-pulse" />
                    </motion.div>
                    
                    <div className="text-center">
                      <motion.div 
                        className="font-bold text-xl text-gray-900 dark:text-white mb-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        {currentTestimonialData.name}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">
                        {currentTestimonialData.role}
                      </div>
                      <div className="text-primary-500 font-semibold">
                        {currentTestimonialData.company}
                      </div>
                    </div>
                  </motion.div>

                  {/* Success Metrics with Animation */}
                  <motion.div
                    className="flex justify-center space-x-12 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold text-xl">{currentTestimonialData.timeToHire}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Time to Hire</div>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold text-xl">+{currentTestimonialData.salaryIncrease}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Salary Increase</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="p-4 rounded-full glass-card dark:glass-card-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors" />
            </motion.button>

            {/* Enhanced Dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectTestimonial(index)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentTestimonial && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-4 rounded-full glass-card dark:glass-card-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors" />
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <motion.button
              className="px-12 py-6 gradient-bg text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto relative overflow-hidden"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinDevelopers}
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 hover:opacity-20 transition-opacity duration-300" />
              
              <Sparkles className="w-6 h-6" />
              <span>Join 10,000+ Happy Developers</span>
              <ArrowRight className="w-6 h-6" />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;