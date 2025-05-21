// File: /utils/useUser.ts

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Provider } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ provider }: { provider: Provider }) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, signIn, signOut };
}
