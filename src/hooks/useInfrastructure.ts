import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Pavilion, InfrastructureItem, Location } from '../types';
import { Database } from '../types/supabase';

type SupabaseItem = Database['public']['Tables']['infrastructure_items']['Row'];
type SupabaseLocation = Database['public']['Tables']['locations']['Row'];

export function useInfrastructure() {
  const [pavilions, setPavilions] = useState<Pavilion[]>([
    { id: 'A', items: [], locations: [] },
    { id: 'B', items: [], locations: [] },
    { id: 'C', items: [], locations: [] },
    { id: 'D', items: [], locations: [] }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // First, check if tables exist and create them if they don't
      const { error: itemsError } = await supabase.from('infrastructure_items').select('id').limit(1);
      const { error: locationsError } = await supabase.from('locations').select('id').limit(1);

      if (itemsError?.message?.includes('relation "infrastructure_items" does not exist') ||
          locationsError?.message?.includes('relation "locations" does not exist')) {
        // Tables don't exist yet, initialize with empty data
        setPavilions([
          { id: 'A', items: [], locations: [] },
          { id: 'B', items: [], locations: [] },
          { id: 'C', items: [], locations: [] },
          { id: 'D', items: [], locations: [] }
        ]);
        setLoading(false);
        return;
      }

      const [itemsData, locationsData] = await Promise.all([
        supabase.from('infrastructure_items').select('*'),
        supabase.from('locations').select('*')
      ]);

      if (itemsData.error && !itemsData.error.message.includes('does not exist')) throw itemsData.error;
      if (locationsData.error && !locationsData.error.message.includes('does not exist')) throw locationsData.error;

      const pavilionMap: Record<string, Pavilion> = {
        'A': { id: 'A', items: [], locations: [] },
        'B': { id: 'B', items: [], locations: [] },
        'C': { id: 'C', items: [], locations: [] },
        'D': { id: 'D', items: [], locations: [] }
      };

      const locations = locationsData.data || [];
      const items = itemsData.data || [];

      locations.forEach((location) => {
        if (pavilionMap[location.pavilion]) {
          pavilionMap[location.pavilion].locations.push(location);
        }
      });

      items.forEach((item) => {
        const location = locations.find(l => l.id === item.locationId);
        if (location && pavilionMap[location.pavilion]) {
          pavilionMap[location.pavilion].items.push(item);
        }
      });

      setPavilions(Object.values(pavilionMap));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const itemsSubscription = supabase
      .channel('infrastructure_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'infrastructure_items' 
      }, () => {
        loadData();
      })
      .subscribe();

    const locationsSubscription = supabase
      .channel('location_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'locations' 
      }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      itemsSubscription.unsubscribe();
      locationsSubscription.unsubscribe();
    };
  }, [loadData]);

  const addItem = async (newItem: Omit<InfrastructureItem, 'id' | 'lastUpdated'>) => {
    try {
      const { data, error } = await supabase
        .from('infrastructure_items')
        .insert([{ 
          ...newItem, 
          lastUpdated: new Date().toISOString() 
        }])
        .select()
        .single();

      if (error) throw error;
      await loadData();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateItem = async (itemId: string, updates: Partial<InfrastructureItem>) => {
    try {
      const { error } = await supabase
        .from('infrastructure_items')
        .update({ 
          ...updates, 
          lastUpdated: new Date().toISOString() 
        })
        .eq('id', itemId);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const addLocation = async (newLocation: Omit<Location, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .insert([newLocation])
        .select()
        .single();

      if (error) throw error;
      await loadData();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    pavilions,
    loading,
    error,
    addItem,
    updateItem,
    addLocation,
    refresh: loadData
  };
}