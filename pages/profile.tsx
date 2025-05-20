// File: pages/profile.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { supabase } from '@/lib/supabaseClient';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <p className="p-4">Caricamento...</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Il tuo profilo</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Esci
      </button>
    </DashboardLayout>
  );
}
