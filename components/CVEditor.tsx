// File: components/CVEditor.tsx

import { useState } from 'react';

type CVEditorProps = {
  userId?: string; // opzionale se vuoi salvarlo su Supabase
};

export default function CVEditor({ userId }: CVEditorProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Genera un CV efficace per: ' + text,
      }),
    });

    const data = await res.json();
    setText(data.result || 'Errore nella generazione.');
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editor Curriculum</h2>

      <textarea
        className="w-full h-60 p-4 border rounded text-sm"
        placeholder="Scrivi qui il tuo CV oppure chiedi all'AI..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generazione in corso...' : 'Suggerisci con AI'}
        </button>

        <button
          onClick={() => alert('Funzione salvataggio in arrivo')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Salva CV
        </button>
      </div>
    </div>
  );
}
