// File: components/Sidebar.tsx

import Link from 'next/link';
import useUser from '../hooks/useUser';

export default function Sidebar() {
  const { user } = useUser();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold mb-6">CVSmart</div>

      <nav className="flex flex-col space-y-4 text-sm">
        <Link href="/dashboard" className="hover:underline">🏠 Dashboard</Link>
        <Link href="/cv" className="hover:underline">✍️ Crea CV</Link>
        <Link href="/saved" className="hover:underline">💾 Salvati</Link>
        <Link href="/pricing" className="hover:underline">💳 Prezzi</Link>
        <Link href="/profile" className="hover:underline">🙍‍♂️ Profilo</Link>
      </nav>

      <div className="mt-auto text-xs text-gray-400 border-t pt-4">
        {user ? (
          <p>Loggato come: <span className="text-gray-200">{user.email}</span></p>
        ) : (
          <p>Utente non autenticato</p>
        )}
      </div>
    </aside>
  );
}
