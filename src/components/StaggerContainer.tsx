'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = '',
  direction = 'up',
  distance = 30,
}: StaggerContainerProps) => {
  const getChildVariants = () => {
    const initial = {
      opacity: 0,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: distance }),
      ...(direction === 'right' && { x: -distance }),
    };

    const final = {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    };

    return {
      hidden: initial,
      visible: final,
    };
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={getChildVariants()}>
              {child}
            </motion.div>
          ))
        : children
      }
    </motion.div>
  );
};

export default StaggerContainer;