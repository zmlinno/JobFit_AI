import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface AnimatedInputProps {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPasswordStrength?: boolean;
  autoFocus?: boolean;
  label?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  showPasswordStrength = false,
  autoFocus = false,
  label
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [autoFocus]);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    
    if (strength <= 2) return { level: 'weak', color: '#ef4444', width: '33%' };
    if (strength <= 3) return { level: 'medium', color: '#f59e0b', width: '66%' };
    return { level: 'strong', color: '#10b981', width: '100%' };
  };

  const passwordStrength = showPasswordStrength && value ? getPasswordStrength(value) : null;
  const hasError = !!error;
  const isValid = value && !hasError;

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}

      {/* Input Container */}
      <motion.div
        className={`
          relative border-2 rounded-xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
          ${isFocused 
            ? 'border-primary-500 shadow-lg shadow-primary-500/20' 
            : hasError 
              ? 'border-red-500 shadow-lg shadow-red-500/20' 
              : isValid
                ? 'border-green-500 shadow-lg shadow-green-500/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
        `}
        whileHover={{ scale: 1.01 }}
        whileFocus={{ scale: 1.01 }}
      >
        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none
            ${isFocused || value 
              ? 'top-2 text-xs text-primary-500 dark:text-primary-400' 
              : 'top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'
            }
          `}
          animate={{
            y: isFocused || value ? -8 : 0,
            scale: isFocused || value ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {placeholder}
        </motion.label>

        {/* Input Field */}
        <input
          ref={inputRef}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 bg-transparent text-gray-900 dark:text-white focus:outline-none
            ${isFocused || value ? 'pt-6 pb-2' : 'py-4'}
          `}
          autoComplete={type === 'password' ? 'current-password' : type}
        />

        {/* Right Icons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {/* Validation Icon */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {isValid && !showPasswordStrength && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Toggle */}
          {type === 'password' && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          )}
        </div>

        {/* Focus Glow */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary-500/10 -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Password Strength Indicator */}
      {showPasswordStrength && value && passwordStrength && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Password strength:</span>
            <span 
              className="text-xs font-semibold uppercase"
              style={{ color: passwordStrength.color }}
            >
              {passwordStrength.level}
            </span>
          </div>
          
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: passwordStrength.color }}
              initial={{ width: '0%' }}
              animate={{ width: passwordStrength.width }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="flex items-center space-x-2 text-red-500 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedInput;