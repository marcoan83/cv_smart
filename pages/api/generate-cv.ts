// File: /pages/api/generate-cv.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end('Metodo non consentito');
    return;
  }

  const { jobTitle, experience, education, skills } = req.body;

  const prompt = `
    Crea un Curriculum Vitae dettagliato e professionale per il ruolo di ${jobTitle}.
    Esperienze lavorative: ${experience}.
    Istruzione: ${education}.
    Competenze principali: ${skills}.
    Struttura il CV in modo chiaro e professionale.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ cv: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Errore nella generazione del CV' });
  }
}

