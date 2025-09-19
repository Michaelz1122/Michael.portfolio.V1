'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Facebook, Shield, CheckCircle, XCircle, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacebookAdsPolicy() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const policyContent = {
    en: {
      title: "Facebook Ads Policy",
      lastUpdated: "Last Updated: December 2024",
      introduction: "This policy outlines our commitment to compliance with Facebook's advertising policies and guidelines. As a professional media buying service, we ensure all campaigns we manage adhere to Facebook's standards and best practices.",
      
      sections: [
        {
          title: "1. Policy Compliance Guarantee",
          content: "We guarantee that all advertisements created and managed by our services comply with Facebook's Advertising Policies, Community Standards, and all applicable laws and regulations. Our team stays updated with the latest policy changes and implements them promptly.",
          icon: CheckCircle
        },
        {
          title: "2. Prohibited Content",
          content: "We strictly avoid creating ads that contain prohibited content including but not limited to: discriminatory practices, misleading claims, tobacco products, weapons, drugs, adult content, or any content that violates Facebook's community standards. We conduct thorough reviews before launching any campaign.",
          icon: XCircle
        },
        {
          title: "3. Personal Data Protection",
          content: "We comply with Facebook's data usage policies and protect user privacy. We never use sensitive personal information for targeting without explicit consent and ensure all data collection and usage practices align with GDPR and other privacy regulations.",
          icon: Shield
        },
        {
          title: "4. Transparent Advertising",
          content: "We maintain transparency in all advertising practices. We clearly disclose sponsored content, avoid deceptive practices, and ensure all claims made in advertisements are truthful, accurate, and can be substantiated. We believe in building trust through honest advertising.",
          icon: CheckCircle
        },
        {
          title: "5. Quality Standards",
          content: "We maintain high-quality standards for all ad creatives, copy, and landing pages. We ensure fast-loading landing pages, relevant content, and positive user experiences. Our quality control process minimizes ad rejection and maximizes campaign performance.",
          icon: CheckCircle
        },
        {
          title: "6. Targeting Ethics",
          content: "We use Facebook's targeting capabilities responsibly and ethically. We avoid discriminatory targeting practices and ensure our targeting strategies are inclusive and comply with Facebook's anti-discrimination policies. We respect user privacy and preferences.",
          icon: Shield
        },
        {
          title: "7. Ad Review Process",
          content: "Our internal ad review process includes multiple checkpoints: policy compliance check, quality assessment, performance optimization review, and legal compliance verification. This comprehensive approach ensures all ads meet Facebook's standards before submission.",
          icon: CheckCircle
        },
        {
          title: "8. Policy Updates Management",
          content: "We actively monitor Facebook's policy updates and implement changes promptly. Our team receives regular training on policy changes, and we update our internal guidelines to reflect the latest requirements. We proactively adjust campaigns to maintain compliance.",
          icon: Shield
        },
        {
          title: "9. Reporting and Monitoring",
          content: "We continuously monitor campaign performance and policy compliance. We use advanced tools to track ad approvals, rejections, and policy violations. Our reporting system provides transparency on compliance status and any policy-related issues.",
          icon: CheckCircle
        },
        {
          title: "10. Client Responsibility",
          content: "While we ensure policy compliance for ad creation and management, clients are responsible for the accuracy of their business information, product claims, and overall business practices. We work closely with clients to ensure all aspects of their business comply with relevant policies.",
          icon: Shield
        }
      ]
    },
    ar: {
      title: "سياسة إعلانات فيسبوك",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      introduction: "تحدد هذه السياسة التزامنا بالامتثال لسياسات وإرشادات فيسبوك الإعلانية. كخدمة احترافية لشراء الإعلانات، نضمن أن جميع الحملات التي نديرها تلتزم بمعايير وممارسات فيسبوك.",
      
      sections: [
        {
          title: "1. ضمان الامتثال للسياسة",
          content: "نحن نضمن أن جميع الإعلانات التي تم إنشاؤها وإدارتها بواسطة خدماتنا تلتزم بسياسات الإعلان الخاصة بفيسبوك ومعايير المجتمع وجميع القوانين واللوائح المعمول بها. يظل فريقنا محدثاً بأحدث التغييرات في السياسات وينفذها بسرعة.",
          icon: CheckCircle
        },
        {
          title: "2. المحتوى المحظور",
          content: "نتجنب تماماً إنشاء إعلانات تحتوي على محتوى محظور بما في ذلك على سبيل المثال لا الحصر: الممارسات التمييزية والمطالبات المضللة ومنتجات التبغ والأسلحة والمخدرات والمحتوى للبالغين أو أي محتوى ينتهك معايير مجتمع فيسبوك. نقوم بإجراء مراجعات شاملة قبل إطلاق أي حملة.",
          icon: XCircle
        },
        {
          title: "3. حماية البيانات الشخصية",
          content: "نحن نمتثل لسياسات استخدام البيانات الخاصة بفيسبوك ونحمي خصوصية المستخدم. نحن لا نستخدم معلومات شخصية حساسة للاستهداف دون موافقة صريحة ونتأكد من أن جميع ممارسات جمع البيانات والاستخدام تتوافق مع GDPR واللوائح الخصوصية الأخرى.",
          icon: Shield
        },
        {
          title: "4. الإعلان الشفاف",
          content: "نحافظ على الشفافية في جميع ممارسات الإعلان. نكشف بوضوح عن المحتوى المدعوم ونتجنب الممارسات الخادعة ونتأكد من أن جميع المطالبات التي تم تقديمها في الإعلانات صادقة ودقيقة ويمكن إثباتها. نؤمن ببناء الثقة من خلال الإعلان الصادق.",
          icon: CheckCircle
        },
        {
          title: "5. معايير الجودة",
          content: "نحافظ على معايير جودة عالية لجميع الإبداعات الإعلانية والنصوص وصفحات الهبوط. نضمن صفحات هبوط سريعة التحميل ومحتوى ذا صلة وتجارب مستخدم إيجابية. عملية مراقبة الجودة لدينا تقلل من رفض الإعلانات وتزيد من أداء الحملة.",
          icon: CheckCircle
        },
        {
          title: "6. أخلاقيات الاستهداف",
          content: "نستخدم قدرات الاستهداف الخاصة بفيسبوك بشكل مسؤول وأخلاقي. نتجنب ممارسات الاستهداف التمييزية ونتأكد من أن استراتيجيات الاستهداف لدينا شاملة وتلتزم بسياسات مكافحة التمييز الخاصة بفيسبوك. نحترم خصوصية المستخدم وتفضيلاته.",
          icon: Shield
        },
        {
          title: "7. عملية مراجعة الإعلانات",
          content: "تشمل عملية مراجعة الإعلانات الداخلية لدينا نقاط تفتيش متعددة: فحص الامتثال للسياسة وتقييم الجودة ومراجعة تحسين الأداء والتحقق من الامتثال القانوني. هذا النهج الشامل يضمن أن جميع الإعلانات تلبي معايير فيسبوك قبل التقديم.",
          icon: CheckCircle
        },
        {
          title: "8. إدارة تحديثات السياسة",
          content: "نحن نراقب بنشاط تحديثات سياسة فيسبوك وننفذ التغييرات بسرعة. يتلقى فريقنا تدريباً منتظماً على تغييرات السياسات ونقوم بتحديث إرشاداتنا الداخلية لتعكس أحدث المتطلبات. نقوم بتعديل الحملات بشكل استباقي للحفاظ على الامتثال.",
          icon: Shield
        },
        {
          title: "9. الإبلاغ والمراقبة",
          content: "نحن نراقب باستمرار أداء الحملة والامتثال للسياسة. نستخدم أدوات متقدمة لتتبع موافقات الإعلانات والرفوض وانتهاكات السياسة. نظام الإبلاغ لدينا يوفر الشفافية حول حالة الامتثال وأي مشاكل تتعلق بالسياسة.",
          icon: CheckCircle
        },
        {
          title: "10. مسؤولية العميل",
          content: "بينما نضمن الامتثال للسياسة لإنشاء الإعلانات وإدارتها، يكون العملاء مسؤولين عن دقة معلومات عملهم ومطالبات المنتج والممارسات التجارية الإجمالية. نعمل بشكل وثيق مع العملاء لضمان امتثال جميع جوانب عملهم للسياسات ذات الصلة.",
          icon: Shield
        }
      ]
    }
  };

  const t = policyContent[currentLang];

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
              <Facebook className="w-10 h-10 text-blue-600 dark:text-blue-400" />
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

          {/* Policy Sections */}
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
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              {currentLang === 'en' ? 'Policy Questions?' : 'أسئلة حول السياسة؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentLang === 'en' 
                ? 'If you have any questions about our Facebook Ads policy, please don\'t hesitate to contact us.'
                : 'إذا كان لديك أي أسئلة حول سياسة إعلانات فيسبوك الخاصة بنا، فلا تتردد في الاتصال بنا.'
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