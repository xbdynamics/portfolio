import { useTranslations } from 'next-intl';

export function TeamSection() {
  const t = useTranslations('team');

  const team = [
    { name: 'John Doe', role: 'CEO', avatar: '👨‍💼' },
    { name: 'Jane Smith', role: 'Developer', avatar: '👩‍💻' },
    { name: 'Mike Johnson', role: 'Designer', avatar: '👨‍🎨' },
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((m) => (
            <div key={m.name} className="text-center p-6 hover:shadow-lg rounded-xl transition-shadow">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
                {m.avatar}
              </div>
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}