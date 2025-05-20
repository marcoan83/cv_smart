// File: pages/dashboard.tsx

import DashboardLayout from '@/components/layouts/DashboardLayout';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-4">Caricamento in corso...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Benvenuto, {user?.email}</p>
      <p className="text-sm text-gray-600 mt-2">
        Qui potrai gestire i tuoi CV, lettere e crediti.
      </p>
    </DashboardLayout>
  );
}
