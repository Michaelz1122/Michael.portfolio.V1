'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseElementProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  delay?: number;
  prefersReducedMotion?: boolean;
}

const PulseElement = ({
  children,
  className = '',
  scale = 1.05,
  duration = 0.8,
  delay = 0,
  prefersReducedMotion = false,
}: PulseElementProps) => {
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PulseElement;