import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('greeting')}{' '}
              <span className="text-blue-600">Your Name</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('role')}
            </p>
            <div className="flex gap-4">
              <Link
                href="#projects"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {t('viewWork')}
              </Link>
              <Link
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                {t('contactMe')}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-lg">{t('photo')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}