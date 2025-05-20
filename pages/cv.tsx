// File: pages/cv.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CVEditor from '@/components/CVEditor';

export default function CVPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-4">Caricamento in corso...</p>;

  return (
    <DashboardLayout>
      <CVEditor userId={user?.id} />
    </DashboardLayout>
  );
}
