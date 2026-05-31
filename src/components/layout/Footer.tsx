import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400">{t('description')}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition">{nav('home')}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">{nav('services')}</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition">{nav('projects')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('connect')}</h3>
            <div className="flex gap-4 text-2xl">
              <span className="cursor-pointer hover:scale-110 transition">🐦</span>
              <span className="cursor-pointer hover:scale-110 transition">💼</span>
              <span className="cursor-pointer hover:scale-110 transition">📷</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}