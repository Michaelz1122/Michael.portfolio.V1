'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  BarChart3,
  Megaphone,
  Zap,
  Award,
  Briefcase,
  MessageCircle,
  ExternalLink,
  Star,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  Users as Users2,
  TrendingUp as TrendingUp2,
  Lightbulb as LightbulbIcon,
  Scale,
  TrendingDown,
  Eye,
  ShoppingCart as ShoppingCartIcon,
  Weight,
  MessageSquare,
  Globe,
  MapPin,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import ScrollReveal from '@/components/ScrollReveal';
import StaggerContainer from '@/components/StaggerContainer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElement from '@/components/FloatingElement';
import PulseElement from '@/components/PulseElement';
import PageLoader from '@/components/PageLoader';
import SkillBar from '@/components/SkillBar';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { translations } from '@/lib/translations';

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  
  // Get translations early
  const t = translations[currentLang as keyof typeof translations];
  
  // Conversion tracking state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
    adBudget: '',
    phone: ''
  });

  // Meta Pixel tracking simulation
  useEffect(() => {
    // Track page view
    console.log('Page view tracked - Michael Zahy Portfolio');
    // This would integrate with actual Meta Pixel
    if (typeof window !== 'undefined') {
      // fbq('track', 'PageView');
    }
  }, []);

  const trackCTAClick = (ctaName: string) => {
    console.log(`CTA clicked: ${ctaName}`);
    // fbq('track', 'Lead', { content_name: ctaName });
  };

  const trackConversion = (conversionType: string) => {
    console.log(`Conversion tracked: ${conversionType}`);
    // fbq('track', 'Purchase', { content_name: conversionType });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle service selection
  const handleServiceSelect = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      service: serviceName
    }));
    setSelectedService(serviceName);
    scrollToSection('contact');
    trackCTAClick(`Service_Selected_${serviceName}`);
  };

  // Handle pricing plan selection
  const handlePlanSelect = (planName: string, planPrice: string) => {
    setFormData(prev => ({
      ...prev,
      service: `${planName} Plan`,
      adBudget: planPrice
    }));
    setSelectedService(`${planName} Plan`);
    scrollToSection('contact');
    trackCTAClick(`Plan_Selected_${planName}`);
  };

  // Handle ad budget selection
  const handleBudgetSelect = (budget: string) => {
    setFormData(prev => ({
      ...prev,
      adBudget: budget
    }));
    trackCTAClick(`Budget_Selected_${budget}`);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            adBudget: formData.adBudget,
            message: formData.message,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // Track lead conversion
          trackConversion('Contact_Form_Submission');
          
          toast({
            title: t.toastSuccess,
            description: currentLang === 'en' ? "I'll get back to you within 24 hours." : "سأتواصل معك خلال 24 ساعة.",
          });
          setFormData({ name: '', email: '', message: '', service: '', adBudget: '', phone: '' });
          setSelectedService('');
          setSubmitSuccess(true);
          
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitSuccess(false), 5000);
        } else {
          // Handle specific error messages from the server
          let errorMessage = t.toastSubmissionErrorDesc;
          if (result.error === 'Email service not configured') {
            errorMessage = currentLang === 'en' 
              ? "Email service is not properly configured. Please contact me directly via WhatsApp or email." 
              : "خدمة البريد الإلكتروني غير مهيأة بشكل صحيح. يرجى التواصل معي مباشرة عبر واتساب أو البريد الإلكتروني.";
          } else if (result.error === 'Email service configuration error') {
            errorMessage = currentLang === 'en' 
              ? "There's an issue with the email service configuration. Please try again later or contact me directly." 
              : "هناك مشكلة في تكوين خدمة البريد الإلكتروني. يرجى المحاولة مرة أخرى لاحقًا أو التواصل معي مباشرة.";
          }
          
          toast({
            title: t.toastSubmissionError,
            description: errorMessage,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast({
          title: t.toastSubmissionError,
          description: currentLang === 'en' 
            ? "Network error. Please check your connection and try again, or contact me directly." 
            : "خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى، أو التواصل معي مباشرة.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: t.toastError,
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = currentLang === 'en' 
      ? "Hi Michael, I'm interested in your media buying services. Can we discuss?" 
      : "مرحباً مايكل، أنا مهتم بخدمات شراء الإعلانات الخاصة بك. هل يمكننا مناقشة ذلك؟";
    const whatsappUrl = `https://wa.me/201069720311?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/MichaelZahy1', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/michael-zahy', '_blank');
  };

  

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageLoader />
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900"
        dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
        lang={currentLang}
      >
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />

        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-16">
          <div className="absolute inset-0 bg-black/20" />
          {/* Premium Background Elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-40 right-10 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
            {/* Premium grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="relative container mx-auto px-4 py-24 md:py-36">
            <div className="max-w-5xl mx-auto text-center">
              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 leading-tight break-words">
                  {t.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-cyan-100 mb-8 font-light leading-relaxed break-words">
                  {t.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <Badge variant="secondary" className="text-blue-800 bg-white/95 px-4 py-2 text-sm font-medium animate-fadeIn" style={{animationDelay: '0.1s'}}>
                    {t.facebook}
                  </Badge>
                  <Badge variant="secondary" className="text-blue-800 bg-white/95 px-4 py-2 text-sm font-medium animate-fadeIn" style={{animationDelay: '0.2s'}}>
                    {t.performanceMarketing}
                  </Badge>
                  <Badge variant="secondary" className="text-blue-800 bg-white/95 px-4 py-2 text-sm font-medium animate-fadeIn" style={{animationDelay: '0.3s'}}>
                    {t.mediaBuying}
                  </Badge>
                  <Badge variant="secondary" className="text-blue-800 bg-white/95 px-4 py-2 text-sm font-medium animate-fadeIn" style={{animationDelay: '0.4s'}}>
                    {t.growth}
                  </Badge>
                </div>
                <p className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  {t.heroText}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  <div className="text-center p-4 md:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-slideUp min-h-[120px] md:min-h-[140px] flex flex-col justify-center" style={{animationDelay: '0.1s'}}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2 leading-tight">EGP 200K+</div>
                    <div className="text-xs md:text-sm lg:text-base text-cyan-100 font-medium leading-tight">{t.adSpendManaged}</div>
                  </div>
                  <div className="text-center p-4 md:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-slideUp min-h-[120px] md:min-h-[140px] flex flex-col justify-center" style={{animationDelay: '0.2s'}}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2 leading-tight">4.2x</div>
                    <div className="text-xs md:text-sm lg:text-base text-cyan-100 font-medium leading-tight">{t.roiAchieved}</div>
                  </div>
                  <div className="text-center p-4 md:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-slideUp min-h-[120px] md:min-h-[140px] flex flex-col justify-center" style={{animationDelay: '0.3s'}}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2 leading-tight">20+</div>
                    <div className="text-xs md:text-sm lg:text-base text-cyan-100 font-medium leading-tight">{t.clientsServed}</div>
                  </div>
                  <div className="text-center p-4 md:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-slideUp min-h-[120px] md:min-h-[140px] flex flex-col justify-center" style={{animationDelay: '0.4s'}}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 md:mb-2 leading-tight">1+</div>
                    <div className="text-xs md:text-sm lg:text-base text-cyan-100 font-medium leading-tight">{t.yearsExperience}</div>
                  </div>
                </div>
                
                {/* Premium Social Proof */}
                <div className="mb-8">
                  <div className="bg-white/15 backdrop-blur-sm p-4 md:p-6 rounded-2xl max-w-4xl mx-auto border border-white/20">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-white text-lg">Trusted by 20+ Businesses in Egypt</span>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-cyan-100 text-center text-base leading-relaxed">"Michael helped us achieve 11.1x ROAS in just 3 months. His expertise in Facebook ads is unmatched!"</p>
                    <p className="text-yellow-400 text-sm mt-2 font-medium">- Dr. Remon Moner, Pharmacy Owner</p>
                  </div>
                </div>
                
                {/* Premium CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
                  <ScrollReveal direction="up" delay={0.5}>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-5 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400/30"
                      onClick={() => scrollToSection('contact')}
                    >
                      {t.getInTouchButton}
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={0.6}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-white/90 bg-white/10 text-white hover:bg-white/30 hover:text-white font-bold text-xl px-12 py-5 shadow-xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                      onClick={() => scrollToSection('case-studies')}
                    >
                      {t.viewWork}
                    </Button>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Separator />

        {/* About Section */}
        <section id="about" className="relative py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-repeat opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-8.25-6.75-15-15-15S0 36.75 0 45s6.75 15 15 15 15-6.75 15-15zm15 0c0-8.25-6.75-15-15-15s-15 6.75-15 15 6.75 15 15 15 15-6.75 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.about}
                    </span>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.about}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                    {t.aboutDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal direction="left" delay={0.2}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20" />
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t.expertiseTitle}</h3>
                          <p className="text-slate-600 dark:text-slate-300">{t.expertiseDesc}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700 dark:text-slate-200">{t.expertise1}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700 dark:text-slate-200">{t.expertise2}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700 dark:text-slate-200">{t.expertise3}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700 dark:text-slate-200">{t.expertise4}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="right" delay={0.3}>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6">
                      <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
                        {t.achievementTitle}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {t.achievementDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">20+</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{t.clientsServed}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">85+</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{t.campaignsDelivered}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Skills Section */}
        <section id="skills" className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-repeat opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-8.25-6.75-15-15-15S0 36.75 0 45s6.75 15 15 15 15-6.75 15-15zm15 0c0-8.25-6.75-15-15-15s-15 6.75-15 15 6.75 15 15 15 15-6.75 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.skills}
                    </span>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.skillsTitle}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                    {t.skillsDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ScrollReveal direction="up" delay={0.2}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.skill1}</h3>
                    </div>
                    <div className="space-y-4">
                      <SkillBar skill={t.skill1} level="advanced" delay={0.1} currentLang={currentLang} />
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Expert in creating and managing Facebook advertising campaigns with proven ROI results.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.3}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.skill2}</h3>
                    </div>
                    <div className="space-y-4">
                      <SkillBar skill={t.skill2} level="expert" delay={0.2} currentLang={currentLang} />
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Advanced analytics and data-driven decision making for campaign optimization.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.4}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.skill3}</h3>
                    </div>
                    <div className="space-y-4">
                      <SkillBar skill={t.skill3} level="advanced" delay={0.3} currentLang={currentLang} />
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Comprehensive conversion tracking setup and optimization across all platforms.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.5}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.skill4}</h3>
                    </div>
                    <div className="space-y-4">
                      <SkillBar skill={t.skill4} level="expert" delay={0.4} currentLang={currentLang} />
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Expert A/B testing methodologies for continuous campaign improvement.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.6}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.skill5}</h3>
                    </div>
                    <div className="space-y-4">
                      <SkillBar skill={t.skill5} level="advanced" delay={0.5} currentLang={currentLang} />
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Strategic budget allocation and management for maximum ROI efficiency.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.7}>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                        {t.achievementTitle}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {t.achievementDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">20+</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{t.clientsServed}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">85+</div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">{t.campaignsDelivered}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Case Studies Section */}
        <section id="case-studies" className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.caseStudies}
                    </span>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.caseStudies}
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    {t.caseStudiesDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8">
                <ScrollReveal direction="up" delay={0.3}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-slate-800 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4">
                          <Weight className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-2">{t.caseStudy1Title}</CardTitle>
                        <CardDescription className="text-blue-100">{t.caseStudy1Desc}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-lg mb-4">
                        <Star className="w-5 h-5" />
                        <span>{t.caseStudy1Result}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">11.1x</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">ROAS</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">3 mo</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">Timeline</div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1 leading-relaxed">
                        {t.caseStudy1Details}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3"
                        onClick={() => handleServiceSelect(t.caseStudy1Title)}
                      >
                        {t.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.4}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-slate-800 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4">
                          <ShoppingCart className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-2">{t.caseStudy2Title}</CardTitle>
                        <CardDescription className="text-green-100">{t.caseStudy2Desc}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-lg mb-4">
                        <Star className="w-5 h-5" />
                        <span>{t.caseStudy2Result}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">8.5x</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">ROAS</div>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-teal-600 dark:text-teal-400">6 mo</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">Timeline</div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1 leading-relaxed">
                        {t.caseStudy2Details}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3"
                        onClick={() => handleServiceSelect(t.caseStudy2Title)}
                      >
                        {t.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.5}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-slate-800 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-2">{t.caseStudy3Title}</CardTitle>
                        <CardDescription className="text-orange-100">{t.caseStudy3Desc}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold text-lg mb-4">
                        <Star className="w-5 h-5" />
                        <span>{t.caseStudy3Result}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">6.2x</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">ROAS</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-red-600 dark:text-red-400">4 mo</div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">Timeline</div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1 leading-relaxed">
                        {t.caseStudy3Details}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold py-3"
                        onClick={() => handleServiceSelect(t.caseStudy3Title)}
                      >
                        {t.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Services Section */}
        <section id="services" className="py-16 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.services}
                    </span>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.services}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                    {t.servicesDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8">
                <ScrollReveal direction="up" delay={0.2}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service1Title ? 'ring-4 ring-blue-500/50 shadow-2xl' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {selectedService === t.service1Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <Target className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service1Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service1Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service1Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service1Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service1Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service1Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.3}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service2Title ? 'ring-4 ring-green-500/50 shadow-2xl' : ''}`}>
                    {selectedService === t.service2Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <TrendingUp className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service2Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service2Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service2Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service2Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium">{t.service2Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service2Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.4}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service3Title ? 'ring-4 ring-orange-500/50 shadow-2xl' : ''}`}>
                    {selectedService === t.service3Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <Megaphone className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service3Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service3Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.service3Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.service3Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.service3Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service3Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.5}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service4Title ? 'ring-4 ring-purple-500/50 shadow-2xl' : ''}`}>
                    {selectedService === t.service4Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <BarChart3 className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service4Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service4Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.service4Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.service4Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.service4Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service4Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.6}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service5Title ? 'ring-4 ring-cyan-500/50 shadow-2xl' : ''}`}>
                    {selectedService === t.service5Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service5Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service5Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="font-medium">{t.service5Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="font-medium">{t.service5Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="font-medium">{t.service5Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service5Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.7}>
                  <Card className={`flex flex-col h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-800 overflow-hidden ${selectedService === t.service6Title ? 'ring-4 ring-indigo-500/50 shadow-2xl' : ''}`}>
                    {selectedService === t.service6Title && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          {currentLang === 'en' ? 'Selected' : 'محدد'}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="text-center relative z-10 pb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.service6Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.service6Desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="font-medium">{t.service6Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="font-medium">{t.service6Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="font-medium">{t.service6Feature3}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => handleServiceSelect(t.service6Title)}
                      >
                        {t.getService}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.pricing}
                    </span>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.pricing}
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    {t.pricingDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8">
                <ScrollReveal direction="up" delay={0.2}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-2">
                        {t.popular}
                      </Badge>
                    </div>
                    <CardHeader className="text-center pt-8 pb-6">
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.plan1Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {t.plan1Desc}
                      </CardDescription>
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {t.plan1Price}
                        <span className="text-lg text-slate-600 dark:text-slate-300">/{t.planDuration}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {t.planCommitment}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {t.planSetup}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature3}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature4}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature5}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{t.plan1Feature6}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-auto"
                        onClick={() => handlePlanSelect(t.plan1Title, t.plan1Price)}
                      >
                        {t.selectPlan}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.3}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white px-4 py-2">
                        {t.recommended}
                      </Badge>
                    </div>
                    <CardHeader className="text-center pt-8 pb-6">
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.plan2Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {t.plan2Desc}
                      </CardDescription>
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {t.plan2Price}
                        <span className="text-lg text-slate-600 dark:text-slate-300">/{t.planDuration}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {t.planCommitment}
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">
                        {t.planSetup}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature3}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature4}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature5}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature6}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="font-medium">{t.plan2Feature7}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 mt-auto"
                        onClick={() => handlePlanSelect(t.plan2Title, t.plan2Price)}
                      >
                        {t.selectPlan}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={0.4}>
                  <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-600 text-white px-4 py-2">
                        {t.enterprise}
                      </Badge>
                    </div>
                    <CardHeader className="text-center pt-8 pb-6">
                      <CardTitle className="text-2xl text-slate-800 dark:text-slate-100 mb-2">
                        {t.plan3Title}
                      </CardTitle>
                      <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {t.plan3Desc}
                      </CardDescription>
                      <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                        {t.plan3Price}
                        <span className="text-lg text-slate-600 dark:text-slate-300">/{t.planDuration}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {t.planCommitment}
                      </div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">
                        {t.planSetup}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-1 px-6 pb-6">
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature1}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature2}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature3}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature4}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature5}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature6}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature7}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature8}</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group/item">
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                          <span className="font-medium">{t.plan3Feature9}</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 mt-auto"
                        onClick={() => handlePlanSelect(t.plan3Title, t.plan3Price)}
                      >
                        {t.selectPlan}
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-indigo-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                      {t.contact}
                    </span>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                    {t.contact}
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    {t.contactDesc}
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 gap-12">
                <ScrollReveal direction="left" delay={0.2}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-8">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                      {t.sendMessage}
                    </h3>
                    
                    {submitSuccess && (
                      <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                          {t.submitSuccess}
                        </p>
                      </div>
                    )}

                    {/* Selected Service/Plan Indicator */}
                    {(formData.service || formData.adBudget) && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
                          {currentLang === 'en' ? 'Selected Service:' : 'الخدمة المختارة:'}
                        </p>
                        {formData.service && (
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            <span className="font-semibold">{currentLang === 'en' ? 'Service:' : 'الخدمة:'}</span> {formData.service}
                          </p>
                        )}
                        {formData.adBudget && (
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            <span className="font-semibold">{currentLang === 'en' ? 'Budget:' : 'الميزانية:'}</span> {formData.adBudget}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t.name} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t.email} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t.whatService}
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        >
                          <option value="">{t.selectService}</option>
                          <option value="Meta Ads Management">{t.service1Title}</option>
                          <option value="Campaign Optimization">{t.service2Title}</option>
                          <option value="Audience Targeting">{t.service3Title}</option>
                          <option value="Social Media Strategy">{t.service4Title}</option>
                          <option value="Performance Analytics">{t.service5Title}</option>
                          <option value="Budget Management">{t.service6Title}</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {currentLang === 'en' ? 'Budget Range (Monthly)' : 'نطاق الميزانية (شهرياً)'}
                        </label>
                        <select
                          name="adBudget"
                          value={formData.adBudget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        >
                          <option value="">{currentLang === 'en' ? 'Select your budget range' : 'اختر نطاق ميزانيتك'}</option>
                          <option value="EGP 5,000 - 10,000">EGP 5,000 - 10,000</option>
                          <option value="EGP 10,000 - 25,000">EGP 10,000 - 25,000</option>
                          <option value="EGP 25,000 - 50,000">EGP 25,000 - 50,000</option>
                          <option value="EGP 50,000 - 100,000">EGP 50,000 - 100,000</option>
                          <option value="EGP 100,000+">EGP 100,000+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t.message} *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                      >
                        {isSubmitting ? t.sending : t.sendMessage}
                      </Button>
                    </form>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="right" delay={0.3}>
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-3xl shadow-2xl p-4 md:p-8 border border-blue-100 dark:border-blue-900/30">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                        {currentLang === 'en' ? 'Get In Touch' : 'تواصل معنا'}
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="group">
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/30 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer" onClick={handleWhatsAppClick}>
                            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MessageCircle className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">{t.whatsapp}</p>
                              <p className="text-slate-600 dark:text-slate-300">{currentLang === 'en' ? 'Chat with me directly' : 'دردش معي مباشرة'}</p>
                            </div>
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="group">
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/30 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer" onClick={handleFacebookClick}>
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <Facebook className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">Facebook</p>
                              <p className="text-slate-600 dark:text-slate-300">{currentLang === 'en' ? 'Follow my professional page' : 'تابع صفحتي المهنية'}</p>
                            </div>
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/30 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer" onClick={handleLinkedInClick}>
                            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <Linkedin className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">LinkedIn</p>
                              <p className="text-slate-600 dark:text-slate-300">{currentLang === 'en' ? 'Connect professionally' : 'تواصل مهنياً'}</p>
                            </div>
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-4 md:p-8 text-white">
                      <h3 className="text-2xl font-bold mb-4">
                        {t.readyToGrow}
                      </h3>
                      <p className="text-blue-100 mb-6">
                        {t.readyToGrowDesc}
                      </p>
                      <Button
                        size="lg"
                        className="w-full bg-white text-blue-600 hover:bg-slate-100 font-semibold"
                        onClick={handleWhatsAppClick}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {t.startNow}
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 text-slate-800 py-16 relative overflow-hidden dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900 dark:text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-5">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b5563' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Logo />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Michael Zahy</h3>
                      <p className="text-blue-400 dark:text-blue-300 font-medium">{t.mediaBuyingExpert}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-base">
                    {t.footerText}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600"
                      onClick={handleFacebookClick}
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 dark:hover:bg-green-600 dark:hover:text-white dark:hover:border-green-600"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 dark:hover:bg-blue-700 dark:hover:text-white dark:hover:border-blue-700"
                      onClick={handleLinkedInClick}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{t.services}</h3>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.service1Title}
                    </button>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.service2Title}
                    </button>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.service3Title}
                    </button>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.service4Title}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{t.quickLinks}</h3>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={() => scrollToSection('about')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.about}
                    </button>
                    <button 
                      onClick={() => scrollToSection('case-studies')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.caseStudies}
                    </button>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.services}
                    </button>
                    <button 
                      onClick={() => scrollToSection('pricing')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.pricing}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{t.legal}</h3>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={() => window.open('/privacy-policy', '_blank')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.privacyPolicy}
                    </button>
                    <button 
                      onClick={() => window.open('/terms-of-use', '_blank')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.termsOfService}
                    </button>
                    <button 
                      onClick={() => window.open('/cookie-policy', '_blank')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.cookiePolicy}
                    </button>
                    <button 
                      onClick={() => window.open('/disclaimer', '_blank')}
                      className="block text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 transition-all duration-200 text-left"
                    >
                      {t.disclaimer}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-300 dark:border-slate-800 pt-6 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    © 2024 Michael Zahy. All rights reserved.
                  </p>
                  <div className="hidden md:block w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    Designed with ❤️ for performance marketing excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
