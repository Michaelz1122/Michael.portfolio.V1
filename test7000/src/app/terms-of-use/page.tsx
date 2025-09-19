'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowLeft, FileText, Shield, Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function TermsOfUse() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const termsContent = {
    en: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: December 2024",
      introduction: "Welcome to Michael Zahy's Media Buying Services. These Terms of Use govern your use of our website and services. By accessing our website, you agree to be bound by these terms.",
      
      sections: [
        {
          title: "1. Services Overview",
          content: "Michael Zahy provides media buying and performance marketing services including but not limited to Facebook & Instagram advertising, campaign optimization, audience targeting, social media strategy, performance analytics, and budget management."
        },
        {
          title: "2. Client Responsibilities",
          content: "Clients must provide accurate information, timely feedback, and necessary assets for campaign execution. Clients are responsible for the content of their advertisements and ensuring compliance with platform policies."
        },
        {
          title: "3. Payment Terms",
          content: "All payments are due in Egyptian Pounds (EGP). Payment schedules vary by service package. Late payments may result in campaign suspension. All prices are exclusive of applicable taxes."
        },
        {
          title: "4. Campaign Performance",
          content: "While we strive to achieve optimal results, we cannot guarantee specific performance metrics. Results may vary based on market conditions, budget constraints, and external factors."
        },
        {
          title: "5. Confidentiality",
          content: "Both parties agree to maintain confidentiality of all business information, strategies, and data shared during the course of our professional relationship."
        },
        {
          title: "6. Intellectual Property",
          content: "Campaign strategies and materials created by Michael Zahy remain our intellectual property until full payment is received. Upon full payment, clients receive usage rights for their specific campaigns."
        },
        {
          title: "7. Termination",
          content: "Either party may terminate the agreement with 30 days written notice. Outstanding payments must be settled upon termination."
        },
        {
          title: "8. Limitation of Liability",
          content: "Our liability is limited to the amount paid for services. We are not responsible for indirect, consequential, or punitive damages."
        },
        {
          title: "9. Governing Law",
          content: "These terms are governed by and construed in accordance with the laws of Egypt."
        },
        {
          title: "10. Contact Information",
          content: "For questions about these terms, please contact us at Michaelzahy1@gmail.com or +20 1069720311."
        }
      ]
    },
    ar: {
      title: "شروط الاستخدام",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      introduction: "مرحباً بكم في خدمات شراء الإعلانات الخاصة بمايكل زاهي. تحكم هذه الشروط استخدامك لموقعنا الإلكتروني وخدماتنا. من خلال الوصول إلى موقعنا، فإنك توافق على الالتزام بهذه الشروط.",
      
      sections: [
        {
          title: "1. نظرة عامة على الخدمات",
          content: "يقدم مايكل زاهي خدمات شراء الإعلانات والتسويق القائم على النتائج بما في ذلك على سبيل المثال لا الحصر إعلانات فيسبوك وإنستغرام وتطوير الحملات واستهداف الجمهور واستراتيجية وسائل التواصل وتحليلات الأداء وإدارة الميزانية."
        },
        {
          title: "2. مسؤوليات العميل",
          content: "يجب على العملاء تقديم معلومات دقيقة وتغذية راجعة في الوقت المناسب والأصول اللازمة لتنفيذ الحملة. العملاء مسؤولون عن محتوى إعلاناتهم وضمان الامتثال لسياسات المنصة."
        },
        {
          title: "3. شروط الدفع",
          content: "جميع المدفوعات مستحقة بالجنيه المصري (EGP). تختلف جداول الدفع حسب باقة الخدمة. قد تؤدي المدفوعات المتأخرة إلى إيقاف الحملة. جميع الأسعار لا تشمل الضرائب المطبقة."
        },
        {
          title: "4. أداء الحملة",
          content: "بينما نسعى جاهدين لتحقيق نتائج مثلى، لا يمكننا ضمان مقاييس أداء محددة. قد تختلف النتائج بناءً على ظروف السوق وقيود الميزانية والعوامل الخارجية."
        },
        {
          title: "5. السرية",
          content: "يوافق الطرفان على الحفاظ على سرية جميع معلومات العمل والاستراتيجيات والبيانات المشتركة أثناء علاقتنا المهنية."
        },
        {
          title: "6. الملكية الفكرية",
          content: "تظل استراتيجيات الحملة والمواد التي أنشأها مايكل زاهي ملكيتنا الفكرية حتى يتم استلام الدفع الكامل. عند الدفع الكامل، يحصل العملاء على حقوق الاستخدام لحملاتهم المحددة."
        },
        {
          title: "7. الإنهاء",
          content: "يمكن لأي من الطرفين إنهاء الاتفاقية بإشعار كتابي مدته 30 يوماً. يجب تسوية المدفوعات المستحقة عند الإنهاء."
        },
        {
          title: "8. تحديد المسؤولية",
          content: "تقتصر مسؤوليتنا على المبلغ المدفوع مقابل الخدمات. لسنا مسؤولين عن الأضرار غير المباشرة أو التبعية أو العقابية."
        },
        {
          title: "9. القانون الحاكم",
          content: "تحكم هذه الشروط وتفسر وفقاً لقوانين مصر."
        },
        {
          title: "10. معلومات الاتصال",
          content: "للأسئلة حول هذه الشروط، يرجى الاتصال بنا على Michaelzahy1@gmail.com أو +20 1069720311."
        }
      ]
    }
  };

  const t = termsContent[currentLang];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 ${currentLang === 'ar' ? 'rtl' : ''}`} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentLang === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
            </Button>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6"
            >
              <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {t.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              {t.lastUpdated}
            </motion.p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.introduction}
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-12 bg-gray-50 dark:bg-slate-800 p-8 rounded-lg text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLang === 'en' ? 'Questions?' : 'لديك أسئلة؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentLang === 'en' 
                ? 'If you have any questions about these terms, please don\'t hesitate to contact us.'
                : 'إذا كان لديك أي أسئلة حول هذه الشروط، فلا تتردد في الاتصال بنا.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = 'mailto:Michaelzahy1@gmail.com'}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {currentLang === 'en' ? 'Email Us' : 'راسلنا بالبريد'}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://wa.me/201069720311', '_blank')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {currentLang === 'en' ? 'WhatsApp' : 'واتساب'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}