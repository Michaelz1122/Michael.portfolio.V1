'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Cookie, Shield, Globe, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const cookieContent = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last Updated: December 2024",
      introduction: "This Cookie Policy explains how Michael Zahy Media Buying Services uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.",
      
      sections: [
        {
          title: "1. What Are Cookies",
          content: "Cookies are small text files that are placed on your device when you visit a website. They help websites remember information about your visit, like your preferred language and other settings.",
          icon: Cookie
        },
        {
          title: "2. How We Use Cookies",
          content: "We use cookies to enhance your browsing experience, analyze website traffic, personalize content, and understand how our website is used. This helps us improve our services and provide you with relevant information.",
          icon: Globe
        },
        {
          title: "3. Types of Cookies We Use",
          content: "We use essential cookies for website functionality, analytical cookies to understand user behavior, and functional cookies to remember your preferences. We do not use advertising cookies on our website.",
          icon: Cookie
        },
        {
          title: "4. Essential Cookies",
          content: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. Without these cookies, the website cannot function properly.",
          icon: Shield
        },
        {
          title: "5. Analytical Cookies",
          content: "These cookies allow us to analyze how visitors use our website, which helps us improve its performance. They collect information about how you interact with our website, including which pages you visit most often.",
          icon: Globe
        },
        {
          title: "6. Functional Cookies",
          content: "These cookies remember your preferences and choices, such as your language preference, to provide a more personalized experience. They help make your visit to our website more convenient.",
          icon: Cookie
        },
        {
          title: "7. Your Cookie Choices",
          content: "You can manage your cookie preferences through your browser settings. Most web browsers allow you to control cookies through their settings preferences. However, disabling essential cookies may affect website functionality.",
          icon: Shield
        },
        {
          title: "8. Third-Party Cookies",
          content: "We may use third-party services that place cookies on your device, such as analytics providers. These third parties have their own privacy policies and we are not responsible for their cookie practices.",
          icon: Globe
        },
        {
          title: "9. Cookie Duration",
          content: "The duration of cookies on your device varies. Session cookies are deleted when you close your browser, while persistent cookies remain on your device for a set period or until you delete them.",
          icon: Cookie
        },
        {
          title: "10. Updates to This Policy",
          content: "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date.",
          icon: Shield
        }
      ]
    },
    ar: {
      title: "سياسة ملفات تعريف الارتباط",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      introduction: "تشرح هذه السياسة كيفية استخدام خدمات شراء الإعلانات الخاصة بمايكل زاهي لملفات تعريف الارتباط والتقنيات المماثلة على موقعنا الإلكتروني. من خلال استخدام موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط كما هو موضح في هذه السياسة.",
      
      sections: [
        {
          title: "1. ما هي ملفات تعريف الارتباط",
          content: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقع ويب. تساعد هذه الملفات المواقع على تذكر المعلومات حول زيارتك، مثل لغتك المفضلة والإعدادات الأخرى.",
          icon: Cookie
        },
        {
          title: "2. كيف نستخدم ملفات تعريف الارتباط",
          content: "نستخدم ملفات تعريف الارتباط لتعزيز تجربة التصفح، وتحليل حركة موقع الويب، وتخصيص المحتوى، وفهم كيفية استخدام موقعنا. هذا يساعدنا على تحسين خدماتنا وتزويدك بالمعلومات ذات الصلة.",
          icon: Globe
        },
        {
          title: "3. أنواع ملفات تعريف الارتباط التي نستخدمها",
          content: "نستخدم ملفات تعريف الارتباط الأساسية لوظيفة الموقع، وملفات تعريف الارتباط التحليلية لفهم سلوك المستخدم، وملفات تعريف الارتباط الوظيفية لتذكر تفضيلاتك. لا نستخدم ملفات تعريف الارتباط الإعلانية على موقعنا.",
          icon: Cookie
        },
        {
          title: "4. ملفات تعريف الارتباط الأساسية",
          content: "هذه الملفات ضرورية لعمل الموقع بشكل صحيح.她们 تتيح الوظائف الأساسية مثل التنقل في الصفحات والوصول إلى المناطق الآمنة من الموقع. بدون هذه الملفات، لا يمكن للموقع العمل بشكل صحيح.",
          icon: Shield
        },
        {
          title: "5. ملفات تعريف الارتباط التحليلية",
          content: "تسمح لنا هذه الملفات بتحليل كيفية استخدام الزوار لموقعنا، مما يساعدنا على تحسين أدائه.她们 تجمع معلومات حول كيفية تفاعلك مع موقعنا، بما في ذلك الصفحات التي تزورها غالباً.",
          icon: Globe
        },
        {
          title: "6. ملفات تعريف الارتباط الوظيفية",
          content: "تتذكر هذه الملفات تفضيلاتك وخياراتك، مثل تفضيل اللغة، لتوفير تجربة مخصصة أكثر. تساعد هذه الملفات في جعل زيارتك لموقعنا أكثر ملاءمة.",
          icon: Cookie
        },
        {
          title: "7. خيارات ملفات تعريف الارتباط الخاصة بك",
          content: "يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك. تسمح معظم متصفحات الويب بالتحكم في ملفات تعريف الارتباط من خلال إعدادات التفضيلات. ومع ذلك، قد يؤثر تعطيل الملفات الأساسية على وظيفة الموقع.",
          icon: Shield
        },
        {
          title: "8. ملفات تعريف الارتباط التابعة لجهات خارجية",
          content: "قد نستخدم خدمات تابعة لجهات خارجية تضع ملفات تعريف الارتباط على جهازك، مثل مقدمي خدمات التحليلات. لهذه الجهات الخارجية سياسات الخصوصية الخاصة بها ولسنا مسؤولين عن ممارسات ملفات تعريف الارتباط الخاصة بها.",
          icon: Globe
        },
        {
          title: "9. مدة ملفات تعريف الارتباط",
          content: "تختلف مدة بقاء ملفات تعريف الارتباط على جهازك. يتم حذف ملفات تعريف الارتباط للجلسة عند إغلاق المتصفح، بينما تظل ملفات تعريف الارتباط المستمرة على جهازك لفترة محددة أو حتى تقوم بحذفها.",
          icon: Cookie
        },
        {
          title: "10. تحديثات هذه السياسة",
          content: "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'.",
          icon: Shield
        }
      ]
    }
  };

  const t = cookieContent[currentLang];

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
              className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-6"
            >
              <Cookie className="w-10 h-10 text-amber-600 dark:text-amber-400" />
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
            className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-8"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.introduction}
            </p>
          </motion.div>

          {/* Cookie Sections */}
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
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
              {currentLang === 'en' ? 'Cookie Questions?' : 'أسئلة حول ملفات تعريف الارتباط؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentLang === 'en' 
                ? 'If you have any questions about our use of cookies, please don\'t hesitate to contact us.'
                : 'إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، فلا تتردد في الاتصال بنا.'
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