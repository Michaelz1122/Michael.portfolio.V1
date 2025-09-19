import { motion } from 'framer-motion';

interface SkillBarProps {
  skill: string;
  level: 'expert' | 'advanced' | 'intermediate';
  delay?: number;
  currentLang?: 'en' | 'ar';
}

const SkillBar = ({ skill, level, delay = 0, currentLang = 'en' }: SkillBarProps) => {
  const getLevelPercentage = () => {
    switch (level) {
      case 'expert': return 95;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      default: return 50;
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case 'expert': return 'from-green-500 to-emerald-400';
      case 'advanced': return 'from-blue-500 to-cyan-400';
      case 'intermediate': return 'from-purple-500 to-violet-400';
      default: return 'from-gray-500 to-slate-400';
    }
  };

  const getLevelLabel = () => {
    if (currentLang === 'ar') {
      switch (level) {
        case 'expert': return 'خبير';
        case 'advanced': return 'متقدم';
        case 'intermediate': return 'متوسط';
        default: return 'مبتدئ';
      }
    }
    switch (level) {
      case 'expert': return 'Expert';
      case 'advanced': return 'Advanced';
      case 'intermediate': return 'Intermediate';
      default: return 'Beginner';
    }
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <motion.span 
          className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {getLevelLabel()}
        </motion.span>
      </div>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full bg-gradient-to-r ${getLevelColor()} rounded-full shadow-sm`}
          initial={{ width: 0 }}
          animate={{ width: `${getLevelPercentage()}%` }}
          transition={{ 
            delay: delay + 0.2, 
            duration: 1, 
            ease: "easeOut" 
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ 
              x: ['0%', '100%', '0%'] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: delay + 0.5
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBar;