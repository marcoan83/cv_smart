// File: components/PromptCard.tsx

import { FC } from 'react';

type PromptCardProps = {
  title: string;
  prompt: string;
  createdAt?: string;
};

const PromptCard: FC<PromptCardProps> = ({ title, prompt, createdAt }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">{prompt}</p>
      {createdAt && (
        <p className="text-xs text-gray-400 italic">Creato il: {createdAt}</p>
      )}
    </div>
  );
};

export default PromptCard;
