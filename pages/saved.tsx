// File: pages/saved.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { supabase } from '@/lib/supabaseClient';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PromptCard from '@/components/PromptCard';

type Document = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function SavedPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    if (user) {
      fetchDocuments();
    }
  }, [user, loading]);

  const fetchDocuments = async () => {
    setFetching(true);

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore fetch:', error.message);
    } else {
      setDocuments(data as Document[]);
    }

    setFetching(false);
  };

  if (loading) return <p className="p-4">Caricamento in corso...</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">I tuoi CV salvati</h1>

      {fetching ? (
        <p>Caricamento documenti...</p>
      ) : documents.length === 0 ? (
        <p className="italic text-gray-500">Non hai ancora salvato nessun CV.</p>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <PromptCard
              key={doc.id}
              title={doc.title}
              prompt={doc.content}
              createdAt={new Date(doc.created_at).toLocaleDateString('it-IT')}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
