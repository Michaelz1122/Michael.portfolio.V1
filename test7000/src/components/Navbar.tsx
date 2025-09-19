'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import Logo from '@/components/Logo';

interface NavbarProps {
  currentLang: 'en' | 'ar';
  setCurrentLang: (lang: 'en' | 'ar') => void;
}

export default function Navbar({ currentLang, setCurrentLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hero', 'about', 'skills', 'case-studies', 'services', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { id: 'hero', label: currentLang === 'en' ? 'Home' : 'الرئيسية' },
    { id: 'about', label: currentLang === 'en' ? 'About' : 'عني' },
    { id: 'skills', label: currentLang === 'en' ? 'Skills' : 'المهارات' },
    { id: 'case-studies', label: currentLang === 'en' ? 'Case Studies' : 'دراسات الحالة' },
    { id: 'services', label: currentLang === 'en' ? 'Services' : 'الخدمات' },
    { id: 'pricing', label: currentLang === 'en' ? 'Pricing' : 'الأسعار' },
    { id: 'contact', label: currentLang === 'en' ? 'Contact' : 'اتصل بي' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Logo className="w-12 h-12" isScrolled={isScrolled} />
            <button 
              onClick={() => scrollToSection('hero')}
              className="group relative"
            >
              <motion.span 
                className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient ${
                  !isScrolled ? 'text-white drop-shadow-lg' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {currentLang === 'en' ? 'Michael Zahy' : 'مايكل زاهي'}
              </motion.span>
              <motion.div 
                className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
                  !isScrolled ? 'bg-white' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeSection === 'hero' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-medium transition-all duration-300 ${
                  !isScrolled 
                    ? 'text-white hover:text-blue-200 drop-shadow-lg' 
                    : activeSection === item.id 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.label}
                <motion.div 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
                    !isScrolled ? 'bg-white' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className={`hidden sm:flex items-center gap-2 ${
                  !isScrolled 
                    ? 'text-white hover:bg-white/20 hover:text-white' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <Globe className="w-4 h-4" />
                <motion.span
                  key={currentLang}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentLang === 'en' ? 'AR' : 'EN'}
                </motion.span>
              </Button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`${
                  !isScrolled 
                    ? 'text-white hover:bg-white/20 hover:text-white' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.div>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${
                      !isScrolled 
                        ? 'text-white hover:bg-white/20 hover:text-white' 
                        : ''
                    }`}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium transition-all duration-300 py-2 px-3 rounded-lg ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="ghost"
                        onClick={toggleLanguage}
                        className="w-full justify-start items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Globe className="w-4 h-4" />
                        {currentLang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}