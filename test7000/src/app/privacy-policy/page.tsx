'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Shield, Lock, Database, Eye, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const privacyContent = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: December 2024",
      introduction: "At Michael Zahy Media Buying Services, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.",
      
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information that you provide directly to us, including your name, email address, phone number, business information, and service preferences. We also collect information automatically through cookies and usage data.",
          icon: Database
        },
        {
          title: "2. How We Use Your Information",
          content: "We use your information to provide our media buying services, communicate with you about your campaigns, send marketing communications (with your consent), improve our services, and comply with legal obligations.",
          icon: Eye
        },
        {
          title: "3. Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and only accessible to authorized personnel.",
          icon: Lock
        },
        {
          title: "4. Data Sharing and Third Parties",
          content: "We do not sell your personal information to third parties. We only share your data with service providers who help us operate our business, such as email service providers and payment processors, and only as necessary to provide our services.",
          icon: Shield
        },
        {
          title: "5. Your Rights",
          content: "You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request data portability. To exercise these rights, please contact us.",
          icon: Database
        },
        {
          title: "6. Cookies and Tracking",
          content: "Our website uses cookies to enhance your experience, analyze site traffic, and for marketing purposes. You can manage your cookie preferences through your browser settings.",
          icon: Eye
        },
        {
          title: "7. International Data Transfers",
          content: "Your information may be stored and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during international transfers.",
          icon: Database
        },
        {
          title: "8. Retention Period",
          content: "We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.",
          icon: Lock
        },
        {
          title: "9. Changes to This Policy",
          content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date.",
          icon: Shield
        },
        {
          title: "10. Contact Information",
          content: "If you have any questions about this Privacy Policy, please contact us at Michaelzahy1@gmail.com or +20 1069720311.",
          icon: Mail
        }
      ]
    },
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      introduction: "في خدمات شراء الإعلانات الخاصة بمايكل زاهي، نأخذ خصوصيتك على محمل الجد. تحدد هذه سياسة الخصوصية كيف نقوم بجمع معلوماتك الشخصية واستخدامها وحمايتها عند استخدامك لموقعنا الإلكتروني وخدماتنا.",
      
      sections: [
        {
          title: "1. المعلومات التي نجمعها",
          content: "نجمع المعلومات التي تقدمها لنا مباشرةً، بما في ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك ومعلومات عملك وتفضيلات الخدمة. نقوم أيضاً بجمع المعلومات تلقائياً من خلال ملفات تعريف الارتباط وبيانات الاستخدام.",
          icon: Database
        },
        {
          title: "2. كيف نستخدم معلوماتك",
          content: "نستخدم معلوماتك لتقديم خدمات شراء الإعلانات، والتواصل معك بشأن حملاتك، وإرسال الاتصالات التسويقية (بموافقتك)، وتحسين خدماتنا، والامتثال للالتزامات القانونية.",
          icon: Eye
        },
        {
          title: "3. أمن البيانات",
          content: "نطبق تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. يتم تخزين بياناتك بشكل آمن ولا يمكن الوصول إليها إلا من قبل الموظفين المصرح لهم.",
          icon: Lock
        },
        {
          title: "4. مشاركة البيانات وأطراف ثالثة",
          content: "نحن لا نبيع معلوماتك الشخصية إلى أطراف ثالثة. نشارك بياناتك فقط مع مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا، مثل مقدمي خدمات البريد الإلكتروني ومعالجات الدفع، وفقط كما هو ضروري لتقديم خدماتنا.",
          icon: Shield
        },
        {
          title: "5. حقوقك",
          content: "لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضاً الاعتراض على معالجة بياناتك أو طلب نقل البيانات. لممارسة هذه الحقوق، يرجى الاتصال بنا.",
          icon: Database
        },
        {
          title: "6. ملفات تعريف الارتباط والتتبع",
          content: "يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة موقعنا ولأغراض التسويق. يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك.",
          icon: Eye
        },
        {
          title: "7. نقل البيانات الدولي",
          content: "قد يتم تخزين معلوماتك ومعالجتها في بلدان غير بلد إقامتك. نضمن وجود ضمانات مناسبة لحماية بياناتك أثناء النقل الدولي.",
          icon: Database
        },
        {
          title: "8. فترة الاحتفاظ",
          content: "نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضرورياً لتحقيق الأغراض التي تم جمعها من أجلها، بما في ذلك المتطلبات القانونية أو المحاسبية أو الإبلاغ.",
          icon: Lock
        },
        {
          title: "9. التغييرات على هذه السياسة",
          content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'.",
          icon: Shield
        },
        {
          title: "10. معلومات الاتصال",
          content: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على Michaelzahy1@gmail.com أو +20 1069720311.",
          icon: Mail
        }
      ]
    }
  };

  const t = privacyContent[currentLang];

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
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6"
            >
              <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />
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
            className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.introduction}
            </p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {t.sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-12 bg-gray-50 dark:bg-slate-800 p-8 rounded-lg text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLang === 'en' ? 'Privacy Questions?' : 'أسئلة الخصوصية؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentLang === 'en' 
                ? 'If you have any questions about how we handle your data, please don\'t hesitate to contact us.'
                : 'إذا كان لديك أي أسئلة حول كيفية تعاملنا مع بياناتك، فلا تتردد في الاتصال بنا.'
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