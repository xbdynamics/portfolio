'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';

interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUserData(JSON.parse(storedUser));
    setAuthenticated(true);
  }, [router]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!authenticated || !userData) return null;

  const userName = userData.displayName || 'User';
  const userEmail = userData.email || '';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar userName={userName} userEmail={userEmail} userImage={userData.photoURL || undefined} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => {}} userName={userName} userImage={userData.photoURL || undefined} />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('welcome')}, {userName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">{t('overview')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title={t('projects')} value="12" icon="📁" href="/dashboard/projects" color="blue" />
            <StatCard title={t('services')} value="6" icon="⚙️" href="/dashboard/services" color="green" />
            <StatCard title={t('team')} value="4" icon="👥" href="/dashboard/team" color="purple" />
            <StatCard title={t('partners')} value="8" icon="🤝" href="/dashboard/partners" color="orange" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{t('recentProjects')}</h2>
                <Link href="/dashboard/projects" className="text-sm text-blue-600 hover:text-blue-700">{t('viewAll')}</Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'E-Commerce App', date: 'منذ يومين', status: 'published' },
                  { name: 'Dashboard UI', date: 'منذ 5 أيام', status: 'draft' },
                  { name: 'Mobile App', date: 'منذ أسبوع', status: 'published' },
                ].map((project) => (
                  <div key={project.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">{project.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('storage')}</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t('used')}</span>
                    <span className="font-medium">245MB / 1GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}