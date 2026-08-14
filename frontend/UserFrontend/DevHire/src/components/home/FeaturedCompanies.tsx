import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, ExternalLink, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedCompanies: React.FC = () => {
  const navigate = useNavigate();

  const companies = [
    {
      id: '1',
      name: 'TechFlow Inc.',
      logo: 'https://images.pexels.com/photos/7682336/pexels-photo-7682336.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading fintech company building the future of payments with cutting-edge technology.',
      industry: 'Fintech',
      size: '100-500',
      location: 'San Francisco, CA',
      openJobs: 8,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes'],
      rating: 4.8,
      benefits: ['Stock Options', 'Remote Work', 'Health Insurance', 'Learning Budget']
    },
    {
      id: '2',
      name: 'CloudScale Solutions',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Cloud infrastructure and DevOps automation platform serving enterprise clients.',
      industry: 'Cloud Infrastructure',
      size: '50-100',
      location: 'Remote',
      openJobs: 5,
      techStack: ['Kubernetes', 'Go', 'Python', 'Terraform', 'GCP'],
      rating: 4.9,
      benefits: ['Remote First', 'Equity', 'Conference Budget', 'Flexible PTO']
    },
    {
      id: '3',
      name: 'DataFlow Analytics',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'AI-powered data analytics platform helping businesses make data-driven decisions.',
      industry: 'Data Analytics',
      size: '200-500',
      location: 'Seattle, WA',
      openJobs: 12,
      techStack: ['Python', 'Apache Spark', 'Kafka', 'PostgreSQL', 'AWS'],
      rating: 4.7,
      benefits: ['Stock Options', 'Learning Stipend', 'Health Insurance', 'Sabbatical']
    },
    {
      id: '4',
      name: 'DesignSys Co.',
      logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Design system platform helping teams build consistent, accessible user interfaces.',
      industry: 'Design Tools',
      size: '20-50',
      location: 'New York, NY',
      openJobs: 3,
      techStack: ['React', 'TypeScript', 'Styled Components', 'Storybook', 'Figma'],
      rating: 4.6,
      benefits: ['Design Tools Budget', 'Hybrid Work', 'Catered Lunches', 'Wellness Program']
    }
  ];

  const handleViewJobs = (companyName: string) => {
    navigate('/jobs');
  };

  const handleViewAllCompanies = () => {
    navigate('/signup');
  };

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
            Featured Companies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join innovative companies that are shaping the future of technology and offer exceptional developer experiences.
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => handleViewJobs(company.name)}
            >
              <div className="glass-card dark:glass-card-dark p-8 rounded-xl h-full transition-all duration-300 group-hover:shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{company.industry}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{company.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {company.openJobs} Open Jobs
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {company.description}
                </p>

                {/* Company Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{company.size} employees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {company.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Jobs Button */}
                <motion.div
                  className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Building2 className="w-4 h-4" />
                    <span>Company Profile</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-primary-500 dark:text-primary-400 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    <span>View Jobs</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Companies Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 glass-card dark:glass-card-dark text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllCompanies}
          >
            Explore All Companies
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;