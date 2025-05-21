// File: /pages/login.tsx

import { useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { useRouter } from 'next/router';

export default function Login() {
  const { user, signIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    await signIn({ provider: 'github' }); // sostituisci con il tuo provider reale
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button 
        onClick={handleLogin} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Accedi
      </button>
    </div>
  );
}
