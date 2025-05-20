// File: components/Navbar.tsx

import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          CVSmart
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/pricing" className="hover:underline">
            Prezzi
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/saved" className="hover:underline">
                Salvati
              </Link>
              <Link href="/profile" className="hover:underline">
                Profilo
              </Link>
              <button onClick={handleLogout} className="ml-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                Esci
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
