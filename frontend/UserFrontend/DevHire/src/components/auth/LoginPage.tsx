import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AnimatedInput from './AnimatedInput';
import SubmitButton from './SubmitButton';
import { useJobStore } from '../../store/jobStore';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useJobStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setErrors({ ...errors, general: 'Please check your credentials and try again' });
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || '登录失败');
      }

      setUser({
        id: result.user.id.toString(),
        name: result.user.username,
        email: result.user.email,
        role: result.user.role as 'jobseeker' | 'recruiter',
        skills: [],
        experience: 0,
        location: '',
        remoteOnly: false,
        salaryExpectation: { min: 0, max: 0, currency: 'USD' }
      });
      navigate('/');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : '无法连接后端服务器'
      });
      throw error;
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your saved jobs, preferences, and personalized recommendations"
      type="login"
    >
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
            Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your personalized job search journey
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <AnimatedInput
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
            autoFocus
          />

          <AnimatedInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <motion.label 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-800"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </motion.label>

            <motion.button
              type="button"
              className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot password?
            </motion.button>
          </div>

          {/* General Error */}
          {errors.general && (
            <motion.div
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.general}
            </motion.div>
          )}

          <SubmitButton onClick={handleSubmit}>
            Sign In to DevHire
          </SubmitButton>
        </form>

        {/* Quick Access */}
        <motion.div
          className="mt-8 p-4 glass-card dark:glass-card-dark rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Your saved data includes:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Bookmarked job listings</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Liked companies and roles</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Search preferences and filters</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Application tracking history</span>
            </li>
          </ul>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          className="text-center pt-6 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-gray-600 dark:text-gray-400">Don't have a profile? </span>
          <motion.button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create one now
          </motion.button>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;