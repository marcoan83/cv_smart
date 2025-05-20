// File: utils/credits.ts

import { supabase } from '@/lib/supabaseClient';

/**
 * Recupera i crediti attuali dell'utente da Supabase.
 * @param userId string - ID dell'utente Supabase
 */
export async function getCredits(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('Errore nel recupero crediti:', error);
    return 0;
  }

  return data.credits;
}
