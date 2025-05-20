// File: pages/pricing.tsx

import { useState } from 'react';

const creditPackages = [
  { quantity: 5, price: '€4,99' },
  { quantity: 10, price: '€8,99' },
  { quantity: 25, price: '€19,99' },
  { quantity: 50, price: '€34,99' },
];

export default function Pricing() {
  const [loading, setLoading] = useState<number | null>(null);

  const handlePurchase = async (quantity: number) => {
    setLoading(quantity);

    const email = prompt('Inserisci la tua email per procedere al pagamento:');
    if (!email) {
      setLoading(null);
      return;
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity, email }),
    });

    const { url } = await res.json();
    setLoading(null);
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Scegli un pacchetto crediti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creditPackages.map((pkg) => (
          <div key={pkg.quantity} className="border rounded p-4 shadow text-center">
            <h2 className="text-xl font-semibold mb-2">{pkg.quantity} Crediti</h2>
            <p className="text-gray-700 mb-4">{pkg.price}</p>
            <button
              onClick={() => handlePurchase(pkg.quantity)}
              disabled={loading === pkg.quantity}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading === pkg.quantity ? 'Caricamento...' : 'Acquista'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
