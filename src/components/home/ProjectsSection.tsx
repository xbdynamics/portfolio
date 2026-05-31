import { useTranslations } from 'next-intl';

export function ProjectsSection() {
  const t = useTranslations('projects');

  const projects = [
    { title: 'E-Commerce App', desc: 'Full-stack e-commerce', image: '🛒', tech: ['React', 'Node.js', 'MongoDB'] },
    { title: 'Dashboard', desc: 'Analytics dashboard', image: '📊', tech: ['Next.js', 'TypeScript', 'Tailwind'] },
    { title: 'Social App', desc: 'Social media application', image: '💬', tech: ['React Native', 'Firebase'] },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">{p.image}</div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}