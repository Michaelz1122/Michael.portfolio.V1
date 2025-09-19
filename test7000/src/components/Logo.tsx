import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export default function Logo({ className = "", isScrolled = false }: LogoProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotate: isScrolled ? 0 : 360,
      }}
      transition={{ 
        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
        scale: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Animated gradient background */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#1e40af'}} />
            <stop offset="50%" style={{stopColor: '#3b82f6'}} />
            <stop offset="100%" style={{stopColor: '#1d4ed8'}} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with glow effect */}
        <motion.circle 
          cx="24" 
          cy="24" 
          r="22" 
          fill="url(#bgGradient)" 
          filter="url(#glow)"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* MZ Letters with better styling */}
        <text 
          x="24" 
          y="29" 
          textAnchor="middle" 
          fill="white"
          fontSize="16" 
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          style={{ letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        >
          MZ
        </text>
        
        {/* Enhanced circuit element on M */}
        <motion.g
          animate={{ 
            opacity: [0.6, 1, 0.6],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="14" cy="20" r="1.5" fill="#60a5fa" />
          <line x1="15.5" y1="20" x2="18" y2="20" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="16.5" y1="18" x2="16.5" y2="22" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="1" fill="#93c5fd" />
        </motion.g>
        
        {/* Animated triangle */}
        <motion.path 
          d="M 32 18 L 35 23 L 29 23 Z" 
          fill="#60a5fa"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: '32px 20px' }}
        />
        
        {/* Interactive ring */}
        <motion.circle 
          cx="24" 
          cy="24" 
          r="23" 
          fill="none" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ 
            rotate: 360,
            strokeDashoffset: [0, 10]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </motion.div>
  );
}