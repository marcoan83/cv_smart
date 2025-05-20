// File: pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { quantity, email } = req.body;

  const unitAmount: number | undefined = {
    5: 499,
    10: 899,
    25: 1999,
    50: 3499,
  }[quantity];

  if (!unitAmount) {
    return res.status(400).json({ error: 'Pacchetto non valido.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: `${quantity} Crediti CVSmart` },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/credits?success=true`,
      cancel_url: `${req.headers.origin}/credits?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Errore nella creazione della sessione:', error);
    res.status(500).json({ error: 'Errore interno durante la creazione del checkout.' });
  }
}
