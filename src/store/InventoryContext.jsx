import { createContext, useContext, useState } from 'react';
import { getInventory } from '../services/inventoryApi';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchItems() {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchItems, setItems }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}