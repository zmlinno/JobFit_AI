import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Code, Heart, Sparkles } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mnnqjkkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitStatus('idle');
          onClose();
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5 
            }}
          >
            <div className="glass-card dark:glass-card-dark rounded-3xl p-6 md:p-8 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-2xl" />

              {/* Close Button - Fixed for Mobile */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card dark:glass-card-dark hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-20 flex items-center justify-center touch-manipulation"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  minWidth: '44px', 
                  minHeight: '44px',
                  WebkitTapHighlightColor: 'transparent'
                }}
                aria-label="Close contact form"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 hover:text-red-500" />
              </motion.button>

              {/* Header */}
              <motion.div
                className="text-center mb-6 md:mb-8 relative z-10 pr-12 md:pr-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 relative"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Code className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 opacity-50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-2 md:mb-3">
                  Let's Connect!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                  I'd love to hear from you. Whether you have questions about DevHire, 
                  want to collaborate, or just want to say hi!
                </p>

                {/* Developer Info */}
                <motion.div
                  className="mt-4 md:mt-6 p-3 md:p-4 glass-card dark:glass-card-dark rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-500" />
                    </motion.div>
                    <span className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                      Lisanegebriel Abay Kebedew
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                    </motion.div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Full-Stack Developer & Creator of DevHire
                  </p>
                </motion.div>
              </motion.div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-sm md:text-base text-green-800 dark:text-green-200">
                        Message sent successfully! 🎉
                      </p>
                      <p className="text-xs md:text-sm text-green-600 dark:text-green-300">
                        Thank you for reaching out. I'll get back to you soon!
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base text-red-800 dark:text-red-200">
                        Oops! Something went wrong
                      </p>
                      <p className="text-xs md:text-sm text-red-600 dark:text-red-300">
                        Please try again or reach out via email directly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass-card dark:glass-card-dark rounded-xl border border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your name"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass-card dark:glass-card-dark rounded-xl border border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your email"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 glass-card dark:glass-card-dark rounded-xl border border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project, question, or just say hello!"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full py-3 md:py-4 px-6 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    style={{ 
                      minHeight: '48px',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    {/* Button Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"
                      initial={{ x: '-100%' }}
                      animate={{ x: isSubmitting ? '100%' : '-100%' }}
                      transition={{ 
                        duration: 1.5,
                        repeat: isSubmitting ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />

                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>

              {/* Footer */}
              <motion.div
                className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 text-center relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                  You can also reach me directly at:
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                  <motion.a
                    href="mailto:lisan5abay@gmail.com"
                    className="flex items-center justify-center space-x-2 px-4 py-2 glass-card dark:glass-card-dark rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors touch-manipulation"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <Mail className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">lisan5abay@gmail.com</span>
                  </motion.a>
                  <motion.a
                    href="https://t.me/ligator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 glass-card dark:glass-card-dark rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors touch-manipulation"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <Send className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Telegram</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;