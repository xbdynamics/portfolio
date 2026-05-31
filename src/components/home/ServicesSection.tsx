import { useTranslations } from 'next-intl';

export function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    { icon: '💻', title: t('web'), desc: t('webDesc') },
    { icon: '📱', title: t('mobile'), desc: t('mobileDesc') },
    { icon: '🎨', title: t('design'), desc: t('designDesc') },
    { icon: '⚡', title: t('performance'), desc: t('performanceDesc') },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <div key={s.title} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg text-center transition-shadow">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}