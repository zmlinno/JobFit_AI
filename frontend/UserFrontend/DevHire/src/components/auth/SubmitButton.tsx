import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    
    try {
      await onClick();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Button action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses = "relative w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 overflow-hidden";
  const variantClasses = variant === 'primary' 
    ? "gradient-bg text-white shadow-lg hover:shadow-xl" 
    : "glass-card dark:glass-card-dark text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400";

  return (
    <motion.button
    /** 添加type="submit" 是为了让按钮在提交表单时触发 */
      type="submit"
      className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isLoading ? { x: '100%' } : {}}
        transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
      />

      {/* Button Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </motion.div>
        ) : showSuccess ? (
          <motion.div
            key="success"
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Check className="w-5 h-5" />
            <span>Success!</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Effect */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, rgba(67, 97, 238, 0.3) 0%, transparent 70%)',
            filter: 'blur(10px)'
          }}
        />
      )}
    </motion.button>
  );
};

export default SubmitButton;