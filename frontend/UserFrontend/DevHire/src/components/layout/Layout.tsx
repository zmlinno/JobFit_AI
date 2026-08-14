import React, { useEffect, useState, useMemo } from 'react';
import Header from './Header';
import ContactButton from '../contact/ContactButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  // Memoize particles to prevent unnecessary re-renders
  const memoizedParticles = useMemo(() => {
    // Reduce particle count for better performance
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15
    }));
  }, []);

  useEffect(() => {
    setParticles(memoizedParticles);
  }, [memoizedParticles]);

  return (
    <div className="min-h-screen relative">
      {/* Optimized Animated Background */}
      <div className="animated-background" />
      
      {/* Reduced Morphing Shapes for better performance */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="morphing-shape" />
        <div className="morphing-shape" />
        <div className="morphing-shape" />
      </div>

      {/* Optimized Floating Particles */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Contact Button */}
      <ContactButton />
    </div>
  );
};

export default Layout;