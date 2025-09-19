'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowLeft, AlertTriangle, Shield, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Disclaimer() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const disclaimerContent = {
    en: {
      title: "Disclaimer",
      lastUpdated: "Last Updated: December 2024",
      introduction: "This disclaimer governs your use of Michael Zahy Media Buying Services' website and services. By accessing our website and using our services, you accept this disclaimer in full.",
      
      sections: [
        {
          title: "1. Professional Advice",
          content: "The information provided on this website and through our services is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.",
          icon: AlertTriangle
        },
        {
          title: "2. No Guarantees",
          content: "We do not guarantee specific results or outcomes from our media buying services. Advertising results may vary based on numerous factors including market conditions, budget constraints, audience targeting, and external factors beyond our control.",
          icon: Shield
        },
        {
          title: "3. Investment Risk",
          content: "Advertising spend should be considered an investment with inherent risks. While we employ professional strategies and best practices, all marketing investments carry the risk of not achieving desired returns. Clients should carefully consider their budget and risk tolerance before engaging our services.",
          icon: AlertTriangle
        },
        {
          title: "4. Third-Party Platforms",
          content: "Our services rely on third-party platforms such as Facebook, Instagram, Google, and TikTok. We are not responsible for changes in these platforms' policies, algorithms, or functionality that may affect campaign performance. Clients are responsible for complying with individual platform policies.",
          icon: Shield
        },
        {
          title: "5. Market Volatility",
          content: "Digital advertising markets are subject to rapid changes and volatility. Factors such as seasonality, competition, economic conditions, and platform changes can significantly impact campaign performance. We cannot guarantee consistent results across different time periods.",
          icon: AlertTriangle
        },
        {
          title: "6. Client Responsibilities",
          content: "Clients are responsible for providing accurate business information, creative assets, and timely feedback. The success of campaigns depends heavily on the quality and relevance of materials provided by the client and their responsiveness to optimization recommendations.",
          icon: Shield
        },
        {
          title: "7. Technical Limitations",
          content: "We make every effort to ensure our services are available and functioning properly. However, we cannot be held liable for technical issues, downtime, or service interruptions caused by factors beyond our control, including but not limited to internet outages, platform maintenance, or force majeure events.",
          icon: AlertTriangle
        },
        {
          title: "8. Data Accuracy",
          content: "While we strive to provide accurate reporting and analytics, the data provided by advertising platforms may contain inaccuracies or delays. We recommend using the information as guidance rather than absolute truth and encourage clients to consider multiple data sources when making business decisions.",
          icon: Shield
        },
        {
          title: "9. Compliance Responsibility",
          content: "Clients are ultimately responsible for ensuring their advertisements comply with all applicable laws, regulations, and platform policies. We provide guidance and best practices, but the final responsibility for legal and regulatory compliance lies with the client.",
          icon: AlertTriangle
        },
        {
          title: "10. Limitation of Liability",
          content: "To the fullest extent permitted by law, Michael Zahy Media Buying Services shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, lost profits or lost revenue, arising from your use of our services or website.",
          icon: Shield
        }
      ]
    },
    ar: {
      title: "إخلاء المسؤولية",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      introduction: "يحكم هذا إخلاء المسؤولية استخدامك لموقع خدمات شراء الإعلانات الخاصة بمايكل زاهي وخدماتها. من خلال الوصول إلى موقعنا واستخدام خدماتنا، فإنك تقبل هذا إخلاء المسؤولية بالكامل.",
      
      sections: [
        {
          title: "1. المشورة المهنية",
          content: "المعلومات المقدمة على هذا الموقع ومن خلال خدماتنا هي لأغراض معلوماتية عامة فقط. بينما نسعى لتقديم معلومات دقيقة وحديثة،我们不 نقدم أي تمثيلات أو ضمانات من أي نوع، صريحة أو ضمنية، بشأن اكتمال أو دقة أو موثوقية أو ملاءمة أو توفر الموقع أو المعلومات أو المنتجات أو الخدمات أو الرسومات المرتبطة contained على الموقع لأي غرض.",
          icon: AlertTriangle
        },
        {
          title: "2. عدم وجود ضمانات",
          content: "نحن لا نضمن نتائج أو نتائج محددة من خدمات شراء الإعلانات الخاصة بنا. قد تختلف نتائج الإعلان بناءً على عوامل عديدة بما في ذلك ظروف السوق وقيود الميزانية واستهداف الجمهور والعوامل الخارجية خارج سيطرتنا.",
          icon: Shield
        },
        {
          title: "3. مخاطر الاستثمار",
          content: "يجب اعتبار نفقات الإعلان استثماراً بالمخاطر الكامنة. بينما نستخدم استراتيجيات مهنية وأفضل الممارسات، فإن جميع استثمارات التسويق تحمل مخاطر عدم تحقيق العوائد المرجوة. يجب على العملاء مراعاة ميزانيتهم وتحمل المخاطر بعناية قبل التعامل مع خدماتنا.",
          icon: AlertTriangle
        },
        {
          title: "4. منصات الطرف الثالث",
          content: "تعتمد خدماتنا على منصات الطرف الثالث مثل فيسبوك وإنستغرام وجوجل وتيك توك. لسنا مسؤولين عن التغييرات في سياسات هذه المنصات أو الخوارزميات أو الوظيفة التي قد تؤثر على أداء الحملة. العملاء مسؤولون عن الامتثال لسياسات المنصة الفردية.",
          icon: Shield
        },
        {
          title: "5. تقلبات السوق",
          content: "أسواق الإعلان الرقمية عرضة للتغييرات السريعة والتقلبات. يمكن أن تؤثر عوامل مثل الموسمية والمنافسة والظروف الاقتصادية والتغييرات في المنصة بشكل كبير على أداء الحملة. لا يمكننا ضمان نتائج متسقة عبر فترات زمنية مختلفة.",
          icon: AlertTriangle
        },
        {
          title: "6. مسؤوليات العميل",
          content: "العملاء مسؤولون عن تقديم معلومات عمل دقيقة والأصول الإبداعية وتغذية راجعة في الوقت المناسب. يعتمد نجاح الحملات بشكل كبير على جودة وملاءمة المواد المقدمة من العميل واستجابتهم لتوصيات التحسين.",
          icon: Shield
        },
        {
          title: "7. القيود التقنية",
          content: "نبذل كل جهد ممكن لضمان توفر خدماتنا وعملها بشكل صحيح. ومع ذلك، لا يمكننا تحمل المسؤولية عن المشاكل التقنية أو انقطاع الخدمة أو مقاطعات الخدمة الناجمة عن عوامل خارج سيطرتنا، بما في ذلك على سبيل المثال لا الحصر انقطاع الإنترنت أو صيانة المنصة أو الأعمال القاهرة.",
          icon: AlertTriangle
        },
        {
          title: "8. دقة البيانات",
          content: "بينما نسعى لتقديم تقارير وتحليلات دقيقة، قد تحتوي البيانات المقدمة من منصات الإعلان على inaccuracies أو تأخيرات. نوصي باستخدام المعلومات كإرشاد بدلاً من الحقيقة المطلقة ونشجع العملاء على النظر في مصادر بيانات متعددة عند اتخاذ قرارات العمل.",
          icon: Shield
        },
        {
          title: "9. مسؤولية الامتثال",
          content: "العملاء مسؤولون في النهاية عن ضمان امتثال إعلاناتهم لجميع القوانين واللوائح المعمول بها وسياسات المنصة. نقدم إرشادات وأفضل الممارسات، ولكن المسؤولية النهائية عن الامتثال القانوني والتنظيمي تقع على عاتق العميل.",
          icon: AlertTriangle
        },
        {
          title: "10. تحديد المسؤولية",
          content: "إلى أقصى حد يسمح به القانون، لن تكون خدمات شراء الإعلانات الخاصة بمايكل زاهي مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر، الأرباح المفقودة أو الإيرادات المفقودة، الناشئة عن استخدامك لخدماتنا أو موقعنا.",
          icon: Shield
        }
      ]
    }
  };

  const t = disclaimerContent[currentLang];

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
              className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6"
            >
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
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
            className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-8"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.introduction}
            </p>
          </motion.div>

          {/* Disclaimer Sections */}
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
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-red-600 dark:text-red-400" />
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
              {currentLang === 'en' ? 'Legal Questions?' : 'أسئلة قانونية؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentLang === 'en' 
                ? 'If you have any questions about this disclaimer, please don\'t hesitate to contact us.'
                : 'إذا كان لديك أي أسئلة حول هذا إخلاء المسؤولية، فلا تتردد في الاتصال بنا.'
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