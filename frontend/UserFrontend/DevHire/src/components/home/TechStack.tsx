import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TechStack: React.FC = () => {
  const navigate = useNavigate();

  const techCategories = [
    {
      category: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      technologies: ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'TypeScript']
    },
    {
      category: 'Backend',
      color: 'from-green-500 to-emerald-500',
      technologies: ['Node.js', 'Python', 'Java', 'Go', 'Rust', 'PHP']
    },
    {
      category: 'Mobile',
      color: 'from-purple-500 to-pink-500',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin']
    },
    {
      category: 'DevOps',
      color: 'from-orange-500 to-red-500',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'Jenkins']
    },
    {
      category: 'Database',
      color: 'from-indigo-500 to-purple-500',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'GraphQL']
    },
    {
      category: 'AI/ML',
      color: 'from-pink-500 to-rose-500',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenAI']
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-8 h-8 text-primary-500" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">
              Popular Tech Stacks
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover opportunities across the most in-demand technologies and frameworks in the industry.
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.category}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="glass-card dark:glass-card-dark p-6 rounded-xl h-full transition-all duration-300 group-hover:shadow-2xl">
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.technologies.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {tech}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor(Math.random() * 500) + 100} jobs
                        </span>
                        <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View Jobs Button */}
                <motion.button
                  className={`w-full mt-6 py-3 bg-gradient-to-r ${category.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/jobs')}
                >
                  View {category.category} Jobs
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-card dark:glass-card-dark p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-4">
              Don't see your tech stack?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We have opportunities across hundreds of technologies. Use our AI-powered search to find the perfect match.
            </p>
            <motion.button
              className="px-8 py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jobs')}
            >
              Explore All Technologies
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;