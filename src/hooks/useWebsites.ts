import { useEffect, useState } from 'react';
import { supabase, Website } from '../lib/supabase';

export function useWebsites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    setLoading(true);
    const { data, error: err } = await supabase.from('websites').select('*').order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
      setWebsites([]);
    } else {
      setWebsites(data || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const addWebsite = async (website: Omit<Website, 'id' | 'created_at'>) => {
    const { data, error: err } = await supabase
      .from('websites')
      .insert([website])
      .select()
      .single();

    if (err) {
      setError(err.message);
      return null;
    }

    setWebsites([data, ...websites]);
    return data;
  };

  const deleteWebsite = async (id: string) => {
    const { error: err } = await supabase.from('websites').delete().eq('id', id);

    if (err) {
      setError(err.message);
      return false;
    }

    setWebsites(websites.filter((w) => w.id !== id));
    return true;
  };

  const updateWebsite = async (id: string, updates: Partial<Website>) => {
    const { data, error: err } = await supabase
      .from('websites')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return null;
    }

    setWebsites(websites.map((w) => (w.id === id ? data : w)));
    return data;
  };

  return { websites, loading, error, addWebsite, deleteWebsite, updateWebsite, refetch: fetchWebsites };
}
