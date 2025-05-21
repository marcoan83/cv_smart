// File: /pages/pricing.tsx

import { useState } from 'react';
import { useUser } from '@/utils/useUser';

const creditPackages = [
  { quantity: 5, price: '€4,99' },
  { quantity: 10, price: '€8,99' },
  { quantity: 25, price: '€19,99' },
  { quantity: 50, price: '€34,99' },
];

export default function Pricing() {
  const { user } = useUser();
  const [loading, setLoading] = useState<number | null>(null);

  const handlePurchase = async (quantity: number) => {
    setLoading(quantity);

    if (!user?.email) {
      alert('Effettua il login per continuare.');
      setLoading(null);
      return;
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        email: user.email, // email presa automaticamente
      }),
    });

    const { sessionUrl } = await response.json();

    if (sessionUrl) {
      window.location.href = sessionUrl;
    } else {
      alert('Errore durante il checkout, riprova più tardi.');
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {creditPackages.map(pkg => (
        <button
          key={pkg.quantity}
          onClick={() => handlePurchase(pkg.quantity)}
          className="m-2 bg-green-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          disabled={loading === pkg.quantity}
        >
          {loading === pkg.quantity ? 'Caricamento...' : `Compra ${pkg.quantity} crediti - ${pkg.price}`}
        </button>
      ))}
    </div>
  );
}
