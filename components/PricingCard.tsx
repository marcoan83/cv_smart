// File: components/PricingCard.tsx

import { FC } from 'react';

type PricingCardProps = {
  credits: number;
  price: string;
  loading: boolean;
  onPurchase: (credits: number) => void;
};

const PricingCard: FC<PricingCardProps> = ({ credits, price, loading, onPurchase }) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{credits} Crediti</h2>
      <p className="text-gray-700 text-lg mb-4">{price}</p>
      <button
        onClick={() => onPurchase(credits)}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Caricamento...' : 'Acquista'}
      </button>
    </div>
  );
};

export default PricingCard;
